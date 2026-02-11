/**
 * Tutorial Screen - Interactive lessons
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Heading, Body, Card } from '../components/common';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

export default function TutorialScreen() {
  return (
    <Container scrollable padding="lg" backgroundColor={Colors.dark.background}>
      <View style={styles.container}>
        <Heading level={2} color={Colors.light.background} align="center">
          Interactive Tutorial
        </Heading>
        <Body
          color={Colors.dark.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          Coming Soon - Step-by-Step Lessons
        </Body>

        {/* Lessons Preview */}
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Heading level={4} color={Colors.light.text}>
            📚 Planned Lessons
          </Heading>

          <LessonItem number={1} title="The Basics" description="Game objective, dice rules, come-out roll" />
          <LessonItem number={2} title="Pass Line Bet" description="The most fundamental bet in craps" />
          <LessonItem number={3} title="The Point" description="What happens when point is established" />
          <LessonItem number={4} title="Don't Pass Bet" description="Betting against the shooter" />
          <LessonItem number={5} title="Odds Bets" description="Backing your original bet (0% house edge!)" />
          <LessonItem number={6} title="Come & Don't Come" description="Additional betting opportunities" />
          <LessonItem number={7} title="Place Bets" description="Betting on specific numbers" />
          <LessonItem number={8} title="Field & Props" description="One-roll bets and propositions" />
        </Card>

        {/* Features */}
        <Card variant="outlined" padding="md" style={styles.featuresCard}>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            ✨ Tutorial Features:
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Interactive guided lessons
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Practice exercises with validation
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Achievement badges for completion
          </Body>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            • Progress tracking
          </Body>
        </Card>
      </View>
    </Container>
  );
}

function LessonItem({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <View style={styles.lessonItem}>
      <View style={styles.lessonNumber}>
        <Body weight="bold" color={Colors.primary}>
          {number}
        </Body>
      </View>
      <View style={styles.lessonContent}>
        <Body weight="semibold" color={Colors.light.text}>
          {title}
        </Body>
        <Body size="sm" color={Colors.light.textSecondary}>
          {description}
        </Body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
  },
  subtitle: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
  },
  card: {
    marginBottom: Theme.spacing.lg,
  },
  lessonItem: {
    flexDirection: 'row',
    marginTop: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.divider,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Colors.light.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  lessonContent: {
    flex: 1,
  },
  featuresCard: {
    gap: Theme.spacing.xs,
  },
});
