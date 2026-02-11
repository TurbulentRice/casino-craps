/**
 * Game Context - Manages the complete state of the craps game
 */

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import {
  GameState,
  GameAction,
  GameActionType,
  Bet,
  BetType,
  BetStatus,
  GamePhase,
  PointNumber,
  DiceRoll,
  Player,
  BetResult,
} from '../types/game';
import { rollDice, determineRollOutcome, isPointNumber } from '../utils/dice';
import { resolveBet } from '../utils/bets';

// ============================================================================
// Initial State
// ============================================================================

const DEFAULT_STARTING_BANKROLL = 1000;

const createInitialPlayer = (bankroll: number): Player => ({
  id: 'player-1',
  name: 'Player',
  bankroll,
  totalWagered: 0,
  totalWon: 0,
  totalLost: 0,
  activeBets: [],
  betHistory: [],
});

const createInitialState = (startingBankroll: number = DEFAULT_STARTING_BANKROLL): GameState => ({
  phase: 'come-out',
  point: null,
  puck: {
    isOn: false,
    pointNumber: null,
  },
  currentRoll: null,
  lastRoll: null,
  rollHistory: [],
  player: createInitialPlayer(startingBankroll),
  rollCount: 0,
  shooterRollCount: 0,
  comeOutRolls: 0,
  pointsEstablished: 0,
  pointsMade: 0,
  sevenOuts: 0,
  sessionStartTime: Date.now(),
  sessionStartBankroll: startingBankroll,
});

