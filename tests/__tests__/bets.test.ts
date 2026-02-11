/**
 * Tests for betting system utilities
 */

import {
  getBetPayout,
  getBetName,
  isBetAllowed,
  calculatePayout,
  resolveBet,
  isRecommendedBet,
  getRecommendedBets,
} from '../../src/utils/bets';
import { BetType, DiceRoll } from '../../src/types/game';

describe('Bet Information', () => {
  describe('getBetPayout', () => {
    it('should return payout info for all bet types', () => {
      Object.values(BetType).forEach(betType => {
        const payout = getBetPayout(betType);
        expect(payout).toHaveProperty('odds');
        expect(payout).toHaveProperty('houseEdge');
        expect(payout).toHaveProperty('description');
      });
    });

    it('should show 0% house edge for odds bets', () => {
      expect(getBetPayout(BetType.PASS_ODDS).houseEdge).toBe(0);
      expect(getBetPayout(BetType.DONT_PASS_ODDS).houseEdge).toBe(0);
      expect(getBetPayout(BetType.COME_ODDS).houseEdge).toBe(0);
      expect(getBetPayout(BetType.DONT_COME_ODDS).houseEdge).toBe(0);
    });

    it('should show low house edge for pass/dont pass', () => {
      expect(getBetPayout(BetType.PASS_LINE).houseEdge).toBeLessThan(1.5);
      expect(getBetPayout(BetType.DONT_PASS).houseEdge).toBeLessThan(1.5);
    });
  });

  describe('getBetName', () => {
    it('should return readable names', () => {
      expect(getBetName(BetType.PASS_LINE)).toBe('Pass Line');
      expect(getBetName(BetType.DONT_PASS)).toBe("Don't Pass");
      expect(getBetName(BetType.PLACE_6)).toBe('Place 6');
    });
  });
});

describe('Bet Validation', () => {
  describe('isBetAllowed', () => {
    it('should allow Pass Line only on come-out', () => {
      expect(isBetAllowed(BetType.PASS_LINE, 'come-out', null)).toBe(true);
      expect(isBetAllowed(BetType.PASS_LINE, 'point', 6)).toBe(false);
    });

    it('should allow odds bets only during point phase', () => {
      expect(isBetAllowed(BetType.PASS_ODDS, 'come-out', null)).toBe(false);
      expect(isBetAllowed(BetType.PASS_ODDS, 'point', 6)).toBe(true);
    });

    it('should allow Come bets anytime', () => {
      expect(isBetAllowed(BetType.COME, 'come-out', null)).toBe(true);
      expect(isBetAllowed(BetType.COME, 'point', 6)).toBe(true);
    });

    it('should allow place bets only when point is established', () => {
      expect(isBetAllowed(BetType.PLACE_6, 'come-out', null)).toBe(false);
      expect(isBetAllowed(BetType.PLACE_6, 'point', 6)).toBe(true);
    });
  });
});

