/**
 * Tests for dice rolling utilities
 */

import {
  rollDie,
  rollDice,
  isPointNumber,
  isNatural,
  isCraps,
  isSeven,
  isHardway,
  isSpecificHardway,
  determineRollOutcome,
  getRollDescription,
  getProbability,
  getPointProbability,
  getCombinations,
  simulateRolls,
  analyzeRolls,
} from '../../src/utils/dice';
import { DiceRoll, DieValue } from '../../src/types/game';

describe('Dice Rolling', () => {
  describe('rollDie', () => {
    it('should return a value between 1 and 6', () => {
      for (let i = 0; i < 100; i++) {
        const result = rollDie();
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(6);
      }
    });

    it('should return different values over multiple rolls', () => {
      const rolls = new Set();
      for (let i = 0; i < 100; i++) {
        rolls.add(rollDie());
      }
      // With 100 rolls, we should get at least 4 different values
      expect(rolls.size).toBeGreaterThanOrEqual(4);
    });
  });

  describe('rollDice', () => {
    it('should return a valid DiceRoll object', () => {
      const roll = rollDice();
      expect(roll).toHaveProperty('die1');
      expect(roll).toHaveProperty('die2');
      expect(roll).toHaveProperty('total');
      expect(roll).toHaveProperty('timestamp');
    });

    it('should have correct total', () => {
      for (let i = 0; i < 50; i++) {
        const roll = rollDice();
        expect(roll.total).toBe(roll.die1 + roll.die2);
      }
    });

    it('should have total between 2 and 12', () => {
      for (let i = 0; i < 100; i++) {
        const roll = rollDice();
        expect(roll.total).toBeGreaterThanOrEqual(2);
        expect(roll.total).toBeLessThanOrEqual(12);
      }
    });

    it('should have timestamp', () => {
      const roll = rollDice();
      expect(roll.timestamp).toBeLessThanOrEqual(Date.now());
      expect(roll.timestamp).toBeGreaterThan(Date.now() - 1000);
    });
  });
});

describe('Roll Identification', () => {
  describe('isPointNumber', () => {
    it('should return true for point numbers', () => {
      expect(isPointNumber(4)).toBe(true);
      expect(isPointNumber(5)).toBe(true);
      expect(isPointNumber(6)).toBe(true);
      expect(isPointNumber(8)).toBe(true);
      expect(isPointNumber(9)).toBe(true);
      expect(isPointNumber(10)).toBe(true);
    });

    it('should return false for non-point numbers', () => {
      expect(isPointNumber(2)).toBe(false);
      expect(isPointNumber(3)).toBe(false);
      expect(isPointNumber(7)).toBe(false);
      expect(isPointNumber(11)).toBe(false);
      expect(isPointNumber(12)).toBe(false);
    });
  });

  describe('isNatural', () => {
    it('should return true for 7 and 11', () => {
      expect(isNatural(7)).toBe(true);
      expect(isNatural(11)).toBe(true);
    });

    it('should return false for other numbers', () => {
      [2, 3, 4, 5, 6, 8, 9, 10, 12].forEach(num => {
        expect(isNatural(num)).toBe(false);
      });
    });
  });

  describe('isCraps', () => {
    it('should return true for 2, 3, and 12', () => {
      expect(isCraps(2)).toBe(true);
      expect(isCraps(3)).toBe(true);
      expect(isCraps(12)).toBe(true);
    });

    it('should return false for other numbers', () => {
      [4, 5, 6, 7, 8, 9, 10, 11].forEach(num => {
        expect(isCraps(num)).toBe(false);
      });
    });
  });

  describe('isSeven', () => {
    it('should return true only for 7', () => {
      expect(isSeven(7)).toBe(true);
    });

    it('should return false for other numbers', () => {
      [2, 3, 4, 5, 6, 8, 9, 10, 11, 12].forEach(num => {
        expect(isSeven(num)).toBe(false);
      });
    });
  });

  describe('isHardway', () => {
    it('should return true for hardway rolls', () => {
      expect(isHardway({ die1: 2, die2: 2, total: 4, timestamp: 0 })).toBe(true);
      expect(isHardway({ die1: 3, die2: 3, total: 6, timestamp: 0 })).toBe(true);
      expect(isHardway({ die1: 4, die2: 4, total: 8, timestamp: 0 })).toBe(true);
      expect(isHardway({ die1: 5, die2: 5, total: 10, timestamp: 0 })).toBe(true);
    });

    it('should return false for easy way rolls', () => {
      expect(isHardway({ die1: 1, die2: 3, total: 4, timestamp: 0 })).toBe(false);
      expect(isHardway({ die1: 2, die2: 4, total: 6, timestamp: 0 })).toBe(false);
      expect(isHardway({ die1: 3, die2: 5, total: 8, timestamp: 0 })).toBe(false);
      expect(isHardway({ die1: 4, die2: 6, total: 10, timestamp: 0 })).toBe(false);
    });

    it('should return false for non-hardway numbers', () => {
      expect(isHardway({ die1: 1, die2: 1, total: 2, timestamp: 0 })).toBe(false);
      expect(isHardway({ die1: 6, die2: 6, total: 12, timestamp: 0 })).toBe(false);
    });
  });
});

