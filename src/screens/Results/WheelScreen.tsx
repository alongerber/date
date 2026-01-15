/**
 * Wheel Screen - גלגל המזל
 *
 * גלגל עם 15 פרסים למנצח
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { useGameStore } from '@/store/gameStore';
import { prizes, Prize, getRandomPrize } from '@/data/prizes';
import { wheelIntroText } from '@/data/drCharifTexts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Wheel'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const WHEEL_SIZE = SCREEN_WIDTH * 0.8;

export const WheelScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { player1, player2, getWinner } = useGameStore();

  const [step, setStep] = useState<'intro' | 'spin' | 'result'>('intro');
  const [showSpinButton, setShowSpinButton] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  const spinValue = useRef(new Animated.Value(0)).current;

  const winner = getWinner();
  const loser = winner?.id === 'player1' ? player2 : player1;

  const handleIntroComplete = () => {
    setShowSpinButton(true);
  };

  const handleContinueToSpin = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setStep('spin');
  };

  const handleSpin = async () => {
    if (isSpinning) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsSpinning(true);

    // Select random prize
    const prize = getRandomPrize();
    setSelectedPrize(prize);

    // Calculate rotation (multiple full rotations + landing on prize)
    const prizeIndex = prizes.findIndex((p) => p.id === prize.id);
    const degreesPerSlice = 360 / prizes.length;
    const targetDegree = 360 * 5 + (degreesPerSlice * prizeIndex); // 5 full rotations + prize position

    // Animate spin
    Animated.timing(spinValue, {
      toValue: targetDegree,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      setStep('result');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });

    // Haptic feedback during spin
    let count = 0;
    const hapticInterval = setInterval(() => {
      if (count < 20) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        count++;
      } else {
        clearInterval(hapticInterval);
      }
    }, 150);
  };

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Results');
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const renderIntro = () => (
    <View style={styles.content}>
      <DrCharifMessage
        lines={wheelIntroText.lines}
        onComplete={handleIntroComplete}
      />
      {showSpinButton && (
        <View style={styles.buttonContainer}>
          <Button
            title="לגלגל"
            onPress={handleContinueToSpin}
            variant="primary"
            size="large"
          />
        </View>
      )}
    </View>
  );

  const renderWheel = () => (
    <View style={styles.wheelContainer}>
      {winner && (
        <Text style={styles.winnerLabel}>הזוכה: {winner.name}</Text>
      )}

      {/* Wheel */}
      <View style={styles.wheelWrapper}>
        {/* Pointer */}
        <View style={styles.pointer}>
          <Text style={styles.pointerArrow}>▼</Text>
        </View>

        {/* Wheel */}
        <Animated.View
          style={[
            styles.wheel,
            { transform: [{ rotate: spin }] },
          ]}
        >
          {prizes.map((prize, index) => {
            const rotation = (360 / prizes.length) * index;
            return (
              <View
                key={prize.id}
                style={[
                  styles.wheelSlice,
                  {
                    transform: [
                      { rotate: `${rotation}deg` },
                      { translateX: WHEEL_SIZE / 4 },
                    ],
                  },
                ]}
              >
                <Text style={styles.wheelEmoji}>{prize.emoji}</Text>
              </View>
            );
          })}
        </Animated.View>
      </View>

      {/* Spin button */}
      {!isSpinning && step === 'spin' && (
        <TouchableOpacity
          style={styles.spinButton}
          onPress={handleSpin}
          activeOpacity={0.8}
        >
          <Text style={styles.spinButtonText}>סובב</Text>
        </TouchableOpacity>
      )}

      {isSpinning && (
        <Text style={styles.spinningText}>מסתובב...</Text>
      )}
    </View>
  );

  const renderResult = () => (
    <View style={styles.resultContainer}>
      {selectedPrize && (
        <>
          <Text style={styles.prizeEmoji}>{selectedPrize.emoji}</Text>
          <Text style={styles.prizeName}>{selectedPrize.name}</Text>

          <Card variant="bordered" style={styles.prizeCard}>
            <Text style={styles.prizeDescription}>
              {selectedPrize.description}
            </Text>
            <View style={styles.intensityRow}>
              {[1, 2, 3].map((i) => (
                <Text
                  key={i}
                  style={[
                    styles.intensityIcon,
                    i <= selectedPrize.intensity && styles.intensityActive,
                  ]}
                >
                  🔥
                </Text>
              ))}
            </View>
          </Card>

          {winner && loser && (
            <Text style={styles.winnerMessage}>
              {winner.name} בוחר/ת, {loser.name} מבצע/ת!
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              title="סיום"
              onPress={handleContinue}
              variant="primary"
              size="large"
              fullWidth
            />
          </View>
        </>
      )}
    </View>
  );

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>גלגל המזל</Text>
        </View>

        {/* Content */}
        {step === 'intro' && renderIntro()}
        {step === 'spin' && renderWheel()}
        {step === 'result' && renderResult()}
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
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    marginTop: spacing['2xl'],
    alignItems: 'center',
  },
  wheelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerLabel: {
    ...typography.h4,
    color: colors.accent.gold,
    marginBottom: spacing.xl,
  },
  wheelWrapper: {
    position: 'relative',
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
  },
  pointer: {
    position: 'absolute',
    top: -20,
    zIndex: 10,
  },
  pointerArrow: {
    fontSize: 32,
    color: colors.accent.gold,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    backgroundColor: colors.background.secondary,
    borderWidth: 3,
    borderColor: colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelSlice: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelEmoji: {
    fontSize: 24,
  },
  spinButton: {
    marginTop: spacing['2xl'],
    backgroundColor: colors.accent.wine,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['4xl'],
    borderRadius: borderRadius.full,
  },
  spinButtonText: {
    ...typography.h3,
    color: colors.text.primary,
  },
  spinningText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xl,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  prizeEmoji: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  prizeName: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  prizeCard: {
    width: '100%',
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  prizeDescription: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  intensityRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  intensityIcon: {
    fontSize: 20,
    opacity: 0.3,
    marginHorizontal: spacing.xs,
  },
  intensityActive: {
    opacity: 1,
  },
  winnerMessage: {
    ...typography.body,
    color: colors.accent.gold,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
});

export default WheelScreen;
