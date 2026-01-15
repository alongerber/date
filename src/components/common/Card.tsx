/**
 * Card Component
 *
 * כרטיס עם glassmorphism ורקע גרדיאנט
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { spacing, borderRadius, shadows } from '@/theme/spacing';

type CardVariant = 'default' | 'elevated' | 'glass' | 'bordered';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  onPress,
  disabled = false,
  noPadding = false,
}) => {
  const cardStyle: ViewStyle[] = [
    styles.base,
    !noPadding && styles.padding,
    VARIANT_STYLES[variant],
    style,
  ];

  const content = (
    <LinearGradient
      colors={colors.gradients.card as unknown as string[]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={cardStyle}
    >
      {children}
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={disabled && styles.disabled}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const VARIANT_STYLES: Record<CardVariant, ViewStyle> = {
  default: {
    borderWidth: 1,
    borderColor: colors.alpha[10],
    ...shadows.sm,
  },
  elevated: {
    borderWidth: 0,
    ...shadows.lg,
  },
  glass: {
    borderWidth: 1,
    borderColor: colors.alpha[20],
    backgroundColor: colors.effects.glass,
    ...shadows.md,
  },
  bordered: {
    borderWidth: 1,
    borderColor: colors.accent.gold,
    ...shadows.sm,
  },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  padding: {
    padding: spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Card;
