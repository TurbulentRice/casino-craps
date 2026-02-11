/**
 * Betting system utilities for craps game
 * All payouts and odds match standard casino rules
 */

import {
  Bet,
  BetType,
  BetPayout,
  BetResult,
  BetInfo,
  BetRules,
  DiceRoll,
  GamePhase,
  PointNumber,
} from '../types/game';
import { isPointNumber } from './dice';

// ============================================================================
// Bet Information & Configuration
// ============================================================================

/**
 * Get payout information for a specific bet type
 */
export function getBetPayout(betType: BetType): BetPayout {
  const payouts: Record<BetType, BetPayout> = {
    // Line Bets
    [BetType.PASS_LINE]: {
      odds: '1:1',
      houseEdge: 1.41,
      description: 'Even money on pass line win',
    },
    [BetType.DONT_PASS]: {
      odds: '1:1',
      houseEdge: 1.36,
      description: 'Even money on don\'t pass win',
    },
    [BetType.COME]: {
      odds: '1:1',
      houseEdge: 1.41,
      description: 'Even money on come bet win',
    },
    [BetType.DONT_COME]: {
      odds: '1:1',
      houseEdge: 1.36,
      description: 'Even money on don\'t come win',
    },

    // Odds Bets (no house edge!)
    [BetType.PASS_ODDS]: {
      odds: 'Varies',
      houseEdge: 0,
      description: '2:1 on 4/10, 3:2 on 5/9, 6:5 on 6/8',
    },
    [BetType.DONT_PASS_ODDS]: {
      odds: 'Varies',
      houseEdge: 0,
      description: '1:2 on 4/10, 2:3 on 5/9, 5:6 on 6/8',
    },
    [BetType.COME_ODDS]: {
      odds: 'Varies',
      houseEdge: 0,
      description: '2:1 on 4/10, 3:2 on 5/9, 6:5 on 6/8',
    },
    [BetType.DONT_COME_ODDS]: {
      odds: 'Varies',
      houseEdge: 0,
      description: '1:2 on 4/10, 2:3 on 5/9, 5:6 on 6/8',
    },

    // Place Bets
    [BetType.PLACE_4]: {
      odds: '9:5',
      houseEdge: 6.67,
      description: 'Place bet on 4',
    },
    [BetType.PLACE_5]: {
      odds: '7:5',
      houseEdge: 4.0,
      description: 'Place bet on 5',
    },
    [BetType.PLACE_6]: {
      odds: '7:6',
      houseEdge: 1.52,
      description: 'Place bet on 6',
    },
    [BetType.PLACE_8]: {
      odds: '7:6',
      houseEdge: 1.52,
      description: 'Place bet on 8',
    },
    [BetType.PLACE_9]: {
      odds: '7:5',
      houseEdge: 4.0,
      description: 'Place bet on 9',
    },
    [BetType.PLACE_10]: {
      odds: '9:5',
      houseEdge: 6.67,
      description: 'Place bet on 10',
    },

    // Buy Bets (5% commission)
    [BetType.BUY_4]: {
      odds: '2:1',
      houseEdge: 4.76,
      description: 'Buy the 4 (5% commission)',
    },
    [BetType.BUY_5]: {
      odds: '3:2',
      houseEdge: 4.76,
      description: 'Buy the 5 (5% commission)',
    },
    [BetType.BUY_6]: {
      odds: '6:5',
      houseEdge: 4.76,
      description: 'Buy the 6 (5% commission)',
    },
    [BetType.BUY_8]: {
      odds: '6:5',
      houseEdge: 4.76,
      description: 'Buy the 8 (5% commission)',
    },
    [BetType.BUY_9]: {
      odds: '3:2',
      houseEdge: 4.76,
      description: 'Buy the 9 (5% commission)',
    },
    [BetType.BUY_10]: {
      odds: '2:1',
      houseEdge: 4.76,
      description: 'Buy the 10 (5% commission)',
    },

    // Field Bet
    [BetType.FIELD]: {
      odds: '1:1 (2:1 on 2, 3:1 on 12)',
      houseEdge: 2.78,
      description: 'Wins on 2,3,4,9,10,11,12',
    },

    // Hardways
    [BetType.HARD_4]: {
      odds: '7:1',
      houseEdge: 11.11,
      description: 'Hard 4 (2-2)',
    },
    [BetType.HARD_6]: {
      odds: '9:1',
      houseEdge: 9.09,
      description: 'Hard 6 (3-3)',
    },
    [BetType.HARD_8]: {
      odds: '9:1',
      houseEdge: 9.09,
      description: 'Hard 8 (4-4)',
    },
    [BetType.HARD_10]: {
      odds: '7:1',
      houseEdge: 11.11,
      description: 'Hard 10 (5-5)',
    },

    // Proposition Bets
    [BetType.ANY_7]: {
      odds: '4:1',
      houseEdge: 16.67,
      description: 'Any 7',
    },
    [BetType.ANY_CRAPS]: {
      odds: '7:1',
      houseEdge: 11.11,
      description: 'Any craps (2, 3, or 12)',
    },
    [BetType.SNAKE_EYES]: {
      odds: '30:1',
      houseEdge: 13.89,
      description: 'Snake eyes (1-1)',
    },
    [BetType.ACE_DEUCE]: {
      odds: '15:1',
      houseEdge: 11.11,
      description: 'Ace deuce (1-2)',
    },
    [BetType.YO_ELEVEN]: {
      odds: '15:1',
      houseEdge: 11.11,
      description: 'Yo-leven (11)',
    },
    [BetType.BOXCARS]: {
      odds: '30:1',
      houseEdge: 13.89,
      description: 'Boxcars (6-6)',
    },

    // Horn Bets
    [BetType.HORN]: {
      odds: 'Varies',
      houseEdge: 12.5,
      description: 'Horn bet (2, 3, 11, 12)',
    },
    [BetType.HORN_HIGH_2]: {
      odds: 'Varies',
      houseEdge: 12.5,
      description: 'Horn high 2',
    },
    [BetType.HORN_HIGH_3]: {
      odds: 'Varies',
      houseEdge: 12.5,
      description: 'Horn high 3',
    },
    [BetType.HORN_HIGH_11]: {
      odds: 'Varies',
      houseEdge: 12.5,
      description: 'Horn high 11',
    },
    [BetType.HORN_HIGH_12]: {
      odds: 'Varies',
      houseEdge: 12.5,
      description: 'Horn high 12',
    },

    // Big 6/8
    [BetType.BIG_6]: {
      odds: '1:1',
      houseEdge: 9.09,
      description: 'Big 6 (not recommended)',
    },
    [BetType.BIG_8]: {
      odds: '1:1',
      houseEdge: 9.09,
      description: 'Big 8 (not recommended)',
    },
  };

  return payouts[betType];
}

