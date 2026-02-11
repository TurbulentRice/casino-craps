/**
 * Interactive Craps Table with Full Game Integration
 * Combines table layout with game logic and controls
 */

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { BetType } from '../../types/game';
import { useGame } from '../../context/GameContext';
import { isBetAllowed } from '../../utils/bets';
import TableLayout, {
  PassLineArea,
  DontPassArea,
  ComeArea,
  FieldArea,
  PointNumbersArea,
  PointBox,
} from './TableLayout';
import BettingArea from './BettingArea';
import ChipSelector, { ChipValue } from './ChipSelector';
import { Body } from '../common';

interface InteractiveCrapsTableProps {
  disabled?: boolean;
}

export default function InteractiveCrapsTable({ disabled = false }: InteractiveCrapsTableProps) {
  const { state, actions } = useGame();
  const [selectedChip, setSelectedChip] = useState<ChipValue>(5);

  // Handle bet placement
  const handleBetPress = (betType: BetType) => {
    // Don't allow betting if disabled
    if (disabled) {
      return;
    }
    // Check if bet is allowed in current phase
    if (!isBetAllowed(betType, state.phase, state.point)) {
      Alert.alert(
        'Bet Not Available',
        `This bet is not available during ${state.phase === 'come-out' ? 'Come Out Roll' : 'Point Phase'}.`
      );
      return;
    }

    // Check if player has enough bankroll
    if (state.player.bankroll < selectedChip) {
      Alert.alert('Insufficient Funds', 'You do not have enough chips to place this bet.');
      return;
    }

    // Place the bet
    actions.placeBet(betType, selectedChip);
  };

  // Get bet amount for a specific bet type
  const getBetAmount = (betType: BetType): number => {
    return state.player.activeBets
      .filter(bet => bet.type === betType)
      .reduce((sum, bet) => sum + bet.amount, 0);
  };

  return (
    <View style={styles.container}>
      {/* Chip Selector */}
      <ChipSelector
        selectedValue={selectedChip}
        onSelect={setSelectedChip}
        availableChips={[1, 5, 25, 100]}
      />

      {/* Table */}
      <TableLayout>
        {/* Point Numbers Row */}
        <PointNumbersArea>
          <BettingArea
            betType={BetType.PLACE_4}
            label="4"
            onPress={handleBetPress}
            disabled={!isBetAllowed(BetType.PLACE_4, state.phase, state.point)}
            amount={getBetAmount(BetType.PLACE_4)}
          >
            <PointBox number={4} odds="9:5" />
          </BettingArea>

          <BettingArea
            betType={BetType.PLACE_5}
            label="5"
            onPress={handleBetPress}
            disabled={!isBetAllowed(BetType.PLACE_5, state.phase, state.point)}
            amount={getBetAmount(BetType.PLACE_5)}
          >
            <PointBox number={5} odds="7:5" />
          </BettingArea>

          <BettingArea
            betType={BetType.PLACE_6}
            label="6"
            onPress={handleBetPress}
            disabled={!isBetAllowed(BetType.PLACE_6, state.phase, state.point)}
            amount={getBetAmount(BetType.PLACE_6)}
          >
            <PointBox number={6} odds="7:6" />
          </BettingArea>

          <BettingArea
            betType={BetType.PLACE_8}
            label="8"
            onPress={handleBetPress}
            disabled={!isBetAllowed(BetType.PLACE_8, state.phase, state.point)}
            amount={getBetAmount(BetType.PLACE_8)}
          >
            <PointBox number={8} odds="7:6" />
          </BettingArea>

          <BettingArea
            betType={BetType.PLACE_9}
            label="9"
            onPress={handleBetPress}
            disabled={!isBetAllowed(BetType.PLACE_9, state.phase, state.point)}
            amount={getBetAmount(BetType.PLACE_9)}
          >
            <PointBox number={9} odds="7:5" />
          </BettingArea>

          <BettingArea
            betType={BetType.PLACE_10}
            label="10"
            onPress={handleBetPress}
            disabled={!isBetAllowed(BetType.PLACE_10, state.phase, state.point)}
            amount={getBetAmount(BetType.PLACE_10)}
          >
            <PointBox number={10} odds="9:5" />
          </BettingArea>
        </PointNumbersArea>

        {/* Come Area */}
        <BettingArea
          betType={BetType.COME}
          label="COME"
          onPress={handleBetPress}
          disabled={!isBetAllowed(BetType.COME, state.phase, state.point)}
          amount={getBetAmount(BetType.COME)}
        >
          <ComeArea />
        </BettingArea>

        {/* Field Area */}
        <BettingArea
          betType={BetType.FIELD}
          label="FIELD"
          onPress={handleBetPress}
          amount={getBetAmount(BetType.FIELD)}
        >
          <FieldArea />
        </BettingArea>

        {/* Pass Line */}
        <BettingArea
          betType={BetType.PASS_LINE}
          label="PASS LINE"
          onPress={handleBetPress}
          disabled={!isBetAllowed(BetType.PASS_LINE, state.phase, state.point)}
          amount={getBetAmount(BetType.PASS_LINE)}
        >
          <PassLineArea />
        </BettingArea>

        {/* Don't Pass */}
        <BettingArea
          betType={BetType.DONT_PASS}
          label="DON'T PASS"
          onPress={handleBetPress}
          disabled={!isBetAllowed(BetType.DONT_PASS, state.phase, state.point)}
          amount={getBetAmount(BetType.DONT_PASS)}
        >
          <DontPassArea />
        </BettingArea>
      </TableLayout>

      {/* Instructions */}
      {state.player.activeBets.length === 0 && (
        <View style={styles.instructions}>
          <Body color={Colors.dark.textSecondary} align="center">
            💡 Tap a betting area to place a ${selectedChip} chip
          </Body>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Theme.spacing.md,
  },
  instructions: {
    padding: Theme.spacing.md,
  },
});
