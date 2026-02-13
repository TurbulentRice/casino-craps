/**
 * Chip Selector Component
 * Allows player to select chip denomination for betting
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import Chip from './Chip';
import { Caption } from '../common';

export type ChipValue = 1 | 5 | 25 | 100 | 500;

interface ChipSelectorProps {
  selectedValue: ChipValue;
  onSelect: (value: ChipValue) => void;
  availableChips?: ChipValue[];
}

const DEFAULT_CHIPS: ChipValue[] = [1, 5, 25, 100, 500];

export default function ChipSelector({
  selectedValue,
  onSelect,
  availableChips = DEFAULT_CHIPS,
}: ChipSelectorProps) {
  return (
    <View style={styles.container}>
      <Caption color={Colors.light.background} style={styles.label}>
        SELECT CHIP
      </Caption>
      <View style={styles.chipRow}>
        {availableChips.map((value) => (
          <View key={value} style={styles.chipContainer}>
            <Chip
              value={value}
              selected={selectedValue === value}
              onPress={() => onSelect(value)}
              size="md"
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.lg,
  },
  label: {
    textAlign: 'center',
    marginBottom: Theme.spacing.sm,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  chipRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  chipContainer: {
    alignItems: 'center',
  },
});
