/**
 * Lesson List Component
 * Displays available lessons with progress indicators
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Lesson } from '../../types/tutorial';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Body, Heading, Caption, Card } from '../common';

interface LessonListProps {
  lessons: Lesson[];
  completedLessons: string[];
  onLessonPress: (lesson: Lesson) => void;
  canAccess: (lessonId: string) => boolean;
}

export default function LessonList({
  lessons,
  completedLessons,
  onLessonPress,
  canAccess,
}: LessonListProps) {
  return (
    <View style={styles.container}>
      {lessons.map((lesson) => {
        const isCompleted = completedLessons.includes(lesson.id);
        const isLocked = !canAccess(lesson.id);

        return (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={isCompleted}
            isLocked={isLocked}
            onPress={() => !isLocked && onLessonPress(lesson)}
          />
        );
      })}
    </View>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isLocked: boolean;
  onPress: () => void;
}

function LessonCard({ lesson, isCompleted, isLocked, onPress }: LessonCardProps) {
  const getDifficultyColor = () => {
    switch (lesson.difficulty) {
      case 'beginner':
        return Colors.success;
      case 'intermediate':
        return Colors.warning;
      case 'advanced':
        return Colors.error;
      default:
        return Colors.dark.textSecondary;
    }
  };

  const getDifficultyIcon = () => {
    switch (lesson.difficulty) {
      case 'beginner':
        return '⭐';
      case 'intermediate':
        return '⭐⭐';
      case 'advanced':
        return '⭐⭐⭐';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.7}
      style={styles.lessonCard}
    >
      <Card
        variant="elevated"
        padding="lg"
        theme="dark"
        style={[
          styles.card,
          isLocked ? styles.lockedCard : undefined,
          isCompleted ? styles.completedCard : undefined,
        ]}
      >
        <View style={styles.lessonHeader}>
          <View style={styles.lessonNumber}>
            {isCompleted ? (
              <Body weight="bold" color={Colors.success}>
                ✓
              </Body>
            ) : isLocked ? (
              <Body weight="bold" color={Colors.disabled}>
                🔒
              </Body>
            ) : (
              <Body weight="bold" color={Colors.primary}>
                {lesson.number}
              </Body>
            )}
          </View>

          <View style={styles.lessonInfo}>
            <Heading level={4} color={isLocked ? Colors.disabled : Colors.dark.text}>
              {lesson.title}
            </Heading>
            <Body
              size="sm"
              color={isLocked ? Colors.disabled : Colors.dark.textSecondary}
              style={styles.description}
            >
              {lesson.description}
            </Body>

            <View style={styles.lessonMeta}>
              <View style={styles.metaItem}>
                <Caption color={getDifficultyColor()}>
                  {getDifficultyIcon()} {lesson.difficulty}
                </Caption>
              </View>
              <View style={styles.metaItem}>
                <Caption color={Colors.dark.textSecondary}>
                  ⏱️ {lesson.duration}
                </Caption>
              </View>
              <View style={styles.metaItem}>
                <Caption color={Colors.dark.textSecondary}>
                  📝 {lesson.steps.length} steps
                </Caption>
              </View>
            </View>

            {isLocked && lesson.prerequisites && (
              <View style={styles.prerequisitesContainer}>
                <Caption color={Colors.warning}>
                  📌 Complete previous lessons to unlock
                </Caption>
              </View>
            )}

            {isCompleted && (
              <View style={styles.completedBadge}>
                <Caption color={Colors.success}>
                  ✓ Completed
                </Caption>
              </View>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing.md,
  },
  lessonCard: {
    marginBottom: Theme.spacing.sm,
  },
  card: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  lockedCard: {
    opacity: 0.6,
  },
  completedCard: {
    borderColor: Colors.success,
  },
  lessonHeader: {
    flexDirection: 'row',
  },
  lessonNumber: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  lessonInfo: {
    flex: 1,
  },
  description: {
    marginTop: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
    lineHeight: 20,
  },
  lessonMeta: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginTop: Theme.spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prerequisitesContainer: {
    marginTop: Theme.spacing.sm,
    padding: Theme.spacing.xs,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: Theme.borderRadius.sm,
  },
  completedBadge: {
    marginTop: Theme.spacing.sm,
  },
});
