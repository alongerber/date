/**
 * Intensity Select Screen
 *
 * בחירת רמת עוצמה לשלב 5 - "טמפרטורה עולה"
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { useGameStore, IntensityLevel } from '@/store/gameStore';
import { intensitySelectionText, intensityChoiceTexts } from '@/data/drCharifTexts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'IntensitySelect'>;

interface IntensityOption {
  level: IntensityLevel;
  name: string;
  description: string;
  emoji: string;
}

const INTENSITY_OPTIONS: IntensityOption[] = [
  {
    level: 'soft',
    name: 'רכה',
    description: 'נגיעות, לחישות, נשיקות, התפשטות חלקית',
    emoji: '🌸',
  },
  {
    level: 'medium',
    name: 'בינונית',
    description: 'משימות אינטימיות מפורשות',
    emoji: '🔥',
  },
  {
    level: 'spicy',
    name: 'חריפה',
    description: 'הכל על השולחן',
    emoji: '🌶️',
  },
];

export const IntensitySelectScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setIntensityLevel } = useGameStore();

  const [step, setStep] = useState<'intro' | 'select' | 'confirm'>('intro');
  const [selectedLevel, setSelectedLevel] = useState<IntensityLevel | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  const handleIntroComplete = () => {
    setShowOptions(true);
  };

  const handleSelect = async (level: IntensityLevel) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedLevel(level);
    setIntensityLevel(level);
    setStep('confirm');
  };

  const handleConfirmComplete = () => {
    setShowContinue(true);
  };

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('GamePlay', { stageId: 5 });
  };

  const renderIntro = () => (
    <View style={styles.content}>
      <DrCharifMessage
        lines={intensitySelectionText.lines}
        onComplete={handleIntroComplete}
      />

      {showOptions && (
        <View style={styles.optionsContainer}>
          {INTENSITY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.level}
              style={styles.optionCard}
              onPress={() => handleSelect(option.level)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={styles.optionName}>{option.name}</Text>
              <Text style={styles.optionDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderConfirm = () => {
    if (!selectedLevel) return null;
    const confirmText = intensityChoiceTexts[selectedLevel];

    return (
      <View style={styles.content}>
        <DrCharifMessage
          lines={confirmText.lines}
          onComplete={handleConfirmComplete}
        />

        {showContinue && (
          <View style={styles.buttonContainer}>
            <Button
              title="יאללה"
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.stageIndicator}>
            <Text style={styles.stageNumber}>5</Text>
          </View>
          <Text style={styles.stageTitle}>טמפרטורה עולה</Text>
        </View>

        {/* Content */}
        {step === 'intro' && renderIntro()}
        {step === 'confirm' && renderConfirm()}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  optionsContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['2xl'],
  },
  optionCard: {
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.alpha[20],
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  optionName: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
    marginTop: spacing['2xl'],
  },
});

export default IntensitySelectScreen;
