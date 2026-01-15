/**
 * Stage Complete Screen
 *
 * מסך סיום שלב עם סיכום וטקסט ד"ר חריף
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { useGameStore, STAGES } from '@/store/gameStore';
import { transitionTexts } from '@/data/drCharifTexts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'StageComplete'>;
type RouteType = RouteProp<RootStackParamList, 'StageComplete'>;

export const StageCompleteScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { stageId } = route.params;
  const [showButton, setShowButton] = useState(false);

  const { player1, player2, isPremium, nextStage } = useGameStore();

  const stageInfo = STAGES.find((s) => s.id === stageId);
  const nextStageInfo = STAGES.find((s) => s.id === stageId + 1);

  const transitionText = transitionTexts[0]; // Use first transition text

  const handleTypingComplete = () => {
    setShowButton(true);
  };

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    nextStage();

    // Check where to navigate
    const nextStageNum = stageId + 1;

    if (nextStageNum === 3 && !isPremium) {
      navigation.navigate('Paywall');
    } else if (nextStageNum === 6) {
      navigation.navigate('QuizSetup');
    } else if (nextStageNum <= 5) {
      navigation.navigate('StageIntro', { stageId: nextStageNum });
    } else {
      navigation.navigate('Wheel');
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Stage complete header */}
        <View style={styles.header}>
          <Text style={styles.completedText}>סיום שלב {stageId}</Text>
          <Text style={styles.stageTitle}>{stageInfo?.name}</Text>
        </View>

        {/* Score summary */}
        <Card variant="glass" style={styles.scoreCard}>
          <View style={styles.scoresRow}>
            <View style={styles.playerScore}>
              <Text style={styles.playerScoreName}>{player1.name}</Text>
              <Text style={styles.playerScoreValue}>{player1.score}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.playerScore}>
              <Text style={styles.playerScoreName}>{player2.name}</Text>
              <Text style={styles.playerScoreValue}>{player2.score}</Text>
            </View>
          </View>
        </Card>

        {/* Dr. Charif transition text */}
        <View style={styles.messageContainer}>
          <DrCharifMessage
            lines={transitionText.lines}
            onComplete={handleTypingComplete}
            variant="minimal"
          />
        </View>

        {/* Continue button */}
        {showButton && (
          <View style={styles.buttonContainer}>
            <Text style={styles.nextStageText}>
              הבא: {nextStageInfo?.name || 'החידון הזוגי'}
            </Text>
            <Button
              title="להמשיך"
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
            />
          </View>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing['2xl'],
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  completedText: {
    ...typography.caption,
    color: colors.accent.gold,
    marginBottom: spacing.xs,
  },
  stageTitle: {
    ...typography.h2,
    color: colors.text.primary,
  },
  scoreCard: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  scoresRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  playerScore: {
    alignItems: 'center',
    flex: 1,
  },
  playerScoreName: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  playerScoreValue: {
    ...typography.h1,
    color: colors.text.primary,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: colors.alpha[20],
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
    alignItems: 'center',
  },
  nextStageText: {
    ...typography.bodySmall,
    color: colors.text.muted,
    marginBottom: spacing.md,
  },
});

export default StageCompleteScreen;
