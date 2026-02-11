# Casino Craps Learning App - Implementation Plan

## Project Overview

Building a cross-platform mobile-first app using Expo/React Native to teach users how to play casino craps and practice betting strategies in an engaging, interactive environment.

## Development Phases

### Phase 1: Foundation & Setup ✓
**Status**: Complete
**Goals**: Basic project structure and documentation

- [x] Initialize Expo TypeScript project
- [x] Set up project structure
- [x] Create README and documentation
- [x] Create implementation plan

### Phase 2: Core Game Logic
**Estimated Time**: 3-4 sessions
**Goals**: Build the fundamental craps game engine

#### Tasks:
1. **Game State Management**
   - Define TypeScript types for game state (point, dice, shooter, phase)
   - Create game context/state management
   - Implement game phase transitions (come-out roll, point established, etc.)

2. **Dice Rolling Logic**
   - Create dice rolling function with random number generation
   - Implement game outcome calculations
   - Handle natural wins (7, 11), craps (2, 3, 12), and point numbers

3. **Betting System Foundation**
   - Define bet types (Pass Line, Don't Pass, Come, Don't Come, Field, Place, etc.)
   - Implement bet validation logic
   - Create payout calculation functions for each bet type
   - Track player bankroll and bet history

4. **Testing**
   - Unit tests for dice rolling
   - Unit tests for payout calculations
   - Integration tests for game flow

**Deliverables**:
- `src/types/game.ts` - Game type definitions
- `src/utils/dice.ts` - Dice rolling logic
- `src/utils/bets.ts` - Betting logic and payouts
- `src/context/GameContext.tsx` - Game state management
- `tests/` - Test files

### Phase 3: UI Foundation & Navigation
**Estimated Time**: 2-3 sessions
**Goals**: Create navigation structure and basic UI components

#### Tasks:
1. **Navigation Setup**
   - Install and configure React Navigation
   - Create stack/tab navigation structure
   - Define screen hierarchy (Home, Tutorial, Practice, Strategy Guide, Settings)

2. **Basic UI Components**
   - Create reusable Button component
   - Create Card/Panel components
   - Create Typography components
   - Design color scheme and theme constants

3. **Home Screen**
   - Welcome screen with app logo
   - Navigation to main features
   - Quick start guide/onboarding flow

**Deliverables**:
- `src/navigation/` - Navigation configuration
- `src/components/common/` - Reusable UI components
- `src/constants/theme.ts` - Color scheme and styling
- `src/screens/HomeScreen.tsx` - Home screen

### Phase 4: Interactive Craps Table
**Estimated Time**: 5-6 sessions
**Goals**: Build the visual craps table with interactive betting areas

#### Tasks:
1. **Table Layout Component**
   - Design SVG or Canvas-based craps table layout
   - Create responsive table that works on various screen sizes
   - Implement zoom/pan functionality for mobile devices

2. **Betting Areas**
   - Create interactive betting zones (touchable/pressable)
   - Implement visual feedback for bet placement
   - Show bet amounts on table
   - Implement bet removal/modification

3. **Visual Elements**
   - Dice display component with animations
   - Puck (ON/OFF indicator) component
   - Chip components with denominations
   - Bet summary panel

4. **Table Interactivity**
   - Highlight active betting areas based on game phase
   - Show available bets vs unavailable bets
   - Implement chip selection and placement
   - Add haptic feedback for bet placement

**Deliverables**:
- `src/components/table/CrapsTable.tsx` - Main table component
- `src/components/table/BettingArea.tsx` - Individual betting zones
- `src/components/table/Dice.tsx` - Dice display
- `src/components/table/ChipSelector.tsx` - Chip denomination selector

### Phase 5: Dice Animation & Game Flow
**Estimated Time**: 3-4 sessions
**Goals**: Create engaging dice animations and smooth game flow

#### Tasks:
1. **Dice Animation**
   - Install React Native Reanimated
   - Create 3D-style dice rolling animation
   - Add sound effects for dice roll
   - Show dice landing animation with results

2. **Game Flow Integration**
   - Connect dice rolling to game state
   - Implement "Roll Dice" button with state-based availability
   - Show game phase indicators (Come Out Roll, Point, etc.)
   - Animate bet resolution (winning/losing bets)
   - Update bankroll with animations

3. **Game Controls**
   - Clear bets button
   - Undo last bet button
   - Settings for animation speed
   - Auto-repeat last bet option

**Deliverables**:
- `src/components/dice/AnimatedDice.tsx` - Animated dice component
- `src/components/controls/GameControls.tsx` - Game control buttons
- `src/utils/animations.ts` - Animation utilities

### Phase 6: Tutorial System
**Estimated Time**: 4-5 sessions
**Goals**: Create comprehensive interactive tutorials

#### Tasks:
1. **Tutorial Framework**
   - Create tutorial state management
   - Implement step-by-step guide system
   - Add overlay/spotlight functionality to highlight elements
   - Create progress tracking

2. **Tutorial Content**
   - Lesson 1: The Basics (objective, dice rules, come-out roll)
   - Lesson 2: Pass Line Bet (most fundamental bet)
   - Lesson 3: The Point (what happens when point is established)
   - Lesson 4: Don't Pass Bet (betting against the shooter)
   - Lesson 5: Odds Bets (backing your original bet)
   - Lesson 6: Come & Don't Come Bets
   - Lesson 7: Place Bets
   - Lesson 8: Field Bets & Proposition Bets

3. **Interactive Practice**
   - Guided practice mode where user must place specific bets
   - Validation of correct bet placement
   - Explanations of outcomes
   - Achievement/badge system for completed tutorials

