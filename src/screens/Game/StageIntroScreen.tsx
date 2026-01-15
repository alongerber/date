/**
 * Stage Intro Screen
 *
 * מסך פתיחת שלב עם הסבר של ד"ר חריף
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

import { ScreenContainer, Button } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { stageIntros } from '@/data/drCharifTexts';
import { STAGES } from '@/store/gameStore';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'StageIntro'>;
type RouteType = RouteProp<RootStackParamList, 'StageIntro'>;

export const StageIntroScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { stageId } = route.params;
  const [showButton, setShowButton] = useState(false);

  const stageIntro = stageIntros[stageId];
  const stageInfo = STAGES.find((s) => s.id === stageId);

  const handleTypingComplete = () => {
    setShowButton(true);
  };

  const handleContinue = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Stage 5 needs intensity selection first
    if (stageId === 5) {
      navigation.navigate('IntensitySelect');
    } else {
      navigation.navigate('GamePlay', { stageId });
    }
  };

  if (!stageIntro) {
    return null;
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Stage number indicator */}
        <View style={styles.header}>
          <View style={styles.stageIndicator}>
            <Text style={styles.stageNumber}>{stageId}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <DrCharifMessage
            lines={stageIntro.lines}
            onComplete={handleTypingComplete}
          />
        </View>

        {showButton && (
          <View style={styles.buttonContainer}>
            <Button
              title="מוכנים"
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
  },
  stageNumber: {
    ...typography.h3,
    color: colors.text.primary,
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

export default StageIntroScreen;
