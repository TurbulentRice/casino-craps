/**
 * Craps Table Layout Component
 * Defines the visual structure and betting areas of a craps table
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Body, Caption } from '../common';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TABLE_PADDING = Theme.spacing.md;

interface TableLayoutProps {
  children?: React.ReactNode;
}

export default function TableLayout({ children }: TableLayoutProps) {
  return (
    <View style={styles.tableContainer}>
      <View style={styles.table}>
        {children}
      </View>
    </View>
  );
}

/**
 * Pass Line Area
 */
export function PassLineArea({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.passLineArea}>
      <Caption color={Colors.light.background} style={styles.areaLabel}>
        PASS LINE
      </Caption>
      {children}
    </View>
  );
}

/**
 * Don't Pass Area
 */
export function DontPassArea({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.dontPassArea}>
      <Caption color={Colors.light.background} style={styles.areaLabel}>
        DON'T PASS BAR
      </Caption>
      {children}
    </View>
  );
}

/**
 * Come Area
 */
export function ComeArea({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.comeArea}>
      <Body color={Colors.light.background} weight="bold" style={styles.largeLabel}>
        COME
      </Body>
      {children}
    </View>
  );
}

/**
 * Field Area
 */
export function FieldArea({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.fieldArea}>
      <View style={styles.fieldHeader}>
        <Body color={Colors.light.background} weight="bold">
          FIELD
        </Body>
      </View>
      <View style={styles.fieldNumbers}>
        <Caption color={Colors.light.background}>2 • 3 • 4 • 9 • 10 • 11 • 12</Caption>
      </View>
      {children}
    </View>
  );
}

/**
 * Point Numbers Area (4, 5, 6, 8, 9, 10)
 */
export function PointNumbersArea({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.pointNumbersArea}>
      {children}
    </View>
  );
}

/**
 * Individual Point Box
 */
interface PointBoxProps {
  number: number;
  odds: string;
  children?: React.ReactNode;
}

export function PointBox({ number, odds, children }: PointBoxProps) {
  return (
    <View style={styles.pointBox}>
      <Body color={Colors.light.background} weight="bold" style={styles.pointNumber}>
        {number}
      </Body>
      <Caption color={Colors.light.background} style={styles.pointOdds}>
        {odds}
      </Caption>
      {children}
    </View>
  );
}

/**
 * Center Proposition Bets Area
 */
export function PropositionArea({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.propositionArea}>
      <Caption color={Colors.light.background} style={styles.areaLabel}>
        PROPOSITION BETS
      </Caption>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    width: '100%',
    padding: TABLE_PADDING,
  },
  table: {
    backgroundColor: Colors.table.felt,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 8,
    borderColor: '#8B4513', // Wood border
    padding: Theme.spacing.md,
    minHeight: 400,
    ...Theme.shadows.lg,
  },

  // Pass Line Area
  passLineArea: {
    borderWidth: 2,
    borderColor: Colors.light.background,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
    minHeight: 60,
  },

  // Don't Pass Area
  dontPassArea: {
    borderWidth: 2,
    borderColor: Colors.light.background,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    minHeight: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },

  // Come Area
  comeArea: {
    borderWidth: 2,
    borderColor: Colors.light.background,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Field Area
  fieldArea: {
    borderWidth: 2,
    borderColor: Colors.light.background,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    minHeight: 70,
  },
  fieldHeader: {
    marginBottom: Theme.spacing.xs,
  },
  fieldNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  // Point Numbers Area
  pointNumbersArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.md,
    gap: Theme.spacing.xs,
  },
  pointBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.light.background,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  pointNumber: {
    fontSize: 24,
  },
  pointOdds: {
    fontSize: 10,
    marginTop: Theme.spacing.xs,
  },

  // Proposition Area
  propositionArea: {
    borderWidth: 2,
    borderColor: Colors.light.background,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.md,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Labels
  areaLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  largeLabel: {
    fontSize: 20,
  },
});
