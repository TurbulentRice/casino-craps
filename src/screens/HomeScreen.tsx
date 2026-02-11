/**
 * Home Screen - Welcome and navigation to main features
 */

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../navigation/types';
import { Container, Button, Card, Heading, Body, Caption } from '../components/common';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Container scrollable padding="lg" backgroundColor={Colors.dark.background}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.appIcon}
            resizeMode="contain"
          />
          <Heading level={1} color={Colors.light.background} align="center">
            Casino Craps
          </Heading>
          <Caption color={Colors.dark.textSecondary} align="center" style={styles.subtitle}>
            Learn • Practice • Master
          </Caption>
        </View>

        {/* Welcome Card */}
        <Card variant="elevated" padding="lg" style={styles.welcomeCard}>
          <Heading level={3} color={Colors.light.text} align="center">
            Welcome to Craps School! 🎯
          </Heading>
          <Body
            size="md"
            color={Colors.light.textSecondary}
            align="center"
            style={styles.welcomeText}
          >
            Learn the exciting game of craps with interactive tutorials, practice with virtual
            chips, and master winning strategies.
          </Body>
        </Card>

        {/* Main Navigation Cards */}
        <View style={styles.navigationSection}>
          <Caption color={Colors.dark.textSecondary} style={styles.sectionLabel}>
            GET STARTED
          </Caption>

          <FeatureCard
            icon="🎯"
            title="Practice Mode"
            description="Play craps with virtual chips and build your confidence"
            onPress={() => navigation.navigate('Practice')}
          />

          <FeatureCard
            icon="📚"
            title="Interactive Tutorial"
            description="Step-by-step lessons from basics to advanced strategies"
            onPress={() => navigation.navigate('Tutorial')}
          />

          <FeatureCard
            icon="📊"
            title="Strategy Guide"
            description="Learn odds, payouts, and winning strategies"
            onPress={() => navigation.navigate('Guide')}
          />
        </View>

        {/* Quick Stats */}
        <Card variant="outlined" padding="md" style={styles.statsCard}>
          <Body size="sm" color={Colors.light.textSecondary} align="center">
            📈 Track your progress • 🏆 Earn achievements • 💡 Learn from experts
          </Body>
        </Card>
      </View>
    </Container>
  );
}

/**
 * Feature Card Component
 */
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

function FeatureCard({ icon, title, description, onPress }: FeatureCardProps) {
  return (
    <Card variant="elevated" padding="lg" style={styles.featureCard}>
      <View style={styles.featureHeader}>
        <View style={styles.featureIcon}>
          <Heading level={2}>{icon}</Heading>
        </View>
        <View style={styles.featureContent}>
          <Heading level={4} color={Colors.light.text}>
            {title}
          </Heading>
          <Body size="sm" color={Colors.light.textSecondary} style={styles.featureDescription}>
            {description}
          </Body>
        </View>
      </View>
      <Button
        title="Start"
        onPress={onPress}
        variant="primary"
        size="md"
        fullWidth
        style={styles.featureButton}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  appIcon: {
    width: 100,
    height: 100,
    marginBottom: Theme.spacing.md,
  },
  subtitle: {
    marginTop: Theme.spacing.sm,
    fontSize: Theme.typography.sizes.md,
    letterSpacing: 2,
  },

  // Welcome Card
  welcomeCard: {
    marginBottom: Theme.spacing.xl,
  },
  welcomeText: {
    marginTop: Theme.spacing.md,
    lineHeight: 24,
  },

  // Navigation Section
  navigationSection: {
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  sectionLabel: {
    marginBottom: Theme.spacing.sm,
    letterSpacing: 1.5,
  },

  // Feature Cards
  featureCard: {
    marginBottom: Theme.spacing.sm,
  },
  featureHeader: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.md,
  },
  featureIcon: {
    marginRight: Theme.spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureDescription: {
    marginTop: Theme.spacing.xs,
    lineHeight: 20,
  },
  featureButton: {
    marginTop: Theme.spacing.sm,
  },

  // Stats Card
  statsCard: {
    marginTop: Theme.spacing.lg,
  },
});
