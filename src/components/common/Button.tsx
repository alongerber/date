/**
 * Button Component
 *
 * כפתור עם וריאציות שונות - primary, secondary, ghost, wine
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius, shadows, layout } from '@/theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'wine' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  haptic?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  style,
  textStyle,
  haptic = true,
  fullWidth = false,
}) => {
  const handlePress = async () => {
    if (disabled || loading) return;

    if (haptic) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    onPress();
  };

  const sizeStyles = SIZE_STYLES[size];
  const variantStyles = VARIANT_STYLES[variant];

  const buttonStyle: ViewStyle[] = [
    styles.base,
    sizeStyles.button,
    variantStyles.button,
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const labelStyle: TextStyle[] = [
    styles.label,
    sizeStyles.label,
    variantStyles.label,
    disabled && styles.disabledLabel,
    textStyle,
  ];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          color={variant === 'ghost' || variant === 'outline' ? colors.accent.gold : colors.text.primary}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={labelStyle}>{title}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </>
  );

  // Primary variant with gradient
  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={colors.gradients.gold as unknown as string[]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyles.button, styles.gradient]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Wine variant with gradient
  if (variant === 'wine' && !disabled) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={disabled || loading}
        style={[fullWidth && styles.fullWidth, style]}
      >
        <LinearGradient
          colors={colors.gradients.wine as unknown as string[]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyles.button, styles.gradient]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled || loading}
      style={buttonStyle}
    >
      {content}
    </TouchableOpacity>
  );
};

const SIZE_STYLES = {
  small: {
    button: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      minHeight: 36,
    } as ViewStyle,
    label: {
      ...typography.buttonSmall,
    } as TextStyle,
  },
  medium: {
    button: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      minHeight: layout.buttonHeight,
    } as ViewStyle,
    label: {
      ...typography.button,
    } as TextStyle,
  },
  large: {
    button: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing['2xl'],
      minHeight: 64,
    } as ViewStyle,
    label: {
      ...typography.button,
      fontSize: 18,
    } as TextStyle,
  },
};

const VARIANT_STYLES = {
  primary: {
    button: {
      backgroundColor: colors.accent.gold,
    } as ViewStyle,
    label: {
      color: colors.text.inverse,
    } as TextStyle,
  },
  secondary: {
    button: {
      backgroundColor: colors.background.secondary,
      borderWidth: 1,
      borderColor: colors.accent.gold,
    } as ViewStyle,
    label: {
      color: colors.accent.gold,
    } as TextStyle,
  },
  ghost: {
    button: {
      backgroundColor: 'transparent',
    } as ViewStyle,
    label: {
      color: colors.accent.gold,
    } as TextStyle,
  },
  wine: {
    button: {
      backgroundColor: colors.accent.wine,
    } as ViewStyle,
    label: {
      color: colors.text.primary,
    } as TextStyle,
  },
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.alpha[30],
    } as ViewStyle,
    label: {
      color: colors.text.primary,
    } as TextStyle,
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  gradient: {
    borderRadius: borderRadius.lg,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: colors.text.muted,
  },
});

export default Button;
