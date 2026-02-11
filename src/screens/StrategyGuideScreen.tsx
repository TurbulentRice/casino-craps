/**
 * Strategy Guide Screen - Betting strategies and odds reference
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Heading, Body, Card } from '../components/common';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

export default function StrategyGuideScreen() {
  return (
    <Container scrollable padding="lg" backgroundColor={Colors.dark.background}>
      <View style={styles.container}>
        <Heading level={2} color={Colors.light.background} align="center">
          Strategy Guide
        </Heading>
        <Body
          color={Colors.dark.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          Coming Soon - Odds, Payouts & Strategies
        </Body>

        {/* Best Bets */}
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Heading level={4} color={Colors.light.text}>
            ✅ Recommended Bets
          </Heading>
          <Body size="sm" color={Colors.light.textSecondary} style={styles.description}>
            These bets have the lowest house edge and give you the best odds of winning.
          </Body>

          <BetItem
            name="Pass Line + Odds"
            houseEdge="1.41% / 0%"
            color={Colors.success}
            description="Best bet for beginners"
          />
          <BetItem
            name="Don't Pass + Odds"
            houseEdge="1.36% / 0%"
            color={Colors.success}
            description="Slightly better odds"
          />
          <BetItem
            name="Place 6 or 8"
            houseEdge="1.52%"
            color={Colors.success}
            description="Good bet during point phase"
          />
        </Card>

        {/* Avoid These */}
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Heading level={4} color={Colors.light.text}>
            ⚠️ Bets to Avoid
          </Heading>
          <Body size="sm" color={Colors.light.textSecondary} style={styles.description}>
            These bets have high house edges and are not recommended.
          </Body>

          <BetItem
            name="Any 7"
            houseEdge="16.67%"
            color={Colors.error}
            description="Worst bet on the table"
          />
          <BetItem
            name="Hardways"
            houseEdge="9-11%"
            color={Colors.warning}
            description="High house edge"
          />
          <BetItem
            name="Big 6/8"
            houseEdge="9.09%"
            color={Colors.error}
            description="Place 6/8 instead"
          />
        </Card>

        {/* Features */}
        <Card variant="outlined" padding="md" style={styles.featuresCard}>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            ✨ Guide Features:
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Complete odds and payout tables
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Popular betting strategies
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Bankroll management tips
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Strategy simulator
          </Body>
        </Card>
      </View>
    </Container>
  );
}

function BetItem({
  name,
  houseEdge,
  color,
  description,
}: {
  name: string;
  houseEdge: string;
  color: string;
  description: string;
}) {
  return (
    <View style={styles.betItem}>
      <View style={styles.betHeader}>
        <Body weight="semibold" color={Colors.light.text}>
          {name}
        </Body>
        <Body size="sm" weight="bold" color={color}>
          {houseEdge}
        </Body>
      </View>
      <Body size="sm" color={Colors.light.textSecondary}>
        {description}
      </Body>
    </View>
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
  card: {
    marginBottom: Theme.spacing.lg,
  },
  description: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
    lineHeight: 20,
  },
  betItem: {
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.divider,
  },
  betHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  featuresCard: {
    gap: Theme.spacing.xs,
  },
});
