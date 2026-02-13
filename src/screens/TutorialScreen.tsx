/**
 * Tutorial Screen - Interactive lessons
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Heading, Body, Card } from '../components/common';
import { Colors } from '../constants/colors';
import { Theme } from '../constants/theme';
import { useTutorial } from '../context/TutorialContext';
import { lessons } from '../data/lessons';
import { Lesson } from '../types/tutorial';
import LessonList from '../components/tutorial/LessonList';
import LessonViewer from '../components/tutorial/LessonViewer';

export default function TutorialScreen() {
  const { progress, completeLesson, completeStep, setCurrentLesson, canAccess } = useTutorial();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentLesson(lesson.id);
    setCurrentStep(0);
  };

  const handleStepComplete = () => {
    if (selectedLesson) {
      completeStep(selectedLesson.id, currentStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLessonComplete = () => {
    if (selectedLesson) {
      completeLesson(selectedLesson.id);
      setSelectedLesson(null);
      setCurrentStep(0);
    }
  };

  const handleBack = () => {
    setSelectedLesson(null);
    setCurrentStep(0);
  };

  // Show lesson viewer if a lesson is selected
  if (selectedLesson) {
    return (
      <Container scrollable padding="none" backgroundColor={Colors.dark.background}>
        <LessonViewer
          lesson={selectedLesson}
          currentStep={currentStep}
          onStepComplete={handleStepComplete}
          onLessonComplete={handleLessonComplete}
          onBack={handleBack}
        />
      </Container>
    );
  }

  // Show lesson list
  return (
    <Container scrollable padding="lg" backgroundColor={Colors.dark.background}>
      <View style={styles.container}>
        {/* Header */}
        <Heading level={2} color={Colors.light.background} align="center">
          Interactive Tutorial
        </Heading>
        <Body
          color={Colors.dark.textSecondary}
          align="center"
          style={styles.subtitle}
        >
          Learn craps step by step
        </Body>

        {/* Progress Summary */}
        <Card variant="elevated" padding="lg" theme="dark" style={styles.progressCard}>
          <View style={styles.progressRow}>
            <View style={styles.progressItem}>
              <Heading level={3} color={Colors.primary}>
                {progress.completedLessons.length}
              </Heading>
              <Body size="sm" color={Colors.light.textSecondary}>
                Completed
              </Body>
            </View>
            <View style={styles.progressItem}>
              <Heading level={3} color={Colors.accent}>
                {progress.totalScore}
              </Heading>
              <Body size="sm" color={Colors.light.textSecondary}>
                Points
              </Body>
            </View>
            <View style={styles.progressItem}>
              <Heading level={3} color={Colors.success}>
                {Math.round((progress.completedLessons.length / lessons.length) * 100)}%
              </Heading>
              <Body size="sm" color={Colors.light.textSecondary}>
                Progress
              </Body>
            </View>
          </View>
        </Card>

        {/* Lesson List */}
        <LessonList
          lessons={lessons}
          completedLessons={progress.completedLessons}
          onLessonPress={handleLessonPress}
          canAccess={canAccess}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Theme.spacing.md,
  },
  subtitle: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.xl,
  },
  progressCard: {
    marginBottom: Theme.spacing.xl,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressItem: {
    alignItems: 'center',
  },
});
