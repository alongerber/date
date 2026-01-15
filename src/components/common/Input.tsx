/**
 * Input Component
 *
 * שדה קלט עם עיצוב ייחודי לזוגיט
 */

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Animated,
} from 'react-native';
import { colors } from '@/theme/colors';
import { typography, fontFamilies } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  containerStyle,
  inputStyle,
  rightIcon,
  leftIcon,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = error
    ? colors.state.error
    : isFocused
    ? colors.accent.gold
    : colors.alpha[20];

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputContainer, { borderColor }]}>
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}

        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholderTextColor={colors.text.muted}
          selectionColor={colors.accent.gold}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlign="right"
          {...props}
        />

        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
      </View>

      {(error || hint) && (
        <Text style={[styles.hint, error && styles.errorText]}>
          {error || hint}
        </Text>
      )}
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
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderWidth: 1,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
  },
  input: {
    flex: 1,
    fontFamily: fontFamilies.heeboRegular,
    fontSize: 16,
    color: colors.text.primary,
    paddingVertical: spacing.md,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  inputWithRightIcon: {
    paddingRight: spacing.sm,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  hint: {
    ...typography.caption,
    color: colors.text.muted,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  errorText: {
    color: colors.state.error,
  },
});

export default Input;
