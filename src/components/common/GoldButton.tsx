/**
 * כפתור זהב פרימיום
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { colors, typography, borderRadius, shadows } from '../../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const GoldButton: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  icon,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = async () => {
    if (disabled || loading) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const sizeStyles = {
    small: { paddingVertical: 10, paddingHorizontal: 20 },
    medium: { paddingVertical: 14, paddingHorizontal: 28 },
    large: { paddingVertical: 18, paddingHorizontal: 36 },
  };

  if (variant === 'primary') {
    return (
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[animatedStyle, style]}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={disabled ? ['#666', '#555'] : [colors.accent.gold, colors.accent.goldDark]}
          style={[styles.primary, sizeStyles[size], disabled && styles.disabled]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {loading ? (
            <ActivityIndicator color={colors.background.primary} />
          ) : (
            <View style={styles.contentRow}>
              {icon}
              <Text style={[styles.primaryText, icon && styles.textWithIcon]}>
                {title}
              </Text>
            </View>
          )}
        </LinearGradient>
      </AnimatedTouchable>
    );
  }

  if (variant === 'secondary') {
    return (
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[animatedStyle, styles.secondary, sizeStyles[size], style]}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color={colors.accent.gold} />
        ) : (
          <View style={styles.contentRow}>
            {icon}
            <Text style={[styles.secondaryText, icon && styles.textWithIcon]}>
              {title}
            </Text>
          </View>
        )}
      </AnimatedTouchable>
    );
  }

  // Ghost variant
  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[animatedStyle, styles.ghost, sizeStyles[size], style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.tertiary} />
      ) : (
        <View style={styles.contentRow}>
          {icon}
          <Text style={[styles.ghostText, icon && styles.textWithIcon]}>
            {title}
          </Text>
        </View>
      )}
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  primary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    ...shadows.goldGlow,
  },
  primaryText: {
    fontFamily: 'Heebo-Medium',
    fontSize: 16,
    color: colors.background.primary,
    letterSpacing: 0.5,
  },
  secondary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: colors.accent.gold,
    backgroundColor: 'transparent',
  },
  secondaryText: {
    fontFamily: 'Heebo-Regular',
    fontSize: 16,
    color: colors.accent.gold,
  },
  ghost: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostText: {
    fontFamily: 'Heebo-Regular',
    fontSize: 16,
    color: colors.text.tertiary,
  },
  disabled: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWithIcon: {
    marginLeft: 8,
  },
});

export default GoldButton;
