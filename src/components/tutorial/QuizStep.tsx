/**
 * Quiz Step Component
 * Multiple choice quiz for lessons
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LessonStep } from '../../types/tutorial';
import { Colors } from '../../constants/colors';
import { Theme } from '../../constants/theme';
import { Body, Heading, Button, Card } from '../common';

interface QuizStepProps {
  step: LessonStep;
  onNext: () => void;
  isLastStep: boolean;
}

export default function QuizStep({ step, onNext, isLastStep }: QuizStepProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  if (!step.quiz) return null;

  const { question, options, correctAnswer, explanation } = step.quiz;
  const isCorrect = selectedAnswer === correctAnswer;

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Card variant="elevated" padding="lg" theme="dark" style={styles.container}>
      <Heading level={3} color={Colors.dark.text}>
        {step.title}
      </Heading>

      <Body color={Colors.dark.textSecondary} style={styles.questionText}>
        {question}
      </Body>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === correctAnswer;

          let optionStyle = styles.option;
          if (showResult && isCorrectOption) {
            optionStyle = styles.correctOption;
          } else if (showResult && isSelected && !isCorrect) {
            optionStyle = styles.wrongOption;
          } else if (isSelected) {
            optionStyle = styles.selectedOption;
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleAnswerSelect(index)}
              disabled={showResult}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionBullet}>
                  <Body weight="bold" color={Colors.dark.text}>
                    {String.fromCharCode(65 + index)}
                  </Body>
                </View>
                <Body color={Colors.dark.text} style={styles.optionText}>
                  {option}
                </Body>
              </View>
              {showResult && isCorrectOption && (
                <Body color={Colors.success}>✓</Body>
              )}
              {showResult && isSelected && !isCorrect && (
                <Body color={Colors.error}>✗</Body>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Result */}
      {showResult && (
        <Card
          variant="outlined"
          padding="md"
          theme="dark"
          style={isCorrect ? styles.correctCard : styles.wrongCard}
        >
          <Body weight="semibold" color={isCorrect ? Colors.success : Colors.error}>
            {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
          </Body>
          <Body size="sm" color={Colors.dark.textSecondary} style={styles.explanation}>
            {explanation}
          </Body>
        </Card>
      )}

      {/* Actions */}
      {!showResult ? (
        <Button
          title="Submit Answer"
          onPress={handleSubmit}
          variant="primary"
          size="lg"
          fullWidth
          disabled={selectedAnswer === null}
          style={styles.button}
        />
      ) : (
        <Button
          title={isLastStep ? '✓ Complete Lesson' : 'Next →'}
          onPress={handleNext}
          variant="primary"
          size="lg"
          fullWidth
          style={styles.button}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.lg,
  },
  questionText: {
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
    fontSize: Theme.typography.sizes.lg,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
    backgroundColor: Colors.dark.surface,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 2,
    borderColor: Colors.dark.border,
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
    backgroundColor: Colors.dark.surface,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  correctOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: Theme.borderRadius.md,
    borderWidth: 2,
    borderColor: Colors.success,
  },
  wrongOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: Theme.borderRadius.md,
    borderWidth: 2,
    borderColor: Colors.error,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionBullet: {
    width: 32,
    height: 32,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  optionText: {
    flex: 1,
  },
  correctCard: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: Colors.success,
    marginBottom: Theme.spacing.md,
  },
  wrongCard: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: Colors.error,
    marginBottom: Theme.spacing.md,
  },
  explanation: {
    marginTop: Theme.spacing.xs,
    lineHeight: 20,
  },
  button: {
    marginTop: Theme.spacing.md,
  },
});
