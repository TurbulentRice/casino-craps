/**
 * Settings Screen - App configuration
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Heading, Body, Card } from '../components/common';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';

export default function SettingsScreen() {
  return (
    <Container scrollable padding="lg" backgroundColor={Colors.dark.background}>
      <View style={styles.container}>
        <Heading level={2} color={Colors.light.background} align="center">
          Settings
        </Heading>
        <Body
          color={Colors.dark.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          Configure your preferences
        </Body>

        {/* Game Settings */}
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Heading level={4} color={Colors.light.text}>
            🎮 Game Settings
          </Heading>

          <SettingItem label="Starting Bankroll" value="$1,000" />
          <SettingItem label="Animation Speed" value="Normal" />
          <SettingItem label="Sound Effects" value="On" />
          <SettingItem label="Haptic Feedback" value="On" />
        </Card>

        {/* Display Settings */}
        <Card variant="elevated" padding="lg" style={styles.card}>
          <Heading level={4} color={Colors.light.text}>
            🎨 Display
          </Heading>

          <SettingItem label="Theme" value="Dark" />
          <SettingItem label="Table Color" value="Classic Green" />
          <SettingItem label="Chip Style" value="Traditional" />
        </Card>

        {/* App Info */}
        <Card variant="outlined" padding="lg" style={styles.card}>
          <Heading level={4} color={Colors.light.text}>
            ℹ️ About
          </Heading>

          <View style={styles.infoRow}>
            <Body color={Colors.light.textSecondary}>Version:</Body>
            <Body color={Colors.light.text}>1.0.0</Body>
          </View>
          <View style={styles.infoRow}>
            <Body color={Colors.light.textSecondary}>Built with:</Body>
            <Body color={Colors.light.text}>Expo & React Native</Body>
          </View>
          <Body size="sm" color={Colors.light.textSecondary} style={styles.infoText}>
            Learn how to play craps and practice betting strategies in a fun, risk-free environment.
          </Body>
        </Card>

        {/* Footer */}
        <Body size="sm" color={Colors.dark.textSecondary} align="center" style={styles.footer}>
          Made with ❤️ for craps enthusiasts
        </Body>
      </View>
    </Container>
  );
}

function SettingItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.settingItem}>
      <Body color={Colors.light.textSecondary}>{label}</Body>
      <Body weight="semibold" color={Colors.light.text}>
        {value}
      </Body>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.divider,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  infoText: {
    marginTop: Theme.spacing.md,
    lineHeight: 20,
  },
  footer: {
    marginTop: Theme.spacing.xl,
  },
});
