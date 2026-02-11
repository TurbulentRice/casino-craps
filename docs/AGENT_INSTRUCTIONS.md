# Agent Instructions for Casino Craps App Development

## Project Context

This is a mobile-first Expo/React Native app designed to teach users how to play casino craps. The focus is on education, practice, and strategy learning in an engaging, interactive environment.

## Development Guidelines

### Code Standards

1. **TypeScript**: Use strict TypeScript with proper type definitions
   - Define types in `src/types/`
   - Avoid `any` types unless absolutely necessary
   - Use interfaces for object shapes, types for unions/primitives

2. **Component Structure**
   - Use functional components with hooks
   - Keep components small and focused (single responsibility)
   - Extract reusable logic into custom hooks
   - Place components in appropriate directories:
     - `src/components/common/` - Shared UI components
     - `src/components/table/` - Craps table specific components
     - `src/components/tutorial/` - Tutorial specific components

3. **State Management**
   - Start with React Context for game state
   - Use local state (useState) for component-specific state
   - Consider useReducer for complex state logic
   - Keep state as close to where it's used as possible

4. **Styling**
   - Use StyleSheet.create() for performance
   - Define theme constants in `src/constants/theme.ts`
   - Use consistent spacing, colors, and typography
   - Support responsive design (different screen sizes)
   - Consider dark mode from the start

5. **File Naming**
   - Components: PascalCase (e.g., `CrapsTable.tsx`)
   - Utilities: camelCase (e.g., `dice.ts`)
   - Constants: UPPER_SNAKE_CASE exported from camelCase files
   - Types: PascalCase for interfaces/types

### Craps Game Rules (Critical Accuracy)

When implementing game logic, ensure 100% accuracy with real casino rules:

1. **Come-Out Roll**:
   - 7 or 11: Pass Line wins, Don't Pass loses
   - 2, 3, or 12: Pass Line loses (craps)
   - 2 or 3: Don't Pass wins
   - 12: Don't Pass pushes (ties)
   - 4, 5, 6, 8, 9, 10: Point is established

2. **Point Phase**:
   - Roll the point: Pass Line wins, Don't Pass loses
   - Roll a 7: Pass Line loses (seven-out), Don't Pass wins
   - Any other number: Continue rolling

3. **Bet Payouts** (Must match real casino odds):
   - Pass Line / Don't Pass: 1:1
   - Pass Line Odds: 2:1 (on 4,10), 3:2 (on 5,9), 6:5 (on 6,8)
   - Don't Pass Odds: 1:2 (on 4,10), 2:3 (on 5,9), 5:6 (on 6,8)
   - Place 6/8: 7:6
   - Place 5/9: 7:5
   - Place 4/10: 9:5
   - Field: 1:1 (2:1 on 2, 3:1 on 12)
   - Any 7: 4:1
   - Hardways: 7:1 (hard 4,10), 9:1 (hard 6,8)

### Development Workflow

1. **Starting New Features**
   - Review the implementation plan phase
   - Read relevant code files before making changes
   - Create types/interfaces before implementation
   - Start with core logic, then add UI
   - Test as you build

2. **Making Changes**
   - Keep commits focused and atomic
   - Test on both iOS and Android if possible
   - Consider performance implications
   - Update documentation if needed

3. **Testing Approach**
   - Unit test game logic (dice, bets, payouts)
   - Integration test game flow
   - Manual test UI and interactions
   - Test on various screen sizes

### Key Dependencies

Current dependencies (from package.json):
- `expo`: ~54.0.33
- `react`: 19.1.0
- `react-native`: 0.81.5
- `typescript`: ~5.9.2

To be added as needed:
- `@react-navigation/native` - Navigation
- `react-native-reanimated` - Animations
- `react-native-svg` - Table graphics
- `@react-native-async-storage/async-storage` - Persistence

### UI/UX Principles

1. **Mobile-First Design**
   - Optimize for phone screens (375x667 and up)
   - Large touch targets (minimum 44x44 points)
   - Comfortable thumb zones for primary actions
   - Support landscape orientation for table view

2. **Visual Hierarchy**
   - Important info (bankroll, current bets) always visible
   - Clear distinction between betting areas
   - Visual feedback for all interactions
   - High contrast for readability

3. **Animations & Feedback**
   - Smooth 60fps animations
   - Immediate feedback for touch
   - Celebrate wins with animations
   - Clear visual indication of losses
   - Loading states for async operations

4. **Educational Focus**
   - Clear labels and tooltips
   - Contextual help always available
   - Progressive disclosure of complexity
   - Positive reinforcement for learning

### Common Tasks

#### Adding a New Screen
1. Create screen file in `src/screens/`
2. Add navigation configuration
3. Implement screen component with proper typing
4. Add to navigation structure
5. Test navigation flow

#### Adding a New Bet Type
1. Add bet type to type definitions
2. Implement bet validation logic
3. Add payout calculation
4. Create UI betting area
5. Add to tutorial/guide
6. Write tests

#### Creating a Tutorial Lesson
1. Define lesson content structure
2. Create step-by-step instructions
3. Implement interactive validation
4. Add to tutorial navigation
5. Test lesson flow

### Performance Considerations

- Use React.memo() for expensive components
- Optimize FlatList with proper keys and extraction
- Debounce rapid user inputs
- Use useCallback for event handlers
- Avoid anonymous functions in render
- Profile with React DevTools

### Accessibility

- Add accessible labels to interactive elements
- Support screen readers
- Ensure sufficient color contrast
- Support text scaling
- Provide alternative text for images
- Test with accessibility features enabled

### When Stuck

1. Review the implementation plan
2. Check existing similar code patterns
3. Review React Native / Expo documentation
4. Test in isolation before integrating
5. Ask for clarification if requirements are unclear

## Quick Reference

### Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/       # Screen components
├── navigation/    # Navigation setup
├── hooks/         # Custom hooks
├── utils/         # Helper functions
├── types/         # TypeScript definitions
├── constants/     # App constants
├── context/       # React Context providers
└── content/       # Static content (tutorials, guides)
```

### Running the App
```bash
npm start          # Start Metro bundler
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
```

### Useful Commands
```bash
npm test           # Run tests
npx expo install   # Install compatible packages
```

## Current Phase

**Phase 1: Foundation & Setup** - Complete ✓

**Next Phase: Phase 2 - Core Game Logic**
- Focus on game state management
- Implement dice rolling logic
- Build betting system foundation
- Write comprehensive tests

Ready to start building the game engine!
