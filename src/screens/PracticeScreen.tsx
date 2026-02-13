/**
 * Practice Screen - Interactive Craps Table
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useGame } from '../context/GameContext';
import InteractiveCrapsTable from '../components/table/InteractiveCrapsTable';
import GameControls from '../components/table/GameControls';
import { Container } from '../components/common';

export default function PracticeScreen() {
  const { state, actions } = useGame();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleRoll = () => {
    setIsProcessing(true);

    // Roll the dice
    actions.rollDice();

    // Wait for animation to complete, then resolve bets
    setTimeout(() => {
      if (state.currentRoll) {
        actions.resolveBets(state.currentRoll);
      }

      // Allow interaction again
      setTimeout(() => {
        setIsProcessing(false);
      }, 500);
    }, 1200); // Match dice animation duration
  };

  const handleClearBets = () => {
    if (!isProcessing) {
      actions.clearAllBets();
    }
  };

  return (
    <Container scrollable backgroundColor={Colors.dark.background}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Game Controls */}
        <GameControls onRoll={handleRoll} onClearBets={handleClearBets} />

        {/* Craps Table */}
        <InteractiveCrapsTable disabled={isProcessing} />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Theme.spacing.xl,
  },
});
