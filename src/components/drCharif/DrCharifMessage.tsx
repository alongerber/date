/**
 * DrCharifMessage Component
 *
 * רכיב להצגת הודעות ד"ר חריף עם עיצוב ייחודי
 * כולל אייקון, רקע glassmorphism, ואפקט typewriter
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius, shadows } from '@/theme/spacing';
import { TypewriterText } from './TypewriterText';

interface DrCharifMessageProps {
  lines: Array<{ text: string; delay: number }>;
  onComplete?: () => void;
  showContinueButton?: boolean;
  onContinue?: () => void;
  continueText?: string;
  style?: ViewStyle;
  variant?: 'default' | 'minimal' | 'card';
}

export const DrCharifMessage: React.FC<DrCharifMessageProps> = ({
  lines,
  onComplete,
  showContinueButton = false,
  onContinue,
  continueText = 'המשך',
  style,
  variant = 'default',
}) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    onComplete?.();
  };

  if (variant === 'minimal') {
    return (
      <View style={[styles.minimalContainer, style]}>
        <TypewriterText lines={lines} onComplete={handleTypingComplete} />
        {showContinueButton && isTypingComplete && (
          <TouchableOpacity
            style={styles.minimalButton}
            onPress={onContinue}
            activeOpacity={0.7}
          >
            <Text style={styles.minimalButtonText}>{continueText}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[colors.background.secondary, colors.background.tertiary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header with Dr. Charif indicator */}
        <View style={styles.header}>
          <View style={styles.indicator}>
            <Text style={styles.indicatorText}>ד״ר חריף</Text>
          </View>
          <View style={styles.decorLine} />
        </View>

        {/* Message content */}
        <View style={styles.content}>
          <TypewriterText
            lines={lines}
            onComplete={handleTypingComplete}
            speed="normal"
          />
        </View>

        {/* Continue button */}
        {showContinueButton && isTypingComplete && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>{continueText}</Text>
            <Text style={styles.arrow}>←</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  minimalContainer: {
    paddingHorizontal: spacing.lg,
  },
  gradient: {
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.alpha[10],
    borderRadius: borderRadius.xl,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  indicator: {
    backgroundColor: colors.accent.wine,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  indicatorText: {
    ...typography.label,
    color: colors.text.primary,
    fontSize: 12,
  },
  decorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.accent.gold,
    opacity: 0.3,
    marginRight: spacing.md,
  },
  content: {
    minHeight: 100,
  },
  continueButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.alpha[10],
  },
  continueButtonText: {
    ...typography.button,
    color: colors.accent.gold,
    marginLeft: spacing.sm,
  },
  arrow: {
    color: colors.accent.gold,
    fontSize: 18,
  },
  minimalButton: {
    alignSelf: 'center',
    marginTop: spacing['2xl'],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['2xl'],
    borderWidth: 1,
    borderColor: colors.accent.gold,
    borderRadius: borderRadius.full,
  },
  minimalButtonText: {
    ...typography.button,
    color: colors.accent.gold,
  },
});

export default DrCharifMessage;