describe('Payout Calculations', () => {
  const mockBet = (type: BetType, amount: number) => ({
    id: 'test-bet',
    type,
    amount,
    status: 'active' as const,
    placedAt: Date.now(),
  });

  describe('Line Bets', () => {
    it('should pay even money on Pass Line', () => {
      const bet = mockBet(BetType.PASS_LINE, 10);
      const roll: DiceRoll = { die1: 4, die2: 3, total: 7, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(20); // Original 10 + 10 winnings
    });

    it('should pay even money on Don\'t Pass', () => {
      const bet = mockBet(BetType.DONT_PASS, 10);
      const roll: DiceRoll = { die1: 1, die2: 1, total: 2, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(20);
    });
  });

  describe('Odds Bets', () => {
    it('should pay 2:1 odds on point 4', () => {
      const bet = mockBet(BetType.PASS_ODDS, 10);
      const roll: DiceRoll = { die1: 2, die2: 2, total: 4, timestamp: 0 };
      const payout = calculatePayout(bet, roll, 4);
      expect(payout).toBe(30); // 10 + (10 * 2)
    });

    it('should pay 3:2 odds on point 5', () => {
      const bet = mockBet(BetType.PASS_ODDS, 10);
      const roll: DiceRoll = { die1: 2, die2: 3, total: 5, timestamp: 0 };
      const payout = calculatePayout(bet, roll, 5);
      expect(payout).toBe(25); // 10 + (10 * 1.5)
    });

    it('should pay 6:5 odds on point 6', () => {
      const bet = mockBet(BetType.PASS_ODDS, 10);
      const roll: DiceRoll = { die1: 3, die2: 3, total: 6, timestamp: 0 };
      const payout = calculatePayout(bet, roll, 6);
      expect(payout).toBe(22); // 10 + (10 * 1.2)
    });

    it('should pay correct don\'t pass odds', () => {
      const bet = mockBet(BetType.DONT_PASS_ODDS, 10);
      const roll: DiceRoll = { die1: 4, die2: 3, total: 7, timestamp: 0 };
      const payout = calculatePayout(bet, roll, 4);
      expect(payout).toBe(15); // 10 + (10 * 0.5) for 1:2
    });
  });

  describe('Place Bets', () => {
    it('should pay 9:5 on place 4', () => {
      const bet = mockBet(BetType.PLACE_4, 5);
      const roll: DiceRoll = { die1: 2, die2: 2, total: 4, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(14); // 5 + (5 * 9/5)
    });

    it('should pay 7:6 on place 6', () => {
      const bet = mockBet(BetType.PLACE_6, 6);
      const roll: DiceRoll = { die1: 3, die2: 3, total: 6, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(13); // 6 + (6 * 7/6)
    });

    it('should pay 7:5 on place 5', () => {
      const bet = mockBet(BetType.PLACE_5, 5);
      const roll: DiceRoll = { die1: 2, die2: 3, total: 5, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(12); // 5 + (5 * 7/5)
    });
  });

  describe('Field Bet', () => {
    it('should pay 1:1 on normal field numbers', () => {
      const bet = mockBet(BetType.FIELD, 10);
      const roll: DiceRoll = { die1: 1, die2: 2, total: 3, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(20); // Even money
    });

    it('should pay 2:1 on 2', () => {
      const bet = mockBet(BetType.FIELD, 10);
      const roll: DiceRoll = { die1: 1, die2: 1, total: 2, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(30); // 2:1
    });

    it('should pay 3:1 on 12', () => {
      const bet = mockBet(BetType.FIELD, 10);
      const roll: DiceRoll = { die1: 6, die2: 6, total: 12, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(40); // 3:1
    });
  });

  describe('Hardways', () => {
    it('should pay 7:1 on hard 4', () => {
      const bet = mockBet(BetType.HARD_4, 5);
      const roll: DiceRoll = { die1: 2, die2: 2, total: 4, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(40); // 5 * 8
    });

    it('should pay 9:1 on hard 6', () => {
      const bet = mockBet(BetType.HARD_6, 5);
      const roll: DiceRoll = { die1: 3, die2: 3, total: 6, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(50); // 5 * 10
    });
  });

  describe('Proposition Bets', () => {
    it('should pay 4:1 on any 7', () => {
      const bet = mockBet(BetType.ANY_7, 5);
      const roll: DiceRoll = { die1: 3, die2: 4, total: 7, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(25); // 5 * 5
    });

    it('should pay 30:1 on snake eyes', () => {
      const bet = mockBet(BetType.SNAKE_EYES, 1);
      const roll: DiceRoll = { die1: 1, die2: 1, total: 2, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(31); // 1 * 31
    });

    it('should pay 15:1 on yo-eleven', () => {
      const bet = mockBet(BetType.YO_ELEVEN, 2);
      const roll: DiceRoll = { die1: 5, die2: 6, total: 11, timestamp: 0 };
      const payout = calculatePayout(bet, roll, null);
      expect(payout).toBe(32); // 2 * 16
    });
  });
});

describe('Bet Resolution', () => {
  const mockBet = (type: BetType, amount: number) => ({
    id: 'test-bet',
    type,
    amount,
    status: 'active' as const,
    placedAt: Date.now(),
  });

  describe('Pass Line Resolution', () => {
    it('should win on natural (7 or 11) during come-out', () => {
      const bet = mockBet(BetType.PASS_LINE, 10);
      const roll: DiceRoll = { die1: 4, die2: 3, total: 7, timestamp: 0 };
      const result = resolveBet(bet, roll, 'come-out', null);

      expect(result.outcome).toBe('win');
      expect(result.payout).toBe(20);
    });

    it('should lose on craps (2, 3, 12) during come-out', () => {
      const bet = mockBet(BetType.PASS_LINE, 10);
      const roll: DiceRoll = { die1: 1, die2: 1, total: 2, timestamp: 0 };
      const result = resolveBet(bet, roll, 'come-out', null);

      expect(result.outcome).toBe('lose');
      expect(result.netGain).toBe(-10);
    });

    it('should win when point is made', () => {
      const bet = mockBet(BetType.PASS_LINE, 10);
      const roll: DiceRoll = { die1: 3, die2: 3, total: 6, timestamp: 0 };
      const result = resolveBet(bet, roll, 'point', 6);

      expect(result.outcome).toBe('win');
      expect(result.payout).toBe(20);
    });

    it('should lose on seven-out', () => {
      const bet = mockBet(BetType.PASS_LINE, 10);
      const roll: DiceRoll = { die1: 3, die2: 4, total: 7, timestamp: 0 };
      const result = resolveBet(bet, roll, 'point', 6);

      expect(result.outcome).toBe('lose');
    });
  });

  describe('Don\'t Pass Resolution', () => {
    it('should lose on natural during come-out', () => {
      const bet = mockBet(BetType.DONT_PASS, 10);
      const roll: DiceRoll = { die1: 4, die2: 3, total: 7, timestamp: 0 };
      const result = resolveBet(bet, roll, 'come-out', null);

      expect(result.outcome).toBe('lose');
    });

    it('should win on craps 2 or 3 during come-out', () => {
      const bet = mockBet(BetType.DONT_PASS, 10);
      const roll: DiceRoll = { die1: 1, die2: 1, total: 2, timestamp: 0 };
      const result = resolveBet(bet, roll, 'come-out', null);

      expect(result.outcome).toBe('win');
    });

    it('should push on 12 during come-out', () => {
      const bet = mockBet(BetType.DONT_PASS, 10);
      const roll: DiceRoll = { die1: 6, die2: 6, total: 12, timestamp: 0 };
      const result = resolveBet(bet, roll, 'come-out', null);

      expect(result.outcome).toBe('push');
    });

    it('should win on seven-out', () => {
      const bet = mockBet(BetType.DONT_PASS, 10);
      const roll: DiceRoll = { die1: 3, die2: 4, total: 7, timestamp: 0 };
      const result = resolveBet(bet, roll, 'point', 6);

      expect(result.outcome).toBe('win');
    });
  });

  describe('Field Bet Resolution', () => {
    it('should win on field numbers', () => {
      const bet = mockBet(BetType.FIELD, 10);
      const fieldNumbers = [2, 3, 4, 9, 10, 11, 12];

      fieldNumbers.forEach(num => {
        const roll: DiceRoll = {
          die1: 1,
          die2: (num - 1) as any,
          total: num,
          timestamp: 0,
        };
        const result = resolveBet(bet, roll, 'point', 6);
        expect(result.outcome).toBe('win');
      });
    });

    it('should lose on non-field numbers', () => {
      const bet = mockBet(BetType.FIELD, 10);
      const nonFieldNumbers = [5, 6, 7, 8];

      nonFieldNumbers.forEach(num => {
        const roll: DiceRoll = {
          die1: 1,
          die2: (num - 1) as any,
          total: num,
          timestamp: 0,
        };
        const result = resolveBet(bet, roll, 'point', 6);
        expect(result.outcome).toBe('lose');
      });
    });
  });

  describe('Hardway Resolution', () => {
    it('should win when rolled the hard way', () => {
      const bet = mockBet(BetType.HARD_6, 5);
      const roll: DiceRoll = { die1: 3, die2: 3, total: 6, timestamp: 0 };
      const result = resolveBet(bet, roll, 'point', 8);

      expect(result.outcome).toBe('win');
    });

    it('should lose when rolled the easy way', () => {
      const bet = mockBet(BetType.HARD_6, 5);
      const roll: DiceRoll = { die1: 2, die2: 4, total: 6, timestamp: 0 };
      const result = resolveBet(bet, roll, 'point', 8);

      expect(result.outcome).toBe('lose');
    });

    it('should lose on seven', () => {
      const bet = mockBet(BetType.HARD_6, 5);
      const roll: DiceRoll = { die1: 3, die2: 4, total: 7, timestamp: 0 };
      const result = resolveBet(bet, roll, 'point', 8);

      expect(result.outcome).toBe('lose');
    });
  });
});

describe('Bet Recommendations', () => {
  describe('getRecommendedBets', () => {
    it('should return recommended bets', () => {
      const recommended = getRecommendedBets();
      expect(recommended).toContain(BetType.PASS_LINE);
      expect(recommended).toContain(BetType.PASS_ODDS);
      expect(recommended).toContain(BetType.PLACE_6);
      expect(recommended).toContain(BetType.PLACE_8);
    });

    it('should not include high house edge bets', () => {
      const recommended = getRecommendedBets();
      expect(recommended).not.toContain(BetType.ANY_7);
      expect(recommended).not.toContain(BetType.HARD_4);
      expect(recommended).not.toContain(BetType.BIG_6);
    });
  });

  describe('isRecommendedBet', () => {
    it('should identify good bets', () => {
      expect(isRecommendedBet(BetType.PASS_LINE)).toBe(true);
      expect(isRecommendedBet(BetType.PASS_ODDS)).toBe(true);
      expect(isRecommendedBet(BetType.PLACE_6)).toBe(true);
    });

    it('should identify bad bets', () => {
      expect(isRecommendedBet(BetType.ANY_7)).toBe(false);
      expect(isRecommendedBet(BetType.SNAKE_EYES)).toBe(false);
      expect(isRecommendedBet(BetType.BIG_6)).toBe(false);
    });
  });
});
