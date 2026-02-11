/**
 * Type definitions for the Casino Craps game
 */

// ============================================================================
// Dice Types
// ============================================================================

/**
 * A single die value (1-6)
 */
export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Result of rolling two dice
 */
export interface DiceRoll {
  die1: DieValue;
  die2: DieValue;
  total: number;
  timestamp: number;
}

/**
 * Possible outcomes from a dice roll
 */
export type RollOutcome =
  | 'natural'       // 7 or 11 on come-out
  | 'craps'         // 2, 3, or 12 on come-out
  | 'point'         // 4, 5, 6, 8, 9, 10 on come-out (establishes point)
  | 'seven-out'     // 7 during point phase (lose)
  | 'point-made'    // Rolled the point number (win)
  | 'other';        // Any other number during point phase

// ============================================================================
// Game Phase Types
// ============================================================================

/**
 * Current phase of the game
 */
export type GamePhase = 'come-out' | 'point';

/**
 * Point numbers that can be established (4, 5, 6, 8, 9, 10)
 */
export type PointNumber = 4 | 5 | 6 | 8 | 9 | 10;

/**
 * The puck position indicator
 */
export interface Puck {
  isOn: boolean;
  pointNumber: PointNumber | null;
}

// ============================================================================
// Bet Types
// ============================================================================

/**
 * All available bet types in craps
 */
export enum BetType {
  // Line Bets
  PASS_LINE = 'PASS_LINE',
  DONT_PASS = 'DONT_PASS',
  COME = 'COME',
  DONT_COME = 'DONT_COME',

  // Odds Bets (backing original bet)
  PASS_ODDS = 'PASS_ODDS',
  DONT_PASS_ODDS = 'DONT_PASS_ODDS',
  COME_ODDS = 'COME_ODDS',
  DONT_COME_ODDS = 'DONT_COME_ODDS',

  // Place Bets
  PLACE_4 = 'PLACE_4',
  PLACE_5 = 'PLACE_5',
  PLACE_6 = 'PLACE_6',
  PLACE_8 = 'PLACE_8',
  PLACE_9 = 'PLACE_9',
  PLACE_10 = 'PLACE_10',

  // Buy/Lay Bets (with commission)
  BUY_4 = 'BUY_4',
  BUY_5 = 'BUY_5',
  BUY_6 = 'BUY_6',
  BUY_8 = 'BUY_8',
  BUY_9 = 'BUY_9',
  BUY_10 = 'BUY_10',

  // Field Bet
  FIELD = 'FIELD',

  // Hardways
  HARD_4 = 'HARD_4',
  HARD_6 = 'HARD_6',
  HARD_8 = 'HARD_8',
  HARD_10 = 'HARD_10',

  // Proposition Bets (center of table)
  ANY_7 = 'ANY_7',
  ANY_CRAPS = 'ANY_CRAPS',
  SNAKE_EYES = 'SNAKE_EYES',      // 2
  ACE_DEUCE = 'ACE_DEUCE',         // 3
  YO_ELEVEN = 'YO_ELEVEN',         // 11
  BOXCARS = 'BOXCARS',             // 12

  // Horn Bets
  HORN = 'HORN',                   // 2, 3, 11, 12
  HORN_HIGH_2 = 'HORN_HIGH_2',
  HORN_HIGH_3 = 'HORN_HIGH_3',
  HORN_HIGH_11 = 'HORN_HIGH_11',
  HORN_HIGH_12 = 'HORN_HIGH_12',

  // Big 6/8 (usually not recommended)
  BIG_6 = 'BIG_6',
  BIG_8 = 'BIG_8',
}

/**
 * Status of a bet
 */
export type BetStatus = 'active' | 'won' | 'lost' | 'pushed' | 'off';

/**
 * A placed bet with its details
 */
export interface Bet {
  id: string;
  type: BetType;
  amount: number;
  status: BetStatus;
  pointNumber?: PointNumber; // For Come/Don't Come bets that travel
  placedAt: number; // timestamp
  resolvedAt?: number; // timestamp
  payout?: number; // if won
}

/**
 * Bet payout information
 */
export interface BetPayout {
  odds: string; // e.g., "1:1", "3:2", "7:6"
  houseEdge: number; // as percentage
  description: string;
}

