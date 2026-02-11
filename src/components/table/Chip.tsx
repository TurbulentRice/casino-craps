/**
 * Casino Chip Component
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Body, Caption } from '../common';

export type ChipValue = 1 | 5 | 25 | 100 | 500;

interface ChipProps {
  value: ChipValue;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const CHIP_COLORS: Record<ChipValue, string> = {
  1: Colors.chips.white,
  5: Colors.chips.red,
  25: Colors.chips.green,
  100: Colors.chips.black,
  500: Colors.chips.purple,
};

const CHIP_SIZES = {
  sm: 30,
  md: 50,
  lg: 60,
};

export default function Chip({ value, selected = false, onPress, size = 'md' }: ChipProps) {
  const chipColor = CHIP_COLORS[value];
  const chipSize = CHIP_SIZES[size];
  const isLight = value === 1;

  const content = (
    <View
      style={[
        styles.chip,
        {
          width: chipSize,
          height: chipSize,
          borderRadius: chipSize / 2,
          backgroundColor: chipColor,
        },
        selected && styles.selected,
      ]}
    >
      <View style={styles.chipInner}>
        <Caption
          color={isLight ? Colors.light.text : Colors.light.background}
          style={[styles.chipValue, size === 'sm' && styles.chipValueSmall]}
        >
          ${value}
        </Caption>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

/**
 * Chip Stack - Shows multiple chips stacked
 */
interface ChipStackProps {
  amount: number;
  size?: 'sm' | 'md';
}

export function ChipStack({ amount, size = 'sm' }: ChipStackProps) {
  // Break down amount into chips
  const chips: ChipValue[] = [];
  let remaining = amount;

  const denominations: ChipValue[] = [500, 100, 25, 5, 1];

  for (const denom of denominations) {
    while (remaining >= denom && chips.length < 5) {
      chips.push(denom);
      remaining -= denom;
    }
  }

  if (chips.length === 0 && amount > 0) {
    chips.push(1);
  }

  return (
    <View style={styles.chipStack}>
      {chips.slice(0, 3).map((value, index) => (
        <View
          key={index}
          style={[
            styles.stackedChip,
            { marginTop: index > 0 ? -CHIP_SIZES[size] * 0.7 : 0 },
          ]}
        >
          <Chip value={value} size={size} />
        </View>
      ))}
      {chips.length > 3 && (
        <Caption color={Colors.light.background} style={styles.moreChips}>
          +{chips.length - 3}
        </Caption>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.light.background,
    ...Theme.shadows.md,
  },
  chipInner: {
    width: '80%',
    height: '80%',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipValue: {
    fontWeight: '700',
    fontSize: 12,
  },
  chipValueSmall: {
    fontSize: 10,
  },
  selected: {
    borderColor: Colors.accent,
    borderWidth: 4,
    transform: [{ scale: 1.1 }],
  },

  // Chip Stack
  chipStack: {
    alignItems: 'center',
  },
  stackedChip: {
    zIndex: 10,
  },
  moreChips: {
    marginTop: Theme.spacing.xs,
    fontSize: 10,
    fontWeight: '700',
  },
});
