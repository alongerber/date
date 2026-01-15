/**
 * Quiz Play Screen
 *
 * מסך משחק החידון
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { useQuizStore } from '@/store/quizStore';
import { useGameStore } from '@/store/gameStore';
import { QUIZ_CATEGORIES } from '@/data/quizQuestions';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizPlay'>;

type AnswerPhase = 'self' | 'partner' | 'waiting';

export const QuizPlayScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    questions,
    currentQuestionIndex,
    totalQuestions,
    currentSelfAnswer,
    currentPartnerAnswer,
    setCurrentSelfAnswer,
    setCurrentPartnerAnswer,
    submitAnswer,
    nextQuestion,
    calculateResults,
  } = useQuizStore();

  const { player1, player2 } = useGameStore();

  const [phase, setPhase] = useState<AnswerPhase>('self');

  const currentQuestion = questions[currentQuestionIndex];
  const categoryInfo = currentQuestion
    ? QUIZ_CATEGORIES[currentQuestion.category]
    : null;

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectSelf = async (index: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentSelfAnswer(index);
  };

  const handleSelectPartner = async (index: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentPartnerAnswer(index);
  };

  const handleContinueToPartner = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPhase('partner');
  };

  const handleSubmit = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    submitAnswer();

    if (isLastQuestion) {
      // Calculate results and navigate
      calculateResults();
      navigation.navigate('QuizResults');
    } else {
      // Move to next question
      nextQuestion();
      setPhase('self');
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const renderOptions = (
    selectedIndex: number | null,
    onSelect: (index: number) => void
  ) => (
    <View style={styles.optionsContainer}>
      {currentQuestion.options.map((option, index) => {
        const isSelected = selectedIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, isSelected && styles.optionSelected]}
            onPress={() => onSelect(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.optionText, isSelected && styles.optionTextSelected]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderSelfPhase = () => (
    <>
      <Text style={styles.phaseLabel}>מה התשובה עבורך?</Text>
      {renderOptions(currentSelfAnswer, handleSelectSelf)}

      <View style={styles.buttonContainer}>
        <Button
          title="המשך"
          onPress={handleContinueToPartner}
          variant="primary"
          disabled={currentSelfAnswer === null}
          fullWidth
        />
      </View>
    </>
  );

  const renderPartnerPhase = () => (
    <>
      <Text style={styles.phaseLabel}>מה לדעתך התשובה של {player2.name}?</Text>
      {renderOptions(currentPartnerAnswer, handleSelectPartner)}

      <View style={styles.buttonContainer}>
        <Button
          title={isLastQuestion ? 'סיום' : 'שאלה הבאה'}
          onPress={handleSubmit}
          variant="primary"
          disabled={currentPartnerAnswer === null}
          fullWidth
        />
      </View>
    </>
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {totalQuestions}
          </Text>
        </View>

        {/* Question card */}
        <ScrollView style={styles.scrollContent}>
          <Card variant="bordered" style={styles.questionCard}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{categoryInfo?.name}</Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.text}</Text>
          </Card>

          {/* Answer phase */}
          {phase === 'self' && renderSelfPhase()}
          {phase === 'partner' && renderPartnerPhase()}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.alpha[20],
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.gold,
    borderRadius: 2,
  },
  progressText: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  questionCard: {
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  categoryBadge: {
    alignSelf: 'flex-end',
    backgroundColor: colors.accent.wine,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  categoryText: {
    ...typography.caption,
    color: colors.text.primary,
  },
  questionText: {
    ...typography.h4,
    color: colors.text.primary,
    textAlign: 'right',
    lineHeight: 28,
  },
  phaseLabel: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    marginBottom: spacing.xl,
  },
  optionButton: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.alpha[20],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  optionSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: colors.background.tertiary,
  },
  optionText: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'right',
  },
  optionTextSelected: {
    color: colors.accent.gold,
  },
  buttonContainer: {
    paddingBottom: spacing['2xl'],
  },
});

export default QuizPlayScreen;
