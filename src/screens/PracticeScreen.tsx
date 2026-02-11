/**
 * Practice Screen - Interactive Craps Table
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGame } from '../context/GameContext';
import InteractiveCrapsTable from '../components/table/InteractiveCrapsTable';
import GameControls from '../components/table/GameControls';
import { Container } from '../components/common';

export default function PracticeScreen() {
  const { state, actions } = useGame();

  const handleRoll = () => {
    // Roll the dice
    actions.rollDice();

    // Wait a moment for state to update, then resolve bets
    setTimeout(() => {
      if (state.currentRoll) {
        actions.resolveBets(state.currentRoll);
      }
    }, 100);
  };

  const handleClearBets = () => {
    actions.clearAllBets();
  };

  return (
    <Container scrollable padding="lg" backgroundColor={Colors.dark.background}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Game Controls */}
          <GameControls onRoll={handleRoll} onClearBets={handleClearBets} />

          {/* Craps Table */}
          <InteractiveCrapsTable />
        </ScrollView>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.md,
  },
});
