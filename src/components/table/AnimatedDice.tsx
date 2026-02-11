/**
 * Animated Dice Component with rolling effect
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { DiceRoll } from '../../types/game';
import { Theme } from '../../constants/theme';
import Dice from './Dice';

interface AnimatedDiceProps {
  roll: DiceRoll | null;
  isRolling: boolean;
  onRollComplete?: () => void;
}

export default function AnimatedDice({ roll, isRolling, onRollComplete }: AnimatedDiceProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isRolling) {
      // Start rolling animation
      rotation.value = withSequence(
        // Multiple spins
        withTiming(360 * 3, {
          duration: 800,
          easing: Easing.out(Easing.cubic),
        }),
        // Reset rotation
        withTiming(0, { duration: 0 })
      );

      scale.value = withSequence(
        // Grow
        withTiming(1.2, { duration: 200 }),
        // Shrink and bounce
        withSpring(0.9, { damping: 2, stiffness: 100 }),
        // Return to normal
        withSpring(1, { damping: 10, stiffness: 100 })
      );

      opacity.value = withSequence(
        withTiming(0.7, { duration: 400 }),
        withTiming(1, { duration: 400 })
      );

      // Call onRollComplete after animation
      setTimeout(() => {
        onRollComplete?.();
      }, 1000);
    }
  }, [isRolling]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.diceContainer, animatedStyle]}>
        <Dice roll={roll} size="lg" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing.lg,
  },
  diceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
