/**
 * סצנת ד"ר חריף המלאה
 * משלב אווטאר + דיבור + רקע + ניקוד שחקנים
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ScreenBackground } from '../common/ScreenBackground';
import { PlayerScoreCard } from '../common/PlayerScoreCard';
import { GoldButton } from '../common/GoldButton';
import { DrCharifAvatar, DrCharifExpression } from './DrCharifAvatar';
import { DrCharifSpeech } from './DrCharifSpeech';
import { colors, spacing } from '../../theme';

interface Player {
  name: string;
  score: number;
  avatar?: string;
}

interface SpeechLine {
  text: string;
  pauseAfter?: number;
  expression?: DrCharifExpression;
}

interface Props {
  lines: SpeechLine[];
  player1: Player;
  player2: Player;
  activePlayer?: 1 | 2;
  onComplete?: () => void;
  showContinueButton?: boolean;
  continueButtonText?: string;
  onContinue?: () => void;
}

export const DrCharifScene: React.FC<Props> = ({
  lines,
  player1,
  player2,
  activePlayer,
  onComplete,
  showContinueButton = false,
  continueButtonText = 'המשך',
  onContinue,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [currentExpression, setCurrentExpression] = useState<DrCharifExpression>('listening');
  const [speechComplete, setSpeechComplete] = useState(false);

  const handleLineStart = useCallback((index: number) => {
    setIsSpeaking(true);
    const line = lines[index];
    setCurrentExpression(line.expression || 'speaking');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [lines]);

  const handleLineComplete = useCallback((index: number) => {
    setIsSpeaking(false);
    setCurrentExpression('listening');
  }, []);

  const handleAllComplete = useCallback(() => {
    setIsSpeaking(false);
    setCurrentExpression('approving');
    setSpeechComplete(true);
    onComplete?.();
  }, [onComplete]);

  const handleContinue = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onContinue?.();
  }, [onContinue]);

  return (
    <ScreenBackground variant="glow">
      <View style={styles.container}>
        {/* Player scores header */}
        <View style={styles.playersHeader}>
          <PlayerScoreCard
            name={player1.name}
            score={player1.score}
            avatar={player1.avatar}
            isActive={activePlayer === 1}
            position="left"
          />
          <PlayerScoreCard
            name={player2.name}
            score={player2.score}
            avatar={player2.avatar}
            isActive={activePlayer === 2}
            position="right"
          />
        </View>

        {/* Dr. Charif section */}
        <View style={styles.drCharifSection}>
          <DrCharifAvatar
            expression={currentExpression}
            isSpeaking={isSpeaking}
            size={100}
          />
        </View>

        {/* Speech bubble */}
        <View style={styles.speechSection}>
          <DrCharifSpeech
            lines={lines}
            onLineStart={handleLineStart}
            onLineComplete={handleLineComplete}
            onAllComplete={handleAllComplete}
          />
        </View>

        {/* Continue button */}
        {showContinueButton && speechComplete && (
          <View style={styles.buttonSection}>
            <GoldButton
              title={continueButtonText}
              onPress={handleContinue}
              variant="primary"
              size="large"
            />
          </View>
        )}
      </View>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  drCharifSection: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  speechSection: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
});

export default DrCharifScene;
