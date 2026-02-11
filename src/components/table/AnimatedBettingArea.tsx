/**
 * Animated Betting Area with win/loss effects
 */

import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { BetType } from '../../types/game';
import { Colors } from '../../constants/colors';
import BettingArea from './BettingArea';

interface AnimatedBettingAreaProps {
  betType: BetType;
  label: string;
  onPress: (betType: BetType) => void;
  disabled?: boolean;
  amount?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
  betResult?: 'win' | 'lose' | 'push' | null;
}

export default function AnimatedBettingArea({
  betResult,
  ...props
}: AnimatedBettingAreaProps) {
  const scale = useSharedValue(1);
  const backgroundColor = useSharedValue('transparent');

  useEffect(() => {
    if (betResult === 'win') {
      // Win animation: scale up and green glow
      scale.value = withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 8 })
      );
      backgroundColor.value = withSequence(
        withTiming(Colors.win, { duration: 300 }),
        withTiming('transparent', { duration: 500 })
      );
    } else if (betResult === 'lose') {
      // Lose animation: subtle fade
      backgroundColor.value = withSequence(
        withTiming(Colors.lose, { duration: 200 }),
        withTiming('transparent', { duration: 400 })
      );
    } else if (betResult === 'push') {
      // Push animation: pulse
      scale.value = withSequence(
        withSpring(1.05, { damping: 15 }),
        withSpring(1, { damping: 10 })
      );
      backgroundColor.value = withSequence(
        withTiming(Colors.push, { duration: 200 }),
        withTiming('transparent', { duration: 400 })
      );
    }
  }, [betResult]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <BettingArea {...props} />
    </Animated.View>
  );
}
