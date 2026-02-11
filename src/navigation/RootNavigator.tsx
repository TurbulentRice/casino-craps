/**
 * Root Navigation Configuration
 */

import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from './types';

// Import screens (will create these next)
import HomeScreen from '../screens/HomeScreen';
import PracticeScreen from '../screens/PracticeScreen';
import TutorialScreen from '../screens/TutorialScreen';
import StrategyGuideScreen from '../screens/StrategyGuideScreen';
import SettingsScreen from '../screens/SettingsScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

/**
 * Main Tab Navigator - Bottom tabs for primary navigation
 */
function MainTabNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C41E3A', // Casino red
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopColor: '#333',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <TabIcon name="🎲" color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Practice"
        component={PracticeScreen}
        options={{
          tabBarLabel: 'Practice',
          tabBarIcon: ({ color }) => (
            <TabIcon name="🎯" color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{
          tabBarLabel: 'Tutorial',
          tabBarIcon: ({ color }) => (
            <TabIcon name="📚" color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Guide"
        component={StrategyGuideScreen}
        options={{
          tabBarLabel: 'Guide',
          tabBarIcon: ({ color }) => (
            <TabIcon name="📊" color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <TabIcon name="⚙️" color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

/**
 * Simple tab icon component (using emoji for now)
 */
function TabIcon({ name, color }: { name: string; color: string }) {
  return (
    <Text style={{ fontSize: 24, opacity: color === '#666' ? 0.6 : 1 }}>
      {name}
    </Text>
  );
}

/**
 * Root Stack Navigator - Top level navigation including modals
 */
export function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Main" component={MainTabNavigator} />
    </RootStack.Navigator>
  );
}

/**
 * Navigation Container wrapper with linking configuration
 */
export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
