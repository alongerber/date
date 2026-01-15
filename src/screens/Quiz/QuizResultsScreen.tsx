/**
 * Quiz Results Screen
 *
 * תוצאות החידון
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { useQuizStore } from '@/store/quizStore';
import { useGameStore } from '@/store/gameStore';
import { getQuizQuestionById } from '@/data/quizQuestions';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizResults'>;

export const QuizResultsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { results, player1Score, player2Score, questions } = useQuizStore();
  const { player1, player2 } = useGameStore();

  const [showDetails, setShowDetails] = useState(false);

  const player1CorrectCount = results.filter((r) => r.player1Correct).length;
  const player2CorrectCount = results.filter((r) => r.player2Correct).length;

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Wheel');
  };

  const handleToggleDetails = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowDetails(!showDetails);
  };

  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>תוצאות החידון</Text>
        </View>

        {/* Score cards */}
        <View style={styles.scoresContainer}>
          <Card
            variant={player1CorrectCount >= player2CorrectCount ? 'bordered' : 'glass'}
            style={styles.scoreCard}
          >
            <Text style={styles.playerName}>{player1.name}</Text>
            <Text style={styles.scoreValue}>
              {player1CorrectCount}/{results.length}
            </Text>
            <Text style={styles.scoreLabel}>תשובות נכונות</Text>
          </Card>

          <Card
            variant={player2CorrectCount >= player1CorrectCount ? 'bordered' : 'glass'}
            style={styles.scoreCard}
          >
            <Text style={styles.playerName}>{player2.name}</Text>
            <Text style={styles.scoreValue}>
              {player2CorrectCount}/{results.length}
            </Text>
            <Text style={styles.scoreLabel}>תשובות נכונות</Text>
          </Card>
        </View>

        {/* Summary message */}
        <Card variant="glass" style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            {player1CorrectCount === player2CorrectCount
              ? 'תיקו מושלם! אתם מכירים אחד את השנייה באותה רמה.'
              : player1CorrectCount > player2CorrectCount
              ? `${player1.name} מכיר/ה את ${player2.name} קצת יותר טוב הערב!`
              : `${player2.name} מכיר/ה את ${player1.name} קצת יותר טוב הערב!`}
          </Text>
        </Card>

        {/* Show details button */}
        <Button
          title={showDetails ? 'הסתר פרטים' : 'הצג פרטים'}
          onPress={handleToggleDetails}
          variant="ghost"
          style={styles.detailsButton}
        />

        {/* Detailed results */}
        {showDetails && (
          <View style={styles.detailsContainer}>
            {results.map((result, index) => {
              const question = questions.find((q) => q.id === result.questionId);
              if (!question) return null;

              return (
                <Card key={result.questionId} variant="glass" style={styles.detailCard}>
                  <Text style={styles.detailQuestion}>
                    {index + 1}. {question.text}
                  </Text>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{player1.name} ענה/תה:</Text>
                    <Text style={styles.detailValue}>
                      {question.options[result.player1SelfAnswer]}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>{player2.name} ענה/תה:</Text>
                    <Text style={styles.detailValue}>
                      {question.options[result.player2SelfAnswer]}
                    </Text>
                  </View>

                  <View style={styles.resultIcons}>
                    <View style={styles.resultIconRow}>
                      <Text style={styles.resultIcon}>
                        {result.player1Correct ? '✓' : '✗'}
                      </Text>
                      <Text style={styles.resultName}>{player1.name}</Text>
                    </View>
                    <View style={styles.resultIconRow}>
                      <Text style={styles.resultIcon}>
                        {result.player2Correct ? '✓' : '✗'}
                      </Text>
                      <Text style={styles.resultName}>{player2.name}</Text>
                    </View>
                  </View>
                </Card>
              );
            })}
          </View>
        )}

        {/* Continue button */}
        <View style={styles.buttonContainer}>
          <Button
            title="לגלגל המזל"
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['3xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  scoresContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  scoreCard: {
    flex: 1,
    marginHorizontal: spacing.sm,
    padding: spacing.lg,
    alignItems: 'center',
  },
  playerName: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  scoreValue: {
    ...typography.h1,
    color: colors.text.primary,
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  summaryCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  summaryText: {
    ...typography.body,
    color: colors.text.primary,
    textAlign: 'center',
    lineHeight: 24,
  },
  detailsButton: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
  },
  detailsContainer: {
    paddingHorizontal: spacing.lg,
  },
  detailCard: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  detailQuestion: {
    ...typography.bodySmall,
    color: colors.text.primary,
    textAlign: 'right',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  detailValue: {
    ...typography.caption,
    color: colors.text.secondary,
    flex: 1,
    textAlign: 'left',
  },
  resultIcons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.alpha[10],
  },
  resultIconRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  resultIcon: {
    fontSize: 16,
    marginLeft: spacing.xs,
    color: colors.accent.gold,
  },
  resultName: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
  },
});

export default QuizResultsScreen;
