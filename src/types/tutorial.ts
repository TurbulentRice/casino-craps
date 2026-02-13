/**
 * Tutorial System Types
 */

export interface Lesson {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string; // e.g., "5 min"
  steps: LessonStep[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[]; // lesson IDs
}

export interface LessonStep {
  id: string;
  type: 'explanation' | 'interactive' | 'quiz' | 'practice';
  title: string;
  content: string;
  image?: string;
  quiz?: QuizQuestion;
  interactiveDemo?: InteractiveDemo;
  tips?: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface InteractiveDemo {
  type: 'bet-placement' | 'dice-roll' | 'payout-calculation';
  instructions: string;
  validation?: (input: any) => boolean;
  successMessage: string;
  errorMessage: string;
}

export interface TutorialProgress {
  completedLessons: string[];
  currentLesson?: string;
  currentStep?: number;
  totalScore: number;
  achievements: string[];
}
