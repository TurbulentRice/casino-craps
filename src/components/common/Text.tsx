/**
 * Reusable Text Components
 */

import React, { ReactNode } from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

interface BaseTextProps {
  children: ReactNode;
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
}

/**
 * Heading component for titles and section headers
 */
interface HeadingProps extends BaseTextProps {
  level?: 1 | 2 | 3 | 4;
}

export function Heading({
  children,
  level = 1,
  color = Colors.light.text,
  align = 'left',
  style,
}: HeadingProps) {
  return (
    <RNText
      style={[
        styles.heading,
        styles[`heading${level}`],
        { color, textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

/**
 * Body text component for paragraphs and content
 */
interface BodyProps extends BaseTextProps {
  size?: 'sm' | 'md' | 'lg';
  weight?: keyof typeof Theme.typography.weights;
}

export function Body({
  children,
  size = 'md',
  weight = 'regular',
  color = Colors.light.text,
  align = 'left',
  style,
}: BodyProps) {
  return (
    <RNText
      style={[
        styles.body,
        {
          fontSize: Theme.typography.sizes[size],
          fontWeight: Theme.typography.weights[weight],
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

/**
 * Caption component for small text and labels
 */
export function Caption({
  children,
  color = Colors.light.textSecondary,
  align = 'left',
  style,
}: BaseTextProps) {
  return (
    <RNText
      style={[
        styles.caption,
        { color, textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

/**
 * Label component for form labels and small headers
 */
interface LabelProps extends BaseTextProps {
  weight?: keyof typeof Theme.typography.weights;
}

export function Label({
  children,
  weight = 'semibold',
  color = Colors.light.text,
  align = 'left',
  style,
}: LabelProps) {
  return (
    <RNText
      style={[
        styles.label,
        { fontWeight: Theme.typography.weights[weight], color, textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

/**
 * Monospace text for numbers and codes
 */
export function Monospace({
  children,
  color = Colors.light.text,
  align = 'left',
  style,
}: BaseTextProps) {
  return (
    <RNText
      style={[
        styles.monospace,
        { color, textAlign: align },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: Theme.typography.weights.bold as any,
  },
  heading1: {
    fontSize: Theme.typography.sizes.huge,
    lineHeight: Theme.typography.sizes.huge * 1.2,
  },
  heading2: {
    fontSize: Theme.typography.sizes.xxxl,
    lineHeight: Theme.typography.sizes.xxxl * 1.2,
  },
  heading3: {
    fontSize: Theme.typography.sizes.xxl,
    lineHeight: Theme.typography.sizes.xxl * 1.2,
  },
  heading4: {
    fontSize: Theme.typography.sizes.xl,
    lineHeight: Theme.typography.sizes.xl * 1.2,
  },

  body: {
    lineHeight: Theme.typography.sizes.md * 1.5,
  },

  caption: {
    fontSize: Theme.typography.sizes.xs,
    lineHeight: Theme.typography.sizes.xs * 1.5,
  },

  label: {
    fontSize: Theme.typography.sizes.sm,
    textTransform: 'uppercase' as any,
    letterSpacing: 0.5,
  },

  monospace: {
    fontFamily: Theme.typography.fonts.monospace,
    fontSize: Theme.typography.sizes.md,
  },
});
