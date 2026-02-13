/**
 * Reusable Button Component
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? Colors.primary : Colors.light.background}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`textSize_${size}`],
            isDisabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadius.md,
    flexDirection: 'row',
    ...Theme.shadows.sm,
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: Colors.error,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    minHeight: Theme.layout.buttonHeight.sm,
  },
  size_md: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    minHeight: Theme.layout.buttonHeight.md,
  },
  size_lg: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.md,
    minHeight: Theme.layout.buttonHeight.lg,
  },

  // Full width
  fullWidth: {
    width: '100%',
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    fontWeight: Theme.typography.weights.semibold as any,
    textAlign: 'center' as any,
    flexShrink: 1,
    color: '#FFFFFF', // Default white text
  },
  text_primary: {
    color: '#FFFFFF', // White text
  },
  text_secondary: {
    color: '#FFFFFF', // White text
  },
  text_outline: {
    color: '#FFFFFF', // White text for visibility on dark backgrounds
  },
  text_ghost: {
    color: '#FFFFFF', // Changed from Colors.primary
  },
  text_danger: {
    color: '#FFFFFF', // White text
  },

  // Text sizes
  textSize_sm: {
    fontSize: Theme.typography.sizes.sm,
  },
  textSize_md: {
    fontSize: Theme.typography.sizes.md,
  },
  textSize_lg: {
    fontSize: Theme.typography.sizes.lg,
  },

  textDisabled: {
    opacity: 0.7,
  },
});
