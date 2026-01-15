/**
 * GenderSelector Component
 *
 * בחירת מגדר עם עיצוב ייחודי
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';

export type Gender = 'male' | 'female' | 'other';

interface GenderSelectorProps {
  value: Gender | null;
  onChange: (gender: Gender) => void;
  style?: ViewStyle;
  label?: string;
}

const GENDER_OPTIONS: Array<{ value: Gender; label: string; emoji: string }> = [
  { value: 'female', label: 'אישה', emoji: '♀' },
  { value: 'male', label: 'גבר', emoji: '♂' },
  { value: 'other', label: 'אחר', emoji: '⚧' },
];

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  value,
  onChange,
  style,
  label,
}) => {
  const handleSelect = async (gender: Gender) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onChange(gender);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.options}>
        {GENDER_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => handleSelect(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionEmoji,
                  isSelected && styles.optionEmojiSelected,
                ]}
              >
                {option.emoji}
              </Text>
              <Text
                style={[
                  styles.optionLabel,
                  isSelected && styles.optionLabelSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textAlign: 'right',
  },
  options: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xs,
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderColor: colors.alpha[20],
    borderRadius: borderRadius.lg,
  },
  optionSelected: {
    borderColor: colors.accent.gold,
    backgroundColor: colors.background.tertiary,
  },
  optionEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
    opacity: 0.6,
  },
  optionEmojiSelected: {
    opacity: 1,
  },
  optionLabel: {
    ...typography.bodySmall,
    color: colors.text.muted,
  },
  optionLabelSelected: {
    color: colors.accent.gold,
  },
});

export default GenderSelector;
