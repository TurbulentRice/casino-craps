/**
 * Game Controls Component
 * Roll dice, clear bets, game info display
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Button, Card, Body, Caption, Heading } from '../common';
import Dice from './Dice';
import Puck from './Puck';
import { useGame, useCanRoll, usePhaseInfo } from '../../context/GameContext';
import { getRollDescription, determineRollOutcome } from '../../utils/dice';

interface GameControlsProps {
  onRoll: () => void;
  onClearBets: () => void;
}

export default function GameControls({ onRoll, onClearBets }: GameControlsProps) {
  const { state } = useGame();
  const canRoll = useCanRoll();
  const { phase, point, puck } = usePhaseInfo();

  const totalBets = state.player.activeBets.reduce((sum, bet) => sum + bet.amount, 0);

  // Get roll description if there's a current roll
  const rollDescription = state.currentRoll
    ? getRollDescription(
        state.currentRoll,
        determineRollOutcome(state.currentRoll, phase, point)
      )
    : null;

  return (
    <View style={styles.container}>
      {/* Game Status Card */}
      <Card variant="elevated" padding="md" style={styles.statusCard}>
        <View style={styles.statusRow}>
          {/* Bankroll */}
          <View style={styles.statusItem}>
            <Caption color={Colors.light.textSecondary}>Bankroll</Caption>
            <Heading level={4} color={Colors.accent}>
              ${state.player.bankroll.toFixed(0)}
            </Heading>
          </View>

          {/* Phase & Puck */}
          <View style={styles.statusItem}>
            <Caption color={Colors.light.textSecondary}>Phase</Caption>
            <View style={styles.phaseRow}>
              <Body weight="bold" color={Colors.light.text}>
                {phase === 'come-out' ? 'Come Out' : `Point: ${point}`}
              </Body>
              <View style={styles.puckContainer}>
                <Puck isOn={puck.isOn} pointNumber={point} size="sm" />
              </View>
            </View>
          </View>

          {/* Active Bets */}
          <View style={styles.statusItem}>
            <Caption color={Colors.light.textSecondary}>Bets</Caption>
            <Heading level={4} color={totalBets > 0 ? Colors.primary : Colors.light.textSecondary}>
              ${totalBets.toFixed(0)}
            </Heading>
          </View>
        </View>
      </Card>

      {/* Dice Display */}
      {state.currentRoll && (
        <Card variant="elevated" padding="lg" style={styles.diceCard}>
          <Dice roll={state.currentRoll} size="lg" />
          {rollDescription && (
            <Body
              color={Colors.light.text}
              weight="bold"
              align="center"
              style={styles.rollDescription}
            >
              {rollDescription}
            </Body>
          )}
        </Card>
      )}

      {/* Control Buttons */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button
            title="🎲 Roll Dice"
            onPress={onRoll}
            disabled={!canRoll}
            variant="primary"
            size="lg"
            fullWidth
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <View style={styles.buttonSmall}>
          <Button
            title="Clear Bets"
            onPress={onClearBets}
            variant="outline"
            size="md"
            fullWidth
            disabled={totalBets === 0}
          />
        </View>
        <View style={styles.buttonSmall}>
          <Button
            title="Repeat"
            onPress={() => {}}
            variant="ghost"
            size="md"
            fullWidth
            disabled
          />
        </View>
      </View>

      {/* Help Text */}
      {!canRoll && totalBets === 0 && (
        <Caption color={Colors.dark.textSecondary} align="center" style={styles.helpText}>
          Place a bet to start rolling
        </Caption>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },

  // Status Card
  statusCard: {
    backgroundColor: Colors.dark.surface,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    alignItems: 'center',
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  puckContainer: {
    marginLeft: Theme.spacing.xs,
  },

  // Dice Card
  diceCard: {
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
  },
  rollDescription: {
    marginTop: Theme.spacing.md,
    fontSize: Theme.typography.sizes.lg,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonSmall: {
    flex: 1,
  },

  // Help
  helpText: {
    marginTop: Theme.spacing.sm,
  },
});