**Deliverables**:
- `src/screens/TutorialScreen.tsx` - Tutorial navigation
- `src/components/tutorial/TutorialOverlay.tsx` - Tutorial UI
- `src/content/tutorials/` - Tutorial content definitions
- `src/components/tutorial/InteractiveLessson.tsx` - Interactive lesson component

### Phase 7: Practice Mode & Statistics
**Estimated Time**: 3-4 sessions
**Goals**: Full-featured practice mode with tracking

#### Tasks:
1. **Practice Mode**
   - Free play with starting bankroll
   - Reset/restart game option
   - Adjustable starting bankroll in settings
   - Game history log

2. **Statistics Tracking**
   - Track rolls, wins, losses
   - Calculate win/loss ratio
   - Track most profitable bets
   - Session summaries
   - All-time statistics

3. **Visual Statistics**
   - Charts for win/loss over time
   - Bet type performance comparison
   - Rolling statistics display
   - Export/share statistics

**Deliverables**:
- `src/screens/PracticeScreen.tsx` - Practice mode
- `src/context/StatsContext.tsx` - Statistics tracking
- `src/components/stats/StatsDisplay.tsx` - Statistics visualizations
- `src/screens/StatsScreen.tsx` - Detailed statistics screen

### Phase 8: Strategy Guide & Simulator
**Estimated Time**: 3-4 sessions
**Goals**: Educational strategy content and simulators

#### Tasks:
1. **Strategy Guide**
   - Reference for all bet types with odds
   - House edge calculator
   - Recommended beginner strategies
   - Advanced betting strategies
   - Bankroll management tips

2. **Strategy Simulator**
   - Select a predefined strategy
   - Run automated simulation (100s or 1000s of rolls)
   - Compare strategy outcomes
   - Visualize variance and expected returns

3. **Bet Advisor**
   - Highlight best odds bets
   - Show house edge for each bet type
   - Suggest optimal bet sizing
   - Warn against high house edge bets

**Deliverables**:
- `src/screens/StrategyGuideScreen.tsx` - Strategy reference
- `src/screens/SimulatorScreen.tsx` - Strategy simulator
- `src/utils/strategies.ts` - Predefined strategies
- `src/components/guide/BetReference.tsx` - Bet information cards

### Phase 9: Polish & User Experience
**Estimated Time**: 3-4 sessions
**Goals**: Refinement and enhanced UX

#### Tasks:
1. **Visual Polish**
   - Professional app icon and splash screen
   - Consistent animations and transitions
   - Dark mode support
   - Accessibility improvements (labels, contrast, font sizes)

2. **Sound & Haptics**
   - Sound effects for dice rolls, wins, losses
   - Background ambient casino sounds (optional)
   - Haptic feedback for interactions
   - Volume controls and mute option

3. **Onboarding**
   - First-time user welcome flow
   - Feature highlights
   - Quick start tutorial
   - Settings and preferences setup

4. **Settings & Preferences**
   - Sound on/off
   - Animation speed
   - Haptic feedback toggle
   - Default bankroll amount
   - Color scheme preferences

**Deliverables**:
- `src/screens/OnboardingScreen.tsx` - Onboarding flow
- `src/screens/SettingsScreen.tsx` - Settings screen
- `src/utils/sound.ts` - Sound management
- `assets/` - Icons, sounds, images

### Phase 10: Testing & Deployment
**Estimated Time**: 2-3 sessions
**Goals**: Final testing and release preparation

#### Tasks:
1. **Testing**
   - Comprehensive manual testing on iOS and Android
   - Test on various screen sizes
   - Performance testing
   - Fix critical bugs

2. **Documentation**
   - Complete README with screenshots
   - User guide
   - Developer documentation
   - Update inline code comments

3. **Build & Release**
   - Configure app.json for production
   - Generate app icons and splash screens
   - Build iOS and Android apps
   - Prepare for App Store / Play Store (optional)
   - Web deployment (optional)

**Deliverables**:
- Production builds
- Complete documentation
- Release notes

## Technical Decisions

### State Management
**Decision**: Start with React Context API
**Rationale**: Sufficient for app complexity, can migrate to Redux if needed

### Styling
**Decision**: StyleSheet with theme constants
**Rationale**: React Native standard, performant, type-safe with TypeScript

### Animation Library
**Decision**: React Native Reanimated
**Rationale**: Best performance for complex animations, runs on UI thread

### Navigation
**Decision**: React Navigation v6+
**Rationale**: Industry standard, well-documented, flexible

### Testing
**Decision**: Jest + React Native Testing Library
**Rationale**: Built-in with Expo, good community support

## Key Principles

1. **Mobile-First**: Design for touch interactions and small screens first
2. **Educational Focus**: Always prioritize learning and understanding over pure entertainment
3. **Accurate Simulation**: Match real casino rules and odds precisely
4. **Progressive Disclosure**: Introduce complexity gradually through tutorials
5. **Visual Feedback**: Clear, immediate feedback for all user actions
6. **Performance**: Smooth 60fps animations, optimized re-renders
7. **Accessibility**: Usable by players with various abilities

## Success Metrics

- User can learn basic craps rules through tutorial
- User feels confident to try craps in a real casino
- App performs smoothly on mid-range devices
- Users report the app is fun and engaging
- All bet calculations match real casino payouts

## Future Enhancements (Post-MVP)

- Multiplayer mode (social play with friends)
- Daily challenges and missions
- Leaderboards and achievements
- More advanced strategy analysis
- Integration with real casino odds/conditions
- Video tutorials and tips from professional players
- VR/AR table experience
- Side bets and variations

## Notes

This plan is flexible and will be adjusted as development progresses. Each phase builds on the previous one, allowing for iterative testing and refinement.
