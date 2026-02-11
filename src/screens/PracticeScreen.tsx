/**
 * Practice Screen - Craps table practice mode
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Heading, Body, Button, Card } from '../components/common';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGame } from '../context/GameContext';

export default function PracticeScreen() {
  const { state } = useGame();

  return (
    <Container scrollable padding="lg" backgroundColor={Colors.dark.background}>
      <View style={styles.container}>
        <Heading level={2} color={Colors.light.background} align="center">
          Practice Mode
        </Heading>
        <Body
          color={Colors.dark.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          Coming Soon - Interactive Craps Table
        </Body>

        {/* Game Info Card */}
        <Card variant="elevated" padding="lg" style={styles.infoCard}>
          <Heading level={4} color={Colors.light.text}>
            Game Status
          </Heading>
          <View style={styles.statusRow}>
            <Body color={Colors.light.textSecondary}>Bankroll:</Body>
            <Body weight="bold" color={Colors.accent}>
              ${state.player.bankroll.toFixed(2)}
            </Body>
          </View>
          <View style={styles.statusRow}>
            <Body color={Colors.light.textSecondary}>Phase:</Body>
            <Body weight="bold" color={Colors.info}>
              {state.phase === 'come-out' ? 'Come Out Roll' : `Point: ${state.point}`}
            </Body>
          </View>
          <View style={styles.statusRow}>
            <Body color={Colors.light.textSecondary}>Rolls:</Body>
            <Body weight="bold">{state.rollCount}</Body>
          </View>
        </Card>

        {/* Placeholder */}
        <Card variant="outlined" padding="xl" style={styles.placeholderCard}>
          <Heading level={1} align="center" style={styles.placeholderIcon}>
            🎲
          </Heading>
          <Heading level={3} align="center" color={Colors.light.text}>
            Craps Table
          </Heading>
          <Body
            color={Colors.light.textSecondary}
            align="center"
            style={styles.placeholderText}
          >
            The interactive craps table will be implemented in Phase 4. You'll be able to place
            bets, roll dice, and practice your strategies!
          </Body>
        </Card>

        {/* Features Preview */}
        <Card variant="elevated" padding="md" style={styles.featuresCard}>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            ✨ Features Coming Soon:
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Visual craps table layout
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Interactive betting areas
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Animated dice rolls
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Real-time bet resolution
          </Body>
        </Card>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Theme.spacing.xl,
  },
  subtitle: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
  },
  infoCard: {
    marginBottom: Theme.spacing.lg,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.sm,
  },
  placeholderCard: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
    minHeight: 250,
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 72,
    marginBottom: Theme.spacing.md,
  },
  placeholderText: {
    marginTop: Theme.spacing.md,
    lineHeight: 24,
  },
  featuresCard: {
    gap: Theme.spacing.xs,
  },
});