/**
 * Result of resolving a bet
 */
export interface BetResult {
  bet: Bet;
  outcome: 'win' | 'lose' | 'push';
  payout: number;
  netGain: number; // payout - original bet
}

// ============================================================================
// Player Types
// ============================================================================

/**
 * Player's current state
 */
export interface Player {
  id: string;
  name: string;
  bankroll: number;
  totalWagered: number;
  totalWon: number;
  totalLost: number;
  activeBets: Bet[];
  betHistory: BetResult[];
}

// ============================================================================
// Game State Types
// ============================================================================

/**
 * Complete game state
 */
export interface GameState {
  // Game phase
  phase: GamePhase;
  point: PointNumber | null;
  puck: Puck;

  // Dice
  currentRoll: DiceRoll | null;
  lastRoll: DiceRoll | null;
  rollHistory: DiceRoll[];

  // Player
  player: Player;

  // Game statistics
  rollCount: number;
  shooterRollCount: number; // rolls since last seven-out
  comeOutRolls: number;
  pointsEstablished: number;
  pointsMade: number;
  sevenOuts: number;

  // Session info
  sessionStartTime: number;
  sessionStartBankroll: number;
}

/**
 * Actions that can be performed on the game
 */
export enum GameActionType {
  ROLL_DICE = 'ROLL_DICE',
  PLACE_BET = 'PLACE_BET',
  REMOVE_BET = 'REMOVE_BET',
  CLEAR_ALL_BETS = 'CLEAR_ALL_BETS',
  RESOLVE_BETS = 'RESOLVE_BETS',
  NEW_GAME = 'NEW_GAME',
  RESET_BANKROLL = 'RESET_BANKROLL',
}

/**
 * Action payloads for game actions
 */
export type GameAction =
  | { type: GameActionType.ROLL_DICE }
  | { type: GameActionType.PLACE_BET; payload: { betType: BetType; amount: number } }
  | { type: GameActionType.REMOVE_BET; payload: { betId: string } }
  | { type: GameActionType.CLEAR_ALL_BETS }
  | { type: GameActionType.RESOLVE_BETS; payload: { roll: DiceRoll } }
  | { type: GameActionType.NEW_GAME; payload: { startingBankroll: number } }
  | { type: GameActionType.RESET_BANKROLL; payload: { amount: number } };

// ============================================================================
// Statistics Types
// ============================================================================

/**
 * Statistics for a game session
 */
export interface GameStatistics {
  totalRolls: number;
  comeOutRolls: number;
  pointRolls: number;
  pointsEstablished: number;
  pointsMade: number;
  pointsMissed: number;

  // Dice statistics
  naturals: number; // 7 or 11 on come-out
  craps: number; // 2, 3, 12 on come-out

  // Betting statistics
  totalBetsPlaced: number;
  totalAmountWagered: number;
  totalAmountWon: number;
  totalAmountLost: number;
  netProfit: number;

  // By bet type
  betsByType: Record<BetType, {
    count: number;
    amountWagered: number;
    amountWon: number;
    amountLost: number;
    netProfit: number;
  }>;

  // Session info
  startTime: number;
  endTime?: number;
  duration?: number;
  startingBankroll: number;
  endingBankroll: number;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Configuration for bet placement rules
 */
export interface BetRules {
  minBet: number;
  maxBet: number;
  allowedInPhase: GamePhase[];
  requiresPoint: boolean;
  description: string;
}

/**
 * Configuration for odds multipliers
 */
export interface OddsConfig {
  maxOddsMultiple: number; // e.g., 3x, 5x, 10x odds
  enabled: boolean;
}

/**
 * Game settings/configuration
 */
export interface GameConfig {
  minBet: number;
  maxBet: number;
  startingBankroll: number;
  oddsConfig: OddsConfig;
  allowedBets: BetType[];
  animationSpeed: 'slow' | 'normal' | 'fast';
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

/**
 * Bet information for UI display
 */
export interface BetInfo {
  type: BetType;
  name: string;
  shortName: string;
  payout: BetPayout;
  rules: BetRules;
  category: 'line' | 'odds' | 'place' | 'proposition' | 'hardway' | 'field';
  recommended: boolean; // good bets vs bad bets
}
