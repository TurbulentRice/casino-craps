/**
 * Main App Entry Point
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GameProvider } from './src/context/GameContext';
import { AppNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <GameProvider initialBankroll={1000}>
        <AppNavigator />
        <StatusBar style="light" />
      </GameProvider>
    </SafeAreaProvider>
  );
}
