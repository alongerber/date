/**
 * Onboarding Screen
 *
 * הזנת שמות ומגדרים של השחקנים
 */

import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Input, GenderSelector, Gender } from '@/components/common';
import { TypewriterText } from '@/components/drCharif';
import { useGameStore } from '@/store/gameStore';
import { nameEntryTexts } from '@/data/drCharifTexts';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

type Step = 'name1' | 'gender1' | 'name2' | 'gender2' | 'confirm';

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setPlayerName, setPlayerGender, player1, player2 } = useGameStore();

  const [step, setStep] = useState<Step>('name1');
  const [name1Input, setName1Input] = useState('');
  const [name2Input, setName2Input] = useState('');
  const [gender1, setGender1] = useState<Gender | null>(null);
  const [gender2, setGender2] = useState<Gender | null>(null);
  const [showNextStep, setShowNextStep] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleTypingComplete = () => {
    setShowNextStep(true);
  };

  const transitionToStep = (nextStep: Step) => {
    setShowNextStep(false);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      setStep(nextStep);
    }, 300);
  };

  const handleContinueName1 = async () => {
    if (!name1Input.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayerName('player1', name1Input.trim());
    transitionToStep('gender1');
  };

  const handleContinueGender1 = async () => {
    if (!gender1) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayerGender('player1', gender1);
    transitionToStep('name2');
  };

  const handleContinueName2 = async () => {
    if (!name2Input.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayerName('player2', name2Input.trim());
    transitionToStep('gender2');
  };

  const handleContinueGender2 = async () => {
    if (!gender2) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlayerGender('player2', gender2);
    transitionToStep('confirm');
  };

  const handleStartGame = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('GameIntro');
  };

  const renderStep = () => {
    switch (step) {
      case 'name1':
        return (
          <View style={styles.stepContent}>
            <TypewriterText
              lines={nameEntryTexts.askFirstName.lines}
              onComplete={handleTypingComplete}
              speed="fast"
            />
            {showNextStep && (
              <View style={styles.inputContainer}>
                <Input
                  placeholder="השם שלך"
                  value={name1Input}
                  onChangeText={setName1Input}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleContinueName1}
                />
                <Button
                  title="המשך"
                  onPress={handleContinueName1}
                  disabled={!name1Input.trim()}
                  variant="secondary"
                />
              </View>
            )}
          </View>
        );

      case 'gender1':
        return (
          <View style={styles.stepContent}>
            <TypewriterText
              lines={[{ text: 'ואיך להתייחס אליך?', delay: 0 }]}
              onComplete={handleTypingComplete}
              speed="fast"
            />
            {showNextStep && (
              <View style={styles.inputContainer}>
                <GenderSelector
                  value={gender1}
                  onChange={setGender1}
                  style={styles.genderSelector}
                />
                <Button
                  title="המשך"
                  onPress={handleContinueGender1}
                  disabled={!gender1}
                  variant="secondary"
                />
              </View>
            )}
          </View>
        );

      case 'name2':
        return (
          <View style={styles.stepContent}>
            <TypewriterText
              lines={nameEntryTexts.askSecondName.lines}
              onComplete={handleTypingComplete}
              speed="fast"
            />
            {showNextStep && (
              <View style={styles.inputContainer}>
                <Input
                  placeholder="השם של בן/בת הזוג"
                  value={name2Input}
                  onChangeText={setName2Input}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={handleContinueName2}
                />
                <Button
                  title="המשך"
                  onPress={handleContinueName2}
                  disabled={!name2Input.trim()}
                  variant="secondary"
                />
              </View>
            )}
          </View>
        );

      case 'gender2':
        return (
          <View style={styles.stepContent}>
            <TypewriterText
              lines={[{ text: `ואיך להתייחס ל${name2Input}?`, delay: 0 }]}
              onComplete={handleTypingComplete}
              speed="fast"
            />
            {showNextStep && (
              <View style={styles.inputContainer}>
                <GenderSelector
                  value={gender2}
                  onChange={setGender2}
                  style={styles.genderSelector}
                />
                <Button
                  title="המשך"
                  onPress={handleContinueGender2}
                  disabled={!gender2}
                  variant="secondary"
                />
              </View>
            )}
          </View>
        );

      case 'confirm':
        const confirmLines = nameEntryTexts.namesConfirm(
          player1.name || name1Input,
          player2.name || name2Input
        );
        return (
          <View style={styles.stepContent}>
            <TypewriterText
              lines={confirmLines.lines}
              onComplete={handleTypingComplete}
              speed="normal"
            />
            {showNextStep && (
              <View style={styles.buttonContainer}>
                <Button
                  title="בואו נתחיל"
                  onPress={handleStartGame}
                  variant="primary"
                  size="large"
                />
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenContainer keyboardAvoiding>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {renderStep()}
        </Animated.View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  stepContent: {
    paddingHorizontal: spacing.lg,
  },
  inputContainer: {
    marginTop: spacing['2xl'],
  },
  genderSelector: {
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    marginTop: spacing['3xl'],
    alignItems: 'center',
  },
});

export default OnboardingScreen;
