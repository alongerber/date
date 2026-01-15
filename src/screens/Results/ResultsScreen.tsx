/**
 * Results Screen - סיום
 *
 * מסך סיום עם סיכום וטקסט ד"ר חריף
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Share,
} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { useGameStore } from '@/store/gameStore';
import { endingText, tieEndingText } from '@/data/drCharifTexts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;

export const ResultsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { player1, player2, getWinner, resetGame } = useGameStore();
  const [showButtons, setShowButtons] = useState(false);

  const winner = getWinner();
  const isTie = !winner;

  const endText = isTie ? tieEndingText : endingText(winner?.name || '');

  const handleTypingComplete = () => {
    setShowButtons(true);
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `שיחקנו ב"זוגיט" 🍷\n${player1.name}: ${player1.score} נקודות\n${player2.name}: ${player2.score} נקודות\n\nהערב שלא תספרו עליו בקבוצת הורים`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handlePlayAgain = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    resetGame();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      })
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Final scores */}
        <View style={styles.scoresSection}>
          <Text style={styles.title}>סיום</Text>

          <View style={styles.finalScores}>
            <View style={[
              styles.playerFinalScore,
              winner?.id === 'player1' && styles.winnerScore,
            ]}>
              {winner?.id === 'player1' && (
                <Text style={styles.crownEmoji}>👑</Text>
              )}
              <Text style={styles.finalName}>{player1.name}</Text>
              <Text style={styles.finalScore}>{player1.score}</Text>
            </View>

            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View style={[
              styles.playerFinalScore,
              winner?.id === 'player2' && styles.winnerScore,
            ]}>
              {winner?.id === 'player2' && (
                <Text style={styles.crownEmoji}>👑</Text>
              )}
              <Text style={styles.finalName}>{player2.name}</Text>
              <Text style={styles.finalScore}>{player2.score}</Text>
            </View>
          </View>

          {isTie && (
            <Text style={styles.tieText}>תיקו!</Text>
          )}
        </View>

        {/* Dr. Charif ending message */}
        <View style={styles.messageContainer}>
          <DrCharifMessage
            lines={endText.lines}
            onComplete={handleTypingComplete}
            variant="minimal"
          />
        </View>

        {/* Action buttons */}
        {showButtons && (
          <View style={styles.buttonsContainer}>
            <Button
              title="שתפו את הערב"
              onPress={handleShare}
              variant="secondary"
              fullWidth
              style={styles.shareButton}
            />
            <Button
              title="שחקו שוב"
              onPress={handlePlayAgain}
              variant="ghost"
              style={styles.playAgainButton}
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
  scoresSection: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.alpha[10],
    marginHorizontal: spacing.lg,
  },
  title: {
    ...typography.h3,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  finalScores: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  playerFinalScore: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
  },
  winnerScore: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.accent.gold,
  },
  crownEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  finalName: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  finalScore: {
    ...typography.h1,
    color: colors.text.primary,
    fontSize: 48,
  },
  vsContainer: {
    paddingHorizontal: spacing.md,
  },
  vsText: {
    ...typography.bodySmall,
    color: colors.text.muted,
  },
  tieText: {
    ...typography.h3,
    color: colors.accent.gold,
    marginTop: spacing.lg,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  buttonsContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  shareButton: {
    marginBottom: spacing.md,
  },
  playAgainButton: {
    alignSelf: 'center',
  },
});

export default ResultsScreen;