/**
 * Get display name for bet type
 */
export function getBetName(betType: BetType): string {
  const names: Record<BetType, string> = {
    [BetType.PASS_LINE]: 'Pass Line',
    [BetType.DONT_PASS]: 'Don\'t Pass',
    [BetType.COME]: 'Come',
    [BetType.DONT_COME]: 'Don\'t Come',
    [BetType.PASS_ODDS]: 'Pass Line Odds',
    [BetType.DONT_PASS_ODDS]: 'Don\'t Pass Odds',
    [BetType.COME_ODDS]: 'Come Odds',
    [BetType.DONT_COME_ODDS]: 'Don\'t Come Odds',
    [BetType.PLACE_4]: 'Place 4',
    [BetType.PLACE_5]: 'Place 5',
    [BetType.PLACE_6]: 'Place 6',
    [BetType.PLACE_8]: 'Place 8',
    [BetType.PLACE_9]: 'Place 9',
    [BetType.PLACE_10]: 'Place 10',
    [BetType.BUY_4]: 'Buy 4',
    [BetType.BUY_5]: 'Buy 5',
    [BetType.BUY_6]: 'Buy 6',
    [BetType.BUY_8]: 'Buy 8',
    [BetType.BUY_9]: 'Buy 9',
    [BetType.BUY_10]: 'Buy 10',
    [BetType.FIELD]: 'Field',
    [BetType.HARD_4]: 'Hard 4',
    [BetType.HARD_6]: 'Hard 6',
    [BetType.HARD_8]: 'Hard 8',
    [BetType.HARD_10]: 'Hard 10',
    [BetType.ANY_7]: 'Any 7',
    [BetType.ANY_CRAPS]: 'Any Craps',
    [BetType.SNAKE_EYES]: 'Snake Eyes (2)',
    [BetType.ACE_DEUCE]: 'Ace Deuce (3)',
    [BetType.YO_ELEVEN]: 'Yo-Eleven (11)',
    [BetType.BOXCARS]: 'Boxcars (12)',
    [BetType.HORN]: 'Horn',
    [BetType.HORN_HIGH_2]: 'Horn High 2',
    [BetType.HORN_HIGH_3]: 'Horn High 3',
    [BetType.HORN_HIGH_11]: 'Horn High 11',
    [BetType.HORN_HIGH_12]: 'Horn High 12',
    [BetType.BIG_6]: 'Big 6',
    [BetType.BIG_8]: 'Big 8',
  };

  return names[betType];
}

