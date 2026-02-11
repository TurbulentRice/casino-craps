/**
 * Dice rolling utilities for craps game
 */

import { DieValue, DiceRoll, RollOutcome, GamePhase, PointNumber } from '../types/game';

/**
 * Roll a single die (returns 1-6)
 */
export function rollDie(): DieValue {
  return (Math.floor(Math.random() * 6) + 1) as DieValue;
}

/**
 * Roll two dice and return the result
 */
export function rollDice(): DiceRoll {
  const die1 = rollDie();
  const die2 = rollDie();

  return {
    die1,
    die2,
    total: die1 + die2,
    timestamp: Date.now(),
  };
}

/**
 * Check if a number is a valid point number (4, 5, 6, 8, 9, 10)
 */
export function isPointNumber(total: number): total is PointNumber {
  return [4, 5, 6, 8, 9, 10].includes(total);
}

/**
 * Check if the roll is a "natural" (7 or 11)
 */
export function isNatural(total: number): boolean {
  return total === 7 || total === 11;
}

/**
 * Check if the roll is "craps" (2, 3, or 12)
 */
export function isCraps(total: number): boolean {
  return total === 2 || total === 3 || total === 12;
}

/**
 * Check if the roll is a seven
 */
export function isSeven(total: number): boolean {
  return total === 7;
}

/**
 * Check if the dice show a "hardway" (both dice same value)
 * Hardways are: 2-2 (hard 4), 3-3 (hard 6), 4-4 (hard 8), 5-5 (hard 10)
 */
export function isHardway(roll: DiceRoll): boolean {
  const { die1, die2, total } = roll;
  return die1 === die2 && [4, 6, 8, 10].includes(total);
}

/**
 * Check if a specific hardway was rolled
 */
export function isSpecificHardway(roll: DiceRoll, targetTotal: 4 | 6 | 8 | 10): boolean {
  return isHardway(roll) && roll.total === targetTotal;
}

/**
 * Determine the outcome of a roll based on game phase and point
 */
export function determineRollOutcome(
  roll: DiceRoll,
  phase: GamePhase,
  point: PointNumber | null
): RollOutcome {
  const { total } = roll;

  if (phase === 'come-out') {
    // Come-out roll phase
    if (isNatural(total)) {
      return 'natural';
    }
    if (isCraps(total)) {
      return 'craps';
    }
    if (isPointNumber(total)) {
      return 'point';
    }
  } else {
    // Point phase
    if (isSeven(total)) {
      return 'seven-out';
    }
    if (point !== null && total === point) {
      return 'point-made';
    }
    return 'other';
  }

  return 'other';
}

/**
 * Get a description of the roll outcome for display
 */
export function getRollDescription(roll: DiceRoll, outcome: RollOutcome): string {
  const { total, die1, die2 } = roll;

  // Special names for specific totals
  const specialNames: Record<number, string> = {
    2: 'Snake Eyes',
    3: 'Ace Deuce',
    11: 'Yo-leven',
    12: 'Boxcars',
  };

  const baseName = specialNames[total] || `${total}`;

  // Add hardway notation if applicable
  const hardwayNote = isHardway(roll) ? ' the hard way' : '';

  switch (outcome) {
    case 'natural':
      return `${baseName}${hardwayNote} - Winner!`;
    case 'craps':
      return `${baseName} - Craps!`;
    case 'point':
      return `${baseName}${hardwayNote} - Point established`;
    case 'seven-out':
      return 'Seven out - Line away!';
    case 'point-made':
      return `${baseName}${hardwayNote} - Point made! Winner!`;
    case 'other':
      return `${baseName}${hardwayNote}`;
    default:
      return `${baseName}`;
  }
}

/**
 * Get the probability of rolling a specific total (out of 36 possible outcomes)
 */
export function getProbability(total: number): { count: number; probability: number; odds: string } {
  const combinations: Record<number, number> = {
    2: 1,   // 1-1
    3: 2,   // 1-2, 2-1
    4: 3,   // 1-3, 2-2, 3-1
    5: 4,   // 1-4, 2-3, 3-2, 4-1
    6: 5,   // 1-5, 2-4, 3-3, 4-2, 5-1
    7: 6,   // 1-6, 2-5, 3-4, 4-3, 5-2, 6-1
    8: 5,   // 2-6, 3-5, 4-4, 5-3, 6-2
    9: 4,   // 3-6, 4-5, 5-4, 6-3
    10: 3,  // 4-6, 5-5, 6-4
    11: 2,  // 5-6, 6-5
    12: 1,  // 6-6
  };

  const count = combinations[total] || 0;
  const probability = count / 36;
  const odds = `${count}:${36 - count}`;

  return { count, probability, odds };
}

/**
 * Calculate the probability of making the point
 * (Rolling the point before rolling a 7)
 */
export function getPointProbability(point: PointNumber): number {
  const pointWays = getProbability(point).count;
  const sevenWays = 6; // There are 6 ways to roll a 7

  return pointWays / (pointWays + sevenWays);
}

/**
 * Get all possible dice combinations that result in a specific total
 */
export function getCombinations(total: number): Array<[DieValue, DieValue]> {
  const combinations: Array<[DieValue, DieValue]> = [];

  for (let die1 = 1; die1 <= 6; die1++) {
    for (let die2 = 1; die2 <= 6; die2++) {
      if (die1 + die2 === total) {
        combinations.push([die1 as DieValue, die2 as DieValue]);
      }
    }
  }

  return combinations;
}

/**
 * Check if a roll contains a specific die value
 */
export function rollContains(roll: DiceRoll, value: DieValue): boolean {
  return roll.die1 === value || roll.die2 === value;
}

/**
 * Get the "opposite" or complementary number on a die (1↔6, 2↔5, 3↔4)
 */
export function getOpposite(die: DieValue): DieValue {
  return (7 - die) as DieValue;
}

/**
 * Format a dice roll for display
 */
export function formatRoll(roll: DiceRoll): string {
  return `[${roll.die1}][${roll.die2}] = ${roll.total}`;
}

/**
 * Generate a series of rolls for testing/simulation
 */
export function simulateRolls(count: number): DiceRoll[] {
  return Array.from({ length: count }, () => rollDice());
}

/**
 * Calculate statistics from a series of rolls
 */
export function analyzeRolls(rolls: DiceRoll[]): {
  totalCount: number;
  byTotal: Record<number, number>;
  naturals: number;
  craps: number;
  sevens: number;
  hardways: number;
} {
  const byTotal: Record<number, number> = {};
  let naturals = 0;
  let craps = 0;
  let sevens = 0;
  let hardways = 0;

  rolls.forEach(roll => {
    const { total } = roll;
    byTotal[total] = (byTotal[total] || 0) + 1;

    if (isNatural(total)) naturals++;
    if (isCraps(total)) craps++;
    if (isSeven(total)) sevens++;
    if (isHardway(roll)) hardways++;
  });

  return {
    totalCount: rolls.length,
    byTotal,
    naturals,
    craps,
    sevens,
    hardways,
  };
}
