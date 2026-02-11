/**
 * Reusable Container Component
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    { backgroundColor },
    style,
  ];

  const contentStyle = [
    {
      padding: Theme.spacing[padding],
    },
    center && styles.center,
  ];

  if (scrollable) {
    return (
      <SafeAreaView style={containerStyle} edges={['top']}>
        <ScrollView
          style={styles.base}
          contentContainerStyle={contentStyle}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle} edges={['top']}>
      <View style={contentStyle}>{children}</View>
    </SafeAreaView>
  );
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
