/**
 * Game Play Screen
 *
 * מסך המשחק הראשי - שאלות ומשימות
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card, Input } from '@/components/common';
import { useGameStore, STAGES, POINTS } from '@/store/gameStore';
import { getRandomQuestion, formatQuestion } from '@/data/questions';
import { getRandomTask, formatTask } from '@/data/tasks';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GamePlay'>;
type RouteType = RouteProp<RootStackParamList, 'GamePlay'>;

type GameStep = 'difficulty' | 'content' | 'answer' | 'confirm';

export const GamePlayScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { stageId } = route.params;

  const {
    player1,
    player2,
    currentTurn,
    stageProgress,
    intensityLevel,
    selectDifficulty,
    completeQuestion,
    completeTask,
    useVeto,
    nextTurn,
    nextStage,
    getCurrentPlayer,
    getPartner,
  } = useGameStore();

  const [step, setStep] = useState<GameStep>('difficulty');
  const [selectedDifficulty, setSelectedDifficulty] = useState<1 | 2 | 3 | null>(null);
  const [currentContent, setCurrentContent] = useState<{
    type: 'question' | 'task';
    text: string;
    id: string;
  } | null>(null);
  const [answer, setAnswer] = useState('');
  const [usedIds, setUsedIds] = useState<string[]>([]);

  const currentPlayer = getCurrentPlayer();
  const partner = getPartner();
  const stageInfo = STAGES.find((s) => s.id === stageId);
  const currentProgress = stageProgress.find((p) => p.stageId === stageId);

  const isStageComplete =
    currentProgress && currentProgress.currentItemIndex >= (stageInfo?.items || 0);

  // Check if stage is complete
  useEffect(() => {
    if (isStageComplete) {
      navigation.navigate('StageComplete', { stageId });
    }
  }, [isStageComplete, stageId, navigation]);

  const handleSelectDifficulty = async (difficulty: 1 | 2 | 3) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedDifficulty(difficulty);
    selectDifficulty(difficulty);

    // Determine if question or task based on stage ratio
    const isQuestion = Math.random() < (stageInfo?.questionRatio || 0.5);

    if (isQuestion) {
      const question = getRandomQuestion(stageId, difficulty, usedIds);
      if (question) {
        const formattedText = formatQuestion(
          question,
          partner.name,
          currentPlayer.gender || 'other'
        );
        setCurrentContent({ type: 'question', text: formattedText, id: question.id });
        setUsedIds([...usedIds, question.id]);
      }
    } else {
      const task = getRandomTask(
        stageId,
        difficulty,
        usedIds,
        stageId === 5 ? intensityLevel || undefined : undefined
      );
      if (task) {
        const formattedText = formatTask(task, partner.name);
        setCurrentContent({ type: 'task', text: formattedText, id: task.id });
        setUsedIds([...usedIds, task.id]);
      }
    }

    setStep('content');
  };

  const handleVeto = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    useVeto();
    nextTurn();
    resetTurn();
  };

  const handleAnswerSubmit = async () => {
    if (!answer.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    completeQuestion(answer);
    nextTurn();
    resetTurn();
  };

  const handleTaskComplete = async (confirmed: boolean) => {
    await Haptics.impactAsync(confirmed ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Heavy);
    completeTask(confirmed);
    nextTurn();
    resetTurn();
  };

  const resetTurn = () => {
    setStep('difficulty');
    setSelectedDifficulty(null);
    setCurrentContent(null);
    setAnswer('');
  };

  const renderDifficultySelection = () => (
    <View style={styles.difficultyContainer}>
      <Text style={styles.turnIndicator}>התור של {currentPlayer.name}</Text>
      <Text style={styles.subtitle}>בחר/י רמת תעוזה</Text>

      <View style={styles.difficultyButtons}>
        {[1, 2, 3].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.difficultyButton,
              {
                borderColor:
                  level === 1
                    ? colors.difficulty.easy
                    : level === 2
                    ? colors.difficulty.medium
                    : colors.difficulty.hard,
              },
            ]}
            onPress={() => handleSelectDifficulty(level as 1 | 2 | 3)}
            activeOpacity={0.7}
          >
            <Text style={styles.difficultyEmoji}>
              {level === 1 ? '😊' : level === 2 ? '😏' : '🔥'}
            </Text>
            <Text style={styles.difficultyLabel}>
              {level === 1 ? 'קל' : level === 2 ? 'בינוני' : 'אמיץ'}
            </Text>
            <Text style={styles.difficultyPoints}>{POINTS.difficulty[level as 1 | 2 | 3]} נקודות</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    if (!currentContent) return null;

    return (
      <View style={styles.contentContainer}>
        <Card variant="bordered" style={styles.contentCard}>
          <View style={styles.typeIndicator}>
            <Text style={styles.typeText}>
              {currentContent.type === 'question' ? '❓ שאלה' : '🎯 משימה'}
            </Text>
          </View>
          <Text style={styles.contentText}>{currentContent.text}</Text>
        </Card>

        {currentContent.type === 'question' ? (
          <View style={styles.answerSection}>
            <Input
              placeholder="הקלד/י את התשובה..."
              value={answer}
              onChangeText={setAnswer}
              multiline
              numberOfLines={3}
              style={styles.answerInput}
            />
            <View style={styles.actionButtons}>
              <Button
                title="ענה"
                onPress={handleAnswerSubmit}
                disabled={!answer.trim()}
                variant="primary"
                style={styles.actionButton}
              />
              {currentPlayer.vetosRemaining > 0 && (
                <Button
                  title={`וטו (${currentPlayer.vetosRemaining})`}
                  onPress={handleVeto}
                  variant="ghost"
                  style={styles.vetoButton}
                />
              )}
            </View>
          </View>
        ) : (
          <View style={styles.taskSection}>
            <Text style={styles.taskInstructions}>
              {partner.name}, האם המשימה בוצעה?
            </Text>
            <View style={styles.actionButtons}>
              <Button
                title="בוצע"
                onPress={() => handleTaskComplete(true)}
                variant="primary"
                style={styles.actionButton}
              />
              <Button
                title="לא בוצע"
                onPress={() => handleTaskComplete(false)}
                variant="wine"
                style={styles.actionButton}
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header with scores */}
        <View style={styles.header}>
          <View style={styles.scoreContainer}>
            <Text
              style={[
                styles.playerName,
                currentTurn === 'player1' && styles.activePlayer,
              ]}
            >
              {player1.name}
            </Text>
            <Text style={styles.score}>{player1.score}</Text>
          </View>

          <View style={styles.progressContainer}>
            <Text style={styles.stageLabel}>{stageInfo?.name}</Text>
            <Text style={styles.progressText}>
              {currentProgress?.currentItemIndex || 0} / {stageInfo?.items}
            </Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text
              style={[
                styles.playerName,
                currentTurn === 'player2' && styles.activePlayer,
              ]}
            >
              {player2.name}
            </Text>
            <Text style={styles.score}>{player2.score}</Text>
          </View>
        </View>

        {/* Main content */}
        <ScrollView
          style={styles.mainContent}
          contentContainerStyle={styles.scrollContent}
        >
          {step === 'difficulty' && renderDifficultySelection()}
          {step === 'content' && renderContent()}
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.alpha[10],
  },
  scoreContainer: {
    alignItems: 'center',
    minWidth: 80,
  },
  playerName: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  activePlayer: {
    color: colors.accent.gold,
    fontWeight: 'bold',
  },
  score: {
    ...typography.h3,
    color: colors.text.primary,
  },
  progressContainer: {
    alignItems: 'center',
  },
  stageLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  difficultyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turnIndicator: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing['2xl'],
    textAlign: 'center',
  },
  difficultyButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    width: '100%',
  },
  difficultyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 120,
    marginHorizontal: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderRadius: borderRadius.lg,
  },
  difficultyEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  difficultyLabel: {
    ...typography.button,
    color: colors.text.primary,
  },
  difficultyPoints: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  contentContainer: {
    flex: 1,
  },
  contentCard: {
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  typeIndicator: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  typeText: {
    ...typography.label,
    color: colors.accent.gold,
  },
  contentText: {
    ...typography.bodyLarge,
    color: colors.text.primary,
    textAlign: 'right',
    lineHeight: 28,
  },
  answerSection: {
    marginTop: spacing.lg,
  },
  answerInput: {
    marginBottom: spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    maxWidth: 150,
  },
  vetoButton: {
    maxWidth: 100,
  },
  taskSection: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  taskInstructions: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
});

export default GamePlayScreen;
