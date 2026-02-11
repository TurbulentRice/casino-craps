/**
 * Dice Display Component
 * Shows dice with proper pip layout
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DieValue, DiceRoll } from '../../types/game';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Heading } from '../common';

interface DiceProps {
  roll: DiceRoll | null;
  size?: 'sm' | 'md' | 'lg';
}

const DIE_SIZES = {
  sm: 40,
  md: 60,
  lg: 80,
};

const PIP_SIZES = {
  sm: 6,
  md: 8,
  lg: 10,
};

export default function Dice({ roll, size = 'md' }: DiceProps) {
  if (!roll) {
    return (
      <View style={styles.container}>
        <Heading level={3} color={Colors.light.background}>
          🎲 🎲
        </Heading>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Die value={roll.die1} size={size} />
      <View style={styles.spacer} />
      <Die value={roll.die2} size={size} />
    </View>
  );
}

/**
 * Single Die Component
 */
interface DieProps {
  value: DieValue;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

function Die({ value, size = 'md', color = Colors.dice.white }: DieProps) {
  const dieSize = DIE_SIZES[size];
  const pipSize = PIP_SIZES[size];

  return (
    <View
      style={[
        styles.die,
        {
          width: dieSize,
          height: dieSize,
          borderRadius: Theme.borderRadius.sm,
          backgroundColor: color,
        },
      ]}
    >
      <DiePips value={value} size={pipSize} />
    </View>
  );
}

/**
 * Die Pips Component - Renders the dots
 */
interface DiePipsProps {
  value: DieValue;
  size: number;
}

function DiePips({ value, size }: DiePipsProps) {
  const Pip = () => (
    <View
      style={[
        styles.pip,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );

  // Pip layouts for each die value
  const renderPips = () => {
    switch (value) {
      case 1:
        return (
          <View style={styles.pipsCenter}>
            <Pip />
          </View>
        );
      case 2:
        return (
          <View style={styles.pipsCorners}>
            <Pip />
            <View style={styles.pipsSpacer} />
            <Pip />
          </View>
        );
      case 3:
        return (
          <View style={styles.pipsDiagonal}>
            <Pip />
            <Pip />
            <Pip />
          </View>
        );
      case 4:
        return (
          <View style={styles.pipsFour}>
            <View style={styles.pipsRow}>
              <Pip />
              <Pip />
            </View>
            <View style={styles.pipsRow}>
              <Pip />
              <Pip />
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.pipsFive}>
            <View style={styles.pipsRow}>
              <Pip />
              <Pip />
            </View>
            <View style={styles.pipsRow}>
              <Pip />
            </View>
            <View style={styles.pipsRow}>
              <Pip />
              <Pip />
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.pipsSix}>
            <View style={styles.pipsColumn}>
              <Pip />
              <Pip />
              <Pip />
            </View>
            <View style={styles.pipsColumn}>
              <Pip />
              <Pip />
              <Pip />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return <View style={styles.pipsContainer}>{renderPips()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: Theme.spacing.md,
  },

  // Die
  die: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    ...Theme.shadows.md,
  },

  // Pip
  pip: {
    backgroundColor: Colors.dice.pips,
  },

  // Pip layouts
  pipsContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: Theme.spacing.xs,
  },
  pipsCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pipsCorners: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pipsDiagonal: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pipsFour: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pipsFive: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pipsSix: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  pipsColumn: {
    justifyContent: 'space-between',
    height: '100%',
  },
  pipsSpacer: {
    flex: 1,
  },
});
