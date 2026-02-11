/**
 * Reusable Container Component
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';

interface ContainerProps {
  children: ReactNode;
  padding?: keyof typeof Theme.spacing;
  center?: boolean;
  scrollable?: boolean;
  backgroundColor?: string;
  style?: ViewStyle;
}

export default function Container({
  children,
  padding = 'md',
  center = false,
  scrollable = false,
  backgroundColor = Colors.light.background,
  style,
}: ContainerProps) {
  const containerStyle = [
    styles.base,
    {
      padding: Theme.spacing[padding],
      backgroundColor,
    },
    center && styles.center,
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={center && styles.center}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
