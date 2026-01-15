/**
 * Splash Screen - "הפרוזדור"
 *
 * מסך שחור עם טקסט מופיע מילה אחרי מילה
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

import { TypewriterText } from '@/components/drCharif';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { splashTexts } from '@/data/drCharifTexts';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [showButton, setShowButton] = useState(false);
  const buttonOpacity = useState(new Animated.Value(0))[0];

  const handleTypingComplete = () => {
    setShowButton(true);
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const handleEnter = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Onboarding');
  };

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary]}
      style={styles.container}
    >
      <StatusBar style="light" />

      <View style={styles.content}>
        <TypewriterText
          lines={splashTexts.lines}
          onComplete={handleTypingComplete}
          speed="normal"
        />

        {showButton && (
          <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleEnter}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>להיכנס</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  buttonContainer: {
    marginTop: spacing['4xl'],
    alignItems: 'center',
  },
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['4xl'],
    borderWidth: 1,
    borderColor: colors.accent.gold,
    borderRadius: borderRadius.full,
  },
  buttonText: {
    ...typography.button,
    color: colors.accent.gold,
    fontSize: 18,
  },
});

export default SplashScreen;