/**
 * Check if a bet is allowed in the current game phase
 */
export function isBetAllowed(
  betType: BetType,
  phase: GamePhase,
  point: PointNumber | null
): boolean {
  // Pass/Don't Pass only on come-out
  if ([BetType.PASS_LINE, BetType.DONT_PASS].includes(betType)) {
    return phase === 'come-out';
  }

  // Odds bets only when point is established
  if ([BetType.PASS_ODDS, BetType.DONT_PASS_ODDS].includes(betType)) {
    return phase === 'point' && point !== null;
  }

  // Come/Don't Come available anytime
  if ([BetType.COME, BetType.DONT_COME].includes(betType)) {
    return true;
  }

  // Place bets only when point is established
  if (betType.startsWith('PLACE_') || betType.startsWith('BUY_')) {
    return phase === 'point' && point !== null;
  }

  // Most other bets available anytime
  return true;
}

// ============================================================================
// Payout Calculations
// ============================================================================

/**
 * Calculate payout for odds bet based on point number
 */
function calculateOddsPayout(
  amount: number,
  point: PointNumber,
  isDontPass: boolean = false
): number {
  if (isDontPass) {
    // Don't Pass/Don't Come odds (laying odds)
    switch (point) {
      case 4:
      case 10:
        return amount * 0.5; // 1:2
      case 5:
      case 9:
        return amount * (2 / 3); // 2:3
      case 6:
      case 8:
        return amount * (5 / 6); // 5:6
    }
  } else {
    // Pass/Come odds (taking odds)
    switch (point) {
      case 4:
      case 10:
        return amount * 2; // 2:1
      case 5:
      case 9:
        return amount * 1.5; // 3:2
      case 6:
      case 8:
        return amount * 1.2; // 6:5
    }
  }

  return 0;
}

/**
 * Calculate payout for a winning bet
 * Returns the total payout (includes original bet)
 */
export function calculatePayout(
  bet: Bet,
  roll: DiceRoll,
  point: PointNumber | null
): number {
  const { type, amount } = bet;

  switch (type) {
    // Line bets - even money
    case BetType.PASS_LINE:
    case BetType.DONT_PASS:
    case BetType.COME:
    case BetType.DONT_COME:
      return amount * 2; // Original + winnings

    // Odds bets
    case BetType.PASS_ODDS:
    case BetType.COME_ODDS:
      if (point) {
        return amount + calculateOddsPayout(amount, point, false);
      }
      return 0;

    case BetType.DONT_PASS_ODDS:
    case BetType.DONT_COME_ODDS:
      if (point) {
        return amount + calculateOddsPayout(amount, point, true);
      }
      return 0;

    // Place bets
    case BetType.PLACE_4:
    case BetType.PLACE_10:
      return amount + (amount * 9) / 5; // 9:5
    case BetType.PLACE_5:
    case BetType.PLACE_9:
      return amount + (amount * 7) / 5; // 7:5
    case BetType.PLACE_6:
    case BetType.PLACE_8:
      return amount + (amount * 7) / 6; // 7:6

    // Buy bets (true odds minus 5% commission)
    case BetType.BUY_4:
    case BetType.BUY_10:
      return amount + amount * 2; // 2:1 (commission already paid)
    case BetType.BUY_5:
    case BetType.BUY_9:
      return amount + amount * 1.5; // 3:2
    case BetType.BUY_6:
    case BetType.BUY_8:
      return amount + amount * 1.2; // 6:5

    // Field bet
    case BetType.FIELD:
      if (roll.total === 2) {
        return amount * 3; // 2:1 payout
      } else if (roll.total === 12) {
        return amount * 4; // 3:1 payout
      } else {
        return amount * 2; // 1:1 payout
      }

    // Hardways
    case BetType.HARD_4:
    case BetType.HARD_10:
      return amount * 8; // 7:1
    case BetType.HARD_6:
    case BetType.HARD_8:
      return amount * 10; // 9:1

    // Proposition bets
    case BetType.ANY_7:
      return amount * 5; // 4:1
    case BetType.ANY_CRAPS:
      return amount * 8; // 7:1
    case BetType.SNAKE_EYES:
    case BetType.BOXCARS:
      return amount * 31; // 30:1
    case BetType.ACE_DEUCE:
    case BetType.YO_ELEVEN:
      return amount * 16; // 15:1

    // Big 6/8
    case BetType.BIG_6:
    case BetType.BIG_8:
      return amount * 2; // 1:1

    default:
      return 0;
  }
}

// ============================================================================
// Bet Resolution
// ============================================================================

/**
 * Determine if a bet wins, loses, or pushes based on the roll
 */