// ============================================================================
// Reducer
// ============================================================================

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.ROLL_DICE: {
      // Roll the dice
      const roll = rollDice();
      const outcome = determineRollOutcome(roll, state.phase, state.point);

      let newPhase: GamePhase = state.phase;
      let newPoint: PointNumber | null = state.point;
      let comeOutRolls = state.comeOutRolls;
      let pointsEstablished = state.pointsEstablished;
      let pointsMade = state.pointsMade;
      let sevenOuts = state.sevenOuts;

      // Handle phase transitions
      if (state.phase === 'come-out') {
        comeOutRolls++;

        if (outcome === 'point' && isPointNumber(roll.total)) {
          // Point established
          newPhase = 'point';
          newPoint = roll.total;
          pointsEstablished++;
        }
        // Natural or craps keeps us in come-out phase
      } else if (state.phase === 'point') {
        if (outcome === 'point-made') {
          // Point made - back to come-out
          newPhase = 'come-out';
          newPoint = null;
          pointsMade++;
        } else if (outcome === 'seven-out') {
          // Seven out - back to come-out
          newPhase = 'come-out';
          newPoint = null;
          sevenOuts++;
        }
      }

      return {
        ...state,
        currentRoll: roll,
        lastRoll: state.currentRoll,
        rollHistory: [...state.rollHistory, roll],
        phase: newPhase,
        point: newPoint,
        puck: {
          isOn: newPhase === 'point',
          pointNumber: newPoint,
        },
        rollCount: state.rollCount + 1,
        shooterRollCount: newPhase === 'come-out' && state.phase === 'point'
          ? 0
          : state.shooterRollCount + 1,
        comeOutRolls,
        pointsEstablished,
        pointsMade,
        sevenOuts,
      };
    }

    case GameActionType.PLACE_BET: {
      const { betType, amount } = action.payload;

      // Validate bankroll
      if (state.player.bankroll < amount) {
        console.warn('Insufficient bankroll');
        return state;
      }

      // Create new bet
      const newBet: Bet = {
        id: `bet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: betType,
        amount,
        status: 'active',
        placedAt: Date.now(),
      };

      return {
        ...state,
        player: {
          ...state.player,
          bankroll: state.player.bankroll - amount,
          totalWagered: state.player.totalWagered + amount,
          activeBets: [...state.player.activeBets, newBet],
        },
      };
    }

    case GameActionType.REMOVE_BET: {
      const { betId } = action.payload;
      const betToRemove = state.player.activeBets.find(bet => bet.id === betId);

      if (!betToRemove) {
        return state;
      }

      return {
        ...state,
        player: {
          ...state.player,
          bankroll: state.player.bankroll + betToRemove.amount,
          totalWagered: state.player.totalWagered - betToRemove.amount,
          activeBets: state.player.activeBets.filter(bet => bet.id !== betId),
        },
      };
    }

    case GameActionType.CLEAR_ALL_BETS: {
      const totalRefund = state.player.activeBets.reduce((sum, bet) => sum + bet.amount, 0);

      return {
        ...state,
        player: {
          ...state.player,
          bankroll: state.player.bankroll + totalRefund,
          totalWagered: state.player.totalWagered - totalRefund,
          activeBets: [],
        },
      };
    }

    case GameActionType.RESOLVE_BETS: {
      const { roll } = action.payload;
      const results: BetResult[] = [];
      const remainingBets: Bet[] = [];
      let totalWon = state.player.totalWon;
      let totalLost = state.player.totalLost;
      let bankroll = state.player.bankroll;

      // Resolve each active bet
      state.player.activeBets.forEach(bet => {
        const result = resolveBet(bet, roll, state.phase, state.point);
        results.push(result);

        if (result.outcome === 'win') {
          bankroll += result.payout;
          totalWon += result.netGain;
        } else if (result.outcome === 'lose') {
          totalLost += Math.abs(result.netGain);
        } else if (result.outcome === 'push') {
          // Bet stays active or is returned
          if (result.bet.status === 'active') {
            remainingBets.push(result.bet);
          } else {
            bankroll += result.payout; // Return original bet
          }
        }
      });

      return {
        ...state,
        player: {
          ...state.player,
          bankroll,
          totalWon,
          totalLost,
          activeBets: remainingBets,
          betHistory: [...state.player.betHistory, ...results],
        },
      };
    }

    case GameActionType.NEW_GAME: {
      const { startingBankroll } = action.payload;
      return createInitialState(startingBankroll);
    }

    case GameActionType.RESET_BANKROLL: {
      const { amount } = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          bankroll: amount,
        },
      };
    }

    default:
      return state;
  }
}

// ============================================================================
// Context
// ============================================================================

interface GameContextValue {
  state: GameState;
  actions: {
    rollDice: () => void;
    placeBet: (betType: BetType, amount: number) => void;
    removeBet: (betId: string) => void;
    clearAllBets: () => void;
    resolveBets: (roll: DiceRoll) => void;
    newGame: (startingBankroll?: number) => void;
    resetBankroll: (amount: number) => void;
  };
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface GameProviderProps {
  children: ReactNode;
  initialBankroll?: number;
}

export function GameProvider({ children, initialBankroll = DEFAULT_STARTING_BANKROLL }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, createInitialState(initialBankroll));

  const actions = {
    rollDice: useCallback(() => {
      dispatch({ type: GameActionType.ROLL_DICE });
    }, []),

    placeBet: useCallback((betType: BetType, amount: number) => {
      dispatch({ type: GameActionType.PLACE_BET, payload: { betType, amount } });
    }, []),

    removeBet: useCallback((betId: string) => {
      dispatch({ type: GameActionType.REMOVE_BET, payload: { betId } });
    }, []),

    clearAllBets: useCallback(() => {
      dispatch({ type: GameActionType.CLEAR_ALL_BETS });
    }, []),

    resolveBets: useCallback((roll: DiceRoll) => {
      dispatch({ type: GameActionType.RESOLVE_BETS, payload: { roll } });
    }, []),

    newGame: useCallback((startingBankroll: number = DEFAULT_STARTING_BANKROLL) => {
      dispatch({ type: GameActionType.NEW_GAME, payload: { startingBankroll } });
    }, []),

    resetBankroll: useCallback((amount: number) => {
      dispatch({ type: GameActionType.RESET_BANKROLL, payload: { amount } });
    }, []),
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access game state and actions
 */
export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

// ============================================================================
// Convenience Hooks
// ============================================================================

/**
 * Hook to get just the game state
 */
export function useGameState(): GameState {
  const { state } = useGame();
  return state;
}

/**
 * Hook to get just the game actions
 */
export function useGameActions() {
  const { actions } = useGame();
  return actions;
}

/**
 * Hook to get player state
 */
export function usePlayer(): Player {
  const { state } = useGame();
  return state.player;
}

/**
 * Hook to check if rolling is allowed
 */
export function useCanRoll(): boolean {
  const { state } = useGame();
  // Can roll if there are active bets
  return state.player.activeBets.length > 0;
}

/**
 * Hook to get current phase information
 */
export function usePhaseInfo() {
  const { state } = useGame();
  return {
    phase: state.phase,
    point: state.point,
    puck: state.puck,
    isComeOut: state.phase === 'come-out',
    isPoint: state.phase === 'point',
  };
}
