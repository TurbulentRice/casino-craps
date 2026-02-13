# Tutorial System Documentation

## Overview

The tutorial system provides an interactive, step-by-step learning experience for craps. Players progress through lessons, complete quizzes, and track their learning journey.

## Architecture

### Core Components

1. **TutorialContext** (`src/context/TutorialContext.tsx`)
   - Manages tutorial progress state
   - Tracks completed lessons and scores
   - Handles lesson and step progression

2. **Lesson Data** (`src/data/lessons.ts`)
   - Contains all lesson content
   - Defines lesson structure and prerequisites
   - Helper functions for accessing lessons

3. **Tutorial Screen** (`src/screens/TutorialScreen.tsx`)
   - Main entry point for tutorials
   - Shows lesson list and progress summary
   - Switches between lesson list and viewer

### Tutorial Components

4. **LessonList** (`src/components/tutorial/LessonList.tsx`)
   - Displays available lessons with status indicators
   - Shows completion status, difficulty, and duration
   - Locks lessons based on prerequisites

5. **LessonViewer** (`src/components/tutorial/LessonViewer.tsx`)
   - Renders individual lesson steps
   - Shows progress bar and navigation
   - Handles different step types (explanation, quiz, interactive)

6. **QuizStep** (`src/components/tutorial/QuizStep.tsx`)
   - Multiple choice quiz component
   - Provides immediate feedback
   - Shows explanations for answers

## Lesson Structure

Each lesson contains:
- **Basic Info**: ID, number, title, description, duration
- **Metadata**: Difficulty level, prerequisites
- **Steps**: Array of learning steps

### Step Types

1. **Explanation Steps**
   - Display educational content
   - Include optional tips section
   - Simple continue button

2. **Quiz Steps**
   - Multiple choice questions
   - Correct answer validation
   - Detailed explanations

3. **Interactive Steps**
   - Hands-on practice (planned for future)
   - Validation of user actions
   - Success/error feedback

## Current Lessons

### 1. The Basics (Beginner, 5 min)
- Welcome to Craps
- The Come-Out Roll
- Quiz: Understanding the basics

### 2. Pass Line Bet (Beginner, 7 min)
- Introduction to Pass Line
- Betting after the point
- Quiz and interactive practice

### 3. The Point (Beginner, 6 min)
- Understanding point establishment
- Point odds and probabilities
- Knowledge check

### 4. Don't Pass Bet (Intermediate, 6 min)
- Betting against the shooter
- Opposite strategy to Pass Line
- Quiz on Don't Pass rules

### 5. Place Bets (Intermediate, 8 min)
- Betting on specific numbers
- Payout structures
- Best place bet strategies

## Features

### Progress Tracking
- Completed lessons counter
- Total score accumulation
- Percentage completion
- Future: Achievements system

### Lesson Prerequisites
- Sequential learning path
- Unlock system based on completion
- Clear indicators for locked lessons

### Visual Feedback
- Progress bars on lessons
- Completion badges
- Color-coded difficulty levels
- Quiz answer validation

## Adding New Lessons

To add a new lesson, edit `src/data/lessons.ts`:

```typescript
{
  id: 'lesson-id',
  number: 6,
  title: 'Lesson Title',
  description: 'Brief description',
  duration: '5 min',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  prerequisites: ['previous-lesson-id'], // optional
  steps: [
    {
      id: 'step-1',
      type: 'explanation',
      title: 'Step Title',
      content: 'Educational content...',
      tips: ['Helpful tip 1', 'Helpful tip 2'],
    },
    {
      id: 'step-2',
      type: 'quiz',
      title: 'Quiz Title',
      content: 'Question context',
      quiz: {
        question: 'What is...?',
        options: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
        correctAnswer: 1, // index of correct answer
        explanation: 'Why this answer is correct',
      },
    },
  ],
}
```

## Future Enhancements

### Planned Features
1. **Interactive Demos**
   - Hands-on bet placement practice
   - Simulated dice rolls with explanations
   - Payout calculations exercises

2. **Achievements System**
   - Badges for completing lessons
   - Streak tracking
   - Special recognition for advanced lessons

3. **Progress Persistence**
   - Save progress to local storage
   - Resume from last position
   - Cross-device sync (future)

4. **Additional Lessons**
   - Come & Don't Come bets
   - Odds bets (true odds)
   - Field bets
   - Proposition bets
   - Advanced strategies

5. **Enhanced Quizzes**
   - Image-based questions
   - Scenario-based problems
   - Timed challenges

6. **Social Features**
   - Share progress
   - Leaderboards
   - Challenge friends

## Usage

The tutorial system is automatically integrated into the app. Users can:

1. Navigate to the Tutorial tab
2. View their progress summary
3. Select an available lesson
4. Complete steps sequentially
5. Take quizzes to test knowledge
6. Track completion and earn points

## Technical Notes

- Built with React Native and TypeScript
- Uses Context API for state management
- Modular component architecture
- Easy to extend with new lesson types
- Responsive design for all screen sizes
