/**
 * Reusable Card Component
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof typeof Theme.spacing;
  theme?: 'light' | 'dark';
  style?: ViewStyle;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  theme = 'light',
  style,
}: CardProps) {
  const variantKey = `${variant}_${theme}` as keyof typeof styles;

  return (
    <View
      style={[
        styles.base,
        styles[variantKey] || styles[variant],
        { padding: Theme.spacing[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
  },
  // Light theme variants
  default: {
    backgroundColor: Colors.light.card,
  },
  elevated: {
    backgroundColor: Colors.light.card,
    ...Theme.shadows.md,
  },
  outlined: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  // Dark theme variants
  default_dark: {
    backgroundColor: Colors.dark.card,
  },
  elevated_dark: {
    backgroundColor: Colors.dark.card,
    ...Theme.shadows.md,
  },
  outlined_dark: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
});
