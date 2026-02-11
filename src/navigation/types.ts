/**
 * Navigation type definitions
 */

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// ============================================================================
// Root Stack Navigator (for modals, onboarding, etc.)
// ============================================================================

export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

// ============================================================================
// Main Tab Navigator (bottom tabs)
// ============================================================================

export type MainTabParamList = {
  Home: undefined;
  Practice: undefined;
  Tutorial: undefined;
  Guide: undefined;
  Settings: undefined;
};

export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

// ============================================================================
// Tutorial Stack Navigator (for lesson navigation)
// ============================================================================

export type TutorialStackParamList = {
  TutorialList: undefined;
  Lesson: {
    lessonId: string;
    lessonTitle: string;
  };
};

export type TutorialStackNavigationProp = StackNavigationProp<TutorialStackParamList>;

// ============================================================================
// Strategy Stack Navigator
// ============================================================================

export type StrategyStackParamList = {
  StrategyList: undefined;
  StrategyDetail: {
    strategyId: string;
    strategyName: string;
  };
  Simulator: {
    strategyId?: string;
  };
};

export type StrategyStackNavigationProp = StackNavigationProp<StrategyStackParamList>;

// ============================================================================
// Combined Navigation Props for Screen Components
// ============================================================================

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  RootStackNavigationProp
>;

export type PracticeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Practice'>,
  RootStackNavigationProp
>;

export type TutorialScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Tutorial'>,
  RootStackNavigationProp
>;

export type GuideScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Guide'>,
  RootStackNavigationProp
>;

export type SettingsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Settings'>,
  RootStackNavigationProp
>;

// ============================================================================
// Route Props
// ============================================================================

export type LessonScreenRouteProp = RouteProp<TutorialStackParamList, 'Lesson'>;
export type StrategyDetailScreenRouteProp = RouteProp<StrategyStackParamList, 'StrategyDetail'>;
export type SimulatorScreenRouteProp = RouteProp<StrategyStackParamList, 'Simulator'>;
