/**
 * Game Intro Screen
 *
 * מסך פתיחה של המשחק עם הקדמה של ד"ר חריף
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { useGameStore } from '@/store/gameStore';
import { gameIntroText } from '@/data/drCharifTexts';
import { spacing } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameIntro'>;

export const GameIntroScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { startGame } = useGameStore();
  const [showButton, setShowButton] = useState(false);

  const handleTypingComplete = () => {
    setShowButton(true);
  };

  const handleStart = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    startGame();
    navigation.navigate('StageIntro', { stageId: 1 });
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.content}>
          <DrCharifMessage
            lines={gameIntroText.lines}
            onComplete={handleTypingComplete}
          />
        </View>

        {showButton && (
          <View style={styles.buttonContainer}>
            <Button
              title="יאללה"
              onPress={handleStart}
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
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
});

export default GameIntroScreen;
