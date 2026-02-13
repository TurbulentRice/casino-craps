/**
 * Tutorial Context - Manages tutorial progress and state
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { TutorialProgress } from '../types/tutorial';
import { canAccessLesson } from '../data/lessons';

interface TutorialContextValue {
  progress: TutorialProgress;
  completeLesson: (lessonId: string) => void;
  completeStep: (lessonId: string, stepIndex: number) => void;
  setCurrentLesson: (lessonId: string) => void;
  setCurrentStep: (stepIndex: number) => void;
  canAccess: (lessonId: string) => boolean;
  resetProgress: () => void;
}

const TutorialContext = createContext<TutorialContextValue | undefined>(undefined);

const initialProgress: TutorialProgress = {
  completedLessons: [],
  currentLesson: undefined,
  currentStep: 0,
  totalScore: 0,
  achievements: [],
};

interface TutorialProviderProps {
  children: ReactNode;
}

export function TutorialProvider({ children }: TutorialProviderProps) {
  const [progress, setProgress] = useState<TutorialProgress>(initialProgress);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      totalScore: prev.totalScore + 100,
    }));
  }, []);

  const completeStep = useCallback((lessonId: string, stepIndex: number) => {
    setProgress(prev => ({
      ...prev,
      currentLesson: lessonId,
      currentStep: stepIndex + 1,
    }));
  }, []);

  const setCurrentLesson = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      currentLesson: lessonId,
      currentStep: 0,
    }));
  }, []);

  const setCurrentStep = useCallback((stepIndex: number) => {
    setProgress(prev => ({
      ...prev,
      currentStep: stepIndex,
    }));
  }, []);

  const canAccess = useCallback((lessonId: string) => {
    return canAccessLesson(lessonId, progress.completedLessons);
  }, [progress.completedLessons]);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        progress,
        completeLesson,
        completeStep,
        setCurrentLesson,
        setCurrentStep,
        canAccess,
        resetProgress,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}

export function useTutorial(): TutorialContextValue {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
}
