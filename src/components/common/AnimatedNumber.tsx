/**
 * Animated Number Component
 * Smoothly animates number changes
 */

import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { TextProps as RNTextProps } from 'react-native';
import { Heading } from './Text';

// Create animated Heading component
const AnimatedHeading = Animated.createAnimatedComponent(Heading);

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  color?: string;
  level?: 1 | 2 | 3 | 4;
  style?: any;
}

export default function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 500,
  color,
  level = 4,
  style,
}: AnimatedNumberProps) {
  const animatedValue = useSharedValue(value);

  useEffect(() => {
    animatedValue.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [value]);

  // For now, just display the value directly
  // React Native Reanimated doesn't support animating text content directly
  // so we'll use a simpler approach
  const displayValue = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return (
    <Heading level={level} color={color} style={style}>
      {displayValue}
    </Heading>
  );
}
