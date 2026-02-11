/**
 * Puck Component (ON/OFF indicator)
 * Shows whether a point is established
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PointNumber } from '../../types/game';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Body } from '../common';

interface PuckProps {
  isOn: boolean;
  pointNumber?: PointNumber | null;
  size?: 'sm' | 'md';
}

const PUCK_SIZES = {
  sm: 30,
  md: 40,
};

export default function Puck({ isOn, pointNumber, size = 'md' }: PuckProps) {
  const puckSize = PUCK_SIZES[size];
  const backgroundColor = isOn ? Colors.light.background : Colors.dark.text;
  const textColor = isOn ? Colors.dark.text : Colors.light.background;

  return (
    <View
      style={[
        styles.puck,
        {
          width: puckSize,
          height: puckSize,
          borderRadius: puckSize / 2,
          backgroundColor,
        },
      ]}
    >
      <Body
        color={textColor}
        weight="bold"
        style={[styles.text, size === 'sm' && styles.textSmall]}
      >
        {isOn ? 'ON' : 'OFF'}
      </Body>
      {isOn && pointNumber && (
        <Body
          color={textColor}
          weight="bold"
          style={[styles.number, size === 'sm' && styles.numberSmall]}
        >
          {pointNumber}
        </Body>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  puck: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.border,
    ...Theme.shadows.md,
  },
  text: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  textSmall: {
    fontSize: 8,
  },
  number: {
    fontSize: 14,
    marginTop: -2,
  },
  numberSmall: {
    fontSize: 12,
  },
});
