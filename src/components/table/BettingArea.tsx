/**
 * Interactive Betting Area Component
 * Touchable zones for placing bets
 */

import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  Animated,
} from 'react-native';
import { BetType } from '../../types/game';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Caption } from '../common';

interface BettingAreaProps {
  betType: BetType;
  label: string;
  onPress: (betType: BetType) => void;
  disabled?: boolean;
  amount?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export default function BettingArea({
  betType,
  label,
  onPress,
  disabled = false,
  amount,
  style,
  children,
}: BettingAreaProps) {
  const [scaleAnim] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled) {
      onPress(betType);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.container, disabled && styles.disabled, style]}
    >
      <Animated.View
        style={[
          styles.content,
          { transform: [{ scale: scaleAnim }] },
          amount && amount > 0 && styles.hasBet,
        ]}
      >
        {children}
        {amount && amount > 0 && (
          <View style={styles.betIndicator}>
            <Caption color={Colors.light.background} style={styles.betAmount}>
              ${amount}
            </Caption>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.4,
  },
  hasBet: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  betIndicator: {
    position: 'absolute',
    top: Theme.spacing.xs,
    right: Theme.spacing.xs,
    backgroundColor: Colors.primary,
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    ...Theme.shadows.sm,
  },
  betAmount: {
    fontSize: 10,
    fontWeight: '700',
  },
});
