/**
 * Lesson Viewer Component
 * Displays lesson content step by step
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Lesson, LessonStep } from '../../types/tutorial';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Body, Heading, Button, Card } from '../common';
import QuizStep from './QuizStep';

interface LessonViewerProps {
  lesson: Lesson;
  currentStep: number;
  onStepComplete: () => void;
  onLessonComplete: () => void;
  onBack: () => void;
}

export default function LessonViewer({
  lesson,
  currentStep,
  onStepComplete,
  onLessonComplete,
  onBack,
}: LessonViewerProps) {
  const step = lesson.steps[currentStep];
  const isLastStep = currentStep === lesson.steps.length - 1;
  const progress = ((currentStep + 1) / lesson.steps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      onLessonComplete();
    } else {
      onStepComplete();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Body color={Colors.primary}>← Back</Body>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Body size="sm" color={Colors.dark.textSecondary}>
            Lesson {lesson.number}: {lesson.title}
          </Body>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Body size="sm" color={Colors.dark.textSecondary} align="center" style={styles.progressText}>
        Step {currentStep + 1} of {lesson.steps.length}
      </Body>

      {/* Step Content */}
      <View style={styles.content}>
        {step.type === 'explanation' && (
          <ExplanationStep step={step} onNext={handleNext} isLastStep={isLastStep} />
        )}
        {step.type === 'quiz' && (
          <QuizStep step={step} onNext={handleNext} isLastStep={isLastStep} />
        )}
        {step.type === 'interactive' && (
          <InteractiveStep step={step} onNext={handleNext} isLastStep={isLastStep} />
        )}
      </View>
    </View>
  );
}

/**
 * Explanation Step Component
 */
interface StepProps {
  step: LessonStep;
  onNext: () => void;
  isLastStep: boolean;
}

function ExplanationStep({ step, onNext, isLastStep }: StepProps) {
  return (
    <Card variant="elevated" padding="lg" theme="dark" style={styles.stepCard}>
      <Heading level={3} color={Colors.dark.text}>
        {step.title}
      </Heading>

      <Body color={Colors.dark.textSecondary} style={styles.stepContent}>
        {step.content}
      </Body>

      {/* Tips */}
      {step.tips && step.tips.length > 0 && (
        <View style={styles.tipsContainer}>
          <Body weight="semibold" color={Colors.accent}>
            💡 Tips:
          </Body>
          {step.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Body size="sm" color={Colors.dark.textSecondary}>
                • {tip}
              </Body>
            </View>
          ))}
        </View>
      )}

      <Button
        title={isLastStep ? '✓ Complete Lesson' : 'Next →'}
        onPress={onNext}
        variant="primary"
        size="lg"
        fullWidth
        style={styles.nextButton}
      />
    </Card>
  );
}

/**
 * Interactive Step Component
 */
function InteractiveStep({ step, onNext, isLastStep }: StepProps) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <Card variant="elevated" padding="lg" theme="dark" style={styles.stepCard}>
      <Heading level={3} color={Colors.dark.text}>
        {step.title}
      </Heading>

      <Body color={Colors.dark.textSecondary} style={styles.stepContent}>
        {step.content}
      </Body>

      {step.interactiveDemo && (
        <Card variant="outlined" padding="md" theme="dark" style={styles.demoContainer}>
          <Body size="sm" color={Colors.accent}>
            {step.interactiveDemo.instructions}
          </Body>
        </Card>
      )}

      {completed ? (
        <>
          <Card variant="outlined" padding="md" theme="dark" style={styles.successContainer}>
            <Body color={Colors.success}>
              ✓ {step.interactiveDemo?.successMessage}
            </Body>
          </Card>

          <Button
            title={isLastStep ? '✓ Complete Lesson' : 'Next →'}
            onPress={onNext}
            variant="primary"
            size="lg"
            fullWidth
            style={styles.nextButton}
          />
        </>
      ) : (
        <Button
          title="Complete Interactive Demo"
          onPress={handleComplete}
          variant="outline"
          size="lg"
          fullWidth
          style={styles.nextButton}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg,
  },
  backButton: {
    paddingRight: Theme.spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: Colors.dark.surface,
    marginHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressText: {
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
  },
  stepCard: {
    marginBottom: Theme.spacing.lg,
  },
  stepContent: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    lineHeight: 24,
  },
  tipsContainer: {
    backgroundColor: Colors.dark.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.lg,
  },
  tipItem: {
    marginTop: Theme.spacing.xs,
  },
  nextButton: {
    marginTop: Theme.spacing.md,
  },
  demoContainer: {
    backgroundColor: Colors.dark.surface,
    marginVertical: Theme.spacing.md,
  },
  successContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: Colors.success,
    marginVertical: Theme.spacing.md,
  },
});