describe('Roll Outcomes', () => {
  describe('determineRollOutcome', () => {
    it('should identify natural on come-out roll', () => {
      expect(determineRollOutcome(
        { die1: 4, die2: 3, total: 7, timestamp: 0 },
        'come-out',
        null
      )).toBe('natural');

      expect(determineRollOutcome(
        { die1: 5, die2: 6, total: 11, timestamp: 0 },
        'come-out',
        null
      )).toBe('natural');
    });

    it('should identify craps on come-out roll', () => {
      expect(determineRollOutcome(
        { die1: 1, die2: 1, total: 2, timestamp: 0 },
        'come-out',
        null
      )).toBe('craps');

      expect(determineRollOutcome(
        { die1: 1, die2: 2, total: 3, timestamp: 0 },
        'come-out',
        null
      )).toBe('craps');

      expect(determineRollOutcome(
        { die1: 6, die2: 6, total: 12, timestamp: 0 },
        'come-out',
        null
      )).toBe('craps');
    });

    it('should identify point on come-out roll', () => {
      [4, 5, 6, 8, 9, 10].forEach(num => {
        const roll: DiceRoll = {
          die1: 1 as DieValue,
          die2: (num - 1) as DieValue,
          total: num,
          timestamp: 0,
        };
        expect(determineRollOutcome(roll, 'come-out', null)).toBe('point');
      });
    });

    it('should identify seven-out during point phase', () => {
      expect(determineRollOutcome(
        { die1: 3, die2: 4, total: 7, timestamp: 0 },
        'point',
        6
      )).toBe('seven-out');
    });

    it('should identify point-made during point phase', () => {
      expect(determineRollOutcome(
        { die1: 3, die2: 3, total: 6, timestamp: 0 },
        'point',
        6
      )).toBe('point-made');
    });

    it('should identify other rolls during point phase', () => {
      expect(determineRollOutcome(
        { die1: 2, die2: 3, total: 5, timestamp: 0 },
        'point',
        6
      )).toBe('other');
    });
  });

  describe('getRollDescription', () => {
    it('should describe special rolls', () => {
      expect(getRollDescription(
        { die1: 1, die2: 1, total: 2, timestamp: 0 },
        'craps'
      )).toContain('Snake Eyes');

      expect(getRollDescription(
        { die1: 5, die2: 6, total: 11, timestamp: 0 },
        'natural'
      )).toContain('Yo-leven');

      expect(getRollDescription(
        { die1: 6, die2: 6, total: 12, timestamp: 0 },
        'craps'
      )).toContain('Boxcars');
    });

    it('should note hardway rolls', () => {
      const desc = getRollDescription(
        { die1: 3, die2: 3, total: 6, timestamp: 0 },
        'point-made'
      );
      expect(desc).toContain('hard way');
    });
  });
});

describe('Probabilities', () => {
  describe('getProbability', () => {
    it('should return correct probabilities', () => {
      expect(getProbability(2).count).toBe(1);
      expect(getProbability(7).count).toBe(6);
      expect(getProbability(12).count).toBe(1);
      expect(getProbability(6).count).toBe(5);
    });

    it('should calculate correct probability values', () => {
      const sevenProb = getProbability(7);
      expect(sevenProb.probability).toBeCloseTo(1 / 6, 4);
    });
  });

  describe('getPointProbability', () => {
    it('should return higher probability for 6 and 8', () => {
      const prob6 = getPointProbability(6);
      const prob8 = getPointProbability(8);
      const prob4 = getPointProbability(4);

      expect(prob6).toBeGreaterThan(prob4);
      expect(prob8).toBeGreaterThan(prob4);
      expect(prob6).toBeCloseTo(prob8, 4);
    });

    it('should return correct probability for 4/10', () => {
      const prob = getPointProbability(4);
      // 3 ways to make 4, 6 ways to make 7 = 3/9 = 1/3
      expect(prob).toBeCloseTo(1 / 3, 4);
    });
  });

  describe('getCombinations', () => {
    it('should return all combinations for 7', () => {
      const combos = getCombinations(7);
      expect(combos).toHaveLength(6);
    });

    it('should return one combination for 2', () => {
      const combos = getCombinations(2);
      expect(combos).toHaveLength(1);
      expect(combos[0]).toEqual([1, 1]);
    });
  });
});

describe('Roll Simulation', () => {
  describe('simulateRolls', () => {
    it('should generate requested number of rolls', () => {
      const rolls = simulateRolls(100);
      expect(rolls).toHaveLength(100);
    });

    it('should generate valid rolls', () => {
      const rolls = simulateRolls(50);
      rolls.forEach(roll => {
        expect(roll.total).toBeGreaterThanOrEqual(2);
        expect(roll.total).toBeLessThanOrEqual(12);
        expect(roll.total).toBe(roll.die1 + roll.die2);
      });
    });
  });

  describe('analyzeRolls', () => {
    it('should correctly count rolls', () => {
      const rolls: DiceRoll[] = [
        { die1: 3, die2: 4, total: 7, timestamp: 0 },
        { die1: 5, die2: 6, total: 11, timestamp: 0 },
        { die1: 1, die2: 1, total: 2, timestamp: 0 },
      ];

      const analysis = analyzeRolls(rolls);
      expect(analysis.totalCount).toBe(3);
      expect(analysis.naturals).toBe(2); // 7 and 11
      expect(analysis.craps).toBe(1); // 2
      expect(analysis.sevens).toBe(1);
    });

    it('should count hardways', () => {
      const rolls: DiceRoll[] = [
        { die1: 3, die2: 3, total: 6, timestamp: 0 },
        { die1: 2, die2: 4, total: 6, timestamp: 0 },
      ];

      const analysis = analyzeRolls(rolls);
      expect(analysis.hardways).toBe(1);
    });
  });
});