export function resolveBet(
  bet: Bet,
  roll: DiceRoll,
  phase: GamePhase,
  point: PointNumber | null,
  previousPhase?: GamePhase
): BetResult {
  const { type, amount } = bet;
  const { total, die1, die2 } = roll;

  let outcome: 'win' | 'lose' | 'push' = 'lose';
  let payout = 0;

  // Pass Line
  if (type === BetType.PASS_LINE) {
    if (phase === 'come-out') {
      if ([7, 11].includes(total)) {
        outcome = 'win';
      } else if ([2, 3, 12].includes(total)) {
        outcome = 'lose';
      }
    } else if (previousPhase === 'come-out' && phase === 'point') {
      // Point established, bet stays
      outcome = 'push';
    } else if (phase === 'point' && point && total === point) {
      outcome = 'win';
    } else if (phase === 'point' && total === 7) {
      outcome = 'lose';
    } else {
      outcome = 'push';
    }
  }

  // Don't Pass
  if (type === BetType.DONT_PASS) {
    if (phase === 'come-out') {
      if ([7, 11].includes(total)) {
        outcome = 'lose';
      } else if ([2, 3].includes(total)) {
        outcome = 'win';
      } else if (total === 12) {
        outcome = 'push'; // Bar 12
      }
    } else if (previousPhase === 'come-out' && phase === 'point') {
      outcome = 'push';
    } else if (phase === 'point' && total === 7) {
      outcome = 'win';
    } else if (phase === 'point' && point && total === point) {
      outcome = 'lose';
    } else {
      outcome = 'push';
    }
  }

  // Field bet
  if (type === BetType.FIELD) {
    if ([2, 3, 4, 9, 10, 11, 12].includes(total)) {
      outcome = 'win';
    } else {
      outcome = 'lose';
    }
  }

  // Place bets
  const placeMap: Record<string, number> = {
    [BetType.PLACE_4]: 4,
    [BetType.PLACE_5]: 5,
    [BetType.PLACE_6]: 6,
    [BetType.PLACE_8]: 8,
    [BetType.PLACE_9]: 9,
    [BetType.PLACE_10]: 10,
  };

  if (type in placeMap) {
    if (total === placeMap[type]) {
      outcome = 'win';
    } else if (total === 7) {
      outcome = 'lose';
    } else {
      outcome = 'push';
    }
  }

  // Hardways
  if (type === BetType.HARD_4 && total === 4) {
    outcome = die1 === die2 ? 'win' : 'lose';
  } else if (type === BetType.HARD_6 && total === 6) {
    outcome = die1 === die2 ? 'win' : 'lose';
  } else if (type === BetType.HARD_8 && total === 8) {
    outcome = die1 === die2 ? 'win' : 'lose';
  } else if (type === BetType.HARD_10 && total === 10) {
    outcome = die1 === die2 ? 'win' : 'lose';
  } else if (type.startsWith('HARD_') && total === 7) {
    outcome = 'lose';
  } else if (type.startsWith('HARD_')) {
    outcome = 'push';
  }

  // Proposition bets
  if (type === BetType.ANY_7 && total === 7) outcome = 'win';
  if (type === BetType.ANY_CRAPS && [2, 3, 12].includes(total)) outcome = 'win';
  if (type === BetType.SNAKE_EYES && total === 2) outcome = 'win';
  if (type === BetType.ACE_DEUCE && total === 3) outcome = 'win';
  if (type === BetType.YO_ELEVEN && total === 11) outcome = 'win';
  if (type === BetType.BOXCARS && total === 12) outcome = 'win';

  // Calculate payout for wins
  if (outcome === 'win') {
    payout = calculatePayout(bet, roll, point);
  } else if (outcome === 'push') {
    payout = amount; // Return original bet
  }

  const netGain = outcome === 'win' ? payout - amount : outcome === 'push' ? 0 : -amount;

  return {
    bet: { ...bet, status: outcome === 'push' ? 'active' : outcome === 'win' ? 'won' : 'lost' },
    outcome,
    payout,
    netGain,
  };
}

/**
 * Get recommended bets (low house edge)
 */
export function getRecommendedBets(): BetType[] {
  return [
    BetType.PASS_LINE,
    BetType.DONT_PASS,
    BetType.PASS_ODDS,
    BetType.DONT_PASS_ODDS,
    BetType.COME,
    BetType.DONT_COME,
    BetType.COME_ODDS,
    BetType.DONT_COME_ODDS,
    BetType.PLACE_6,
    BetType.PLACE_8,
  ];
}

/**
 * Check if a bet type is recommended (good odds)
 */
export function isRecommendedBet(betType: BetType): boolean {
  return getRecommendedBets().includes(betType);
}
