/**
 * Quiz Setup Screen
 *
 * הגדרת החידון - יצירת/הצטרפות לחדר
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card, Input } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { useQuizStore } from '@/store/quizStore';
import { quizIntroText, deviceConnectionText } from '@/data/drCharifTexts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizSetup'>;

type SetupStep = 'intro' | 'connection' | 'choice';

export const QuizSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { createRoom, joinRoom } = useQuizStore();

  const [step, setStep] = useState<SetupStep>('intro');
  const [showNext, setShowNext] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');

  const handleIntroComplete = () => {
    setShowNext(true);
  };

  const handleConnectionComplete = () => {
    setShowNext(true);
  };

  const handleContinueToConnection = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowNext(false);
    setStep('connection');
  };

  const handleContinueToChoice = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowNext(false);
    setStep('choice');
  };

  const handleCreateRoom = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const code = createRoom();
    navigation.navigate('QuizWaiting', { roomCode: code, isHost: true });
  };

  const handleJoinRoom = async () => {
    if (joinCode.length !== 4) {
      setJoinError('הקוד צריך להיות 4 ספרות');
      return;
    }
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    joinRoom(joinCode);
    navigation.navigate('QuizWaiting', { roomCode: joinCode, isHost: false });
  };

  const renderIntro = () => (
    <View style={styles.content}>
      <DrCharifMessage
        lines={quizIntroText.lines}
        onComplete={handleIntroComplete}
      />
      {showNext && (
        <View style={styles.buttonContainer}>
          <Button
            title="הבנתי"
            onPress={handleContinueToConnection}
            variant="primary"
            size="large"
          />
        </View>
      )}
    </View>
  );

  const renderConnection = () => (
    <View style={styles.content}>
      <DrCharifMessage
        lines={deviceConnectionText.lines}
        onComplete={handleConnectionComplete}
      />
      {showNext && (
        <View style={styles.buttonContainer}>
          <Button
            title="מוכנים"
            onPress={handleContinueToChoice}
            variant="primary"
            size="large"
          />
        </View>
      )}
    </View>
  );

  const renderChoice = () => (
    <View style={styles.content}>
      <Text style={styles.choiceTitle}>בחרו אחד</Text>

      {/* Create room option */}
      <Card variant="bordered" style={styles.optionCard} onPress={handleCreateRoom}>
        <Text style={styles.optionEmoji}>📱</Text>
        <Text style={styles.optionTitle}>יצירת חדר</Text>
        <Text style={styles.optionDescription}>
          קבל קוד לשיתוף עם בן/בת הזוג
        </Text>
      </Card>

      {/* Join room option */}
      <Card variant="glass" style={styles.optionCard}>
        <Text style={styles.optionEmoji}>🔗</Text>
        <Text style={styles.optionTitle}>הצטרפות לחדר</Text>
        <Input
          placeholder="הקלד קוד 4 ספרות"
          value={joinCode}
          onChangeText={(text) => {
            setJoinCode(text.replace(/[^0-9]/g, '').slice(0, 4));
            setJoinError('');
          }}
          keyboardType="numeric"
          maxLength={4}
          error={joinError}
          containerStyle={styles.codeInput}
        />
        <Button
          title="הצטרף"
          onPress={handleJoinRoom}
          variant="secondary"
          disabled={joinCode.length !== 4}
        />
      </Card>
    </View>
  );

  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.stageIndicator}>
            <Text style={styles.stageNumber}>6</Text>
          </View>
          <Text style={styles.stageTitle}>החידון הזוגי</Text>
        </View>

        {/* Content */}
        {step === 'intro' && renderIntro()}
        {step === 'connection' && renderConnection()}
        {step === 'choice' && renderChoice()}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacing['3xl'],
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.lg,
  },
  stageIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent.wine,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  stageNumber: {
    ...typography.h3,
    color: colors.text.primary,
  },
  stageTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  buttonContainer: {
    marginTop: spacing['2xl'],
    alignItems: 'center',
  },
  choiceTitle: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  optionCard: {
    marginBottom: spacing.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  optionEmoji: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  optionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  codeInput: {
    marginVertical: spacing.md,
    width: '100%',
  },
});

export default QuizSetupScreen;
