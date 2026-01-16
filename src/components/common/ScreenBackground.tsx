/**
 * רקע מסך עם גרדיאנט ואלמנטים דקורטיביים
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

import { colors } from '../../theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Props {
  children: React.ReactNode;
  variant?: 'default' | 'glow' | 'minimal';
}

export const ScreenBackground: React.FC<Props> = ({
  children,
  variant = 'default',
}) => {
  // Subtle floating animation for glow
  const floatAnim = useSharedValue(0);

  useEffect(() => {
    floatAnim.value = withRepeat(
      withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnim.value, [0, 1], [-10, 10]) },
      { scale: interpolate(floatAnim.value, [0, 1], [1, 1.05]) },
    ],
    opacity: interpolate(floatAnim.value, [0, 1], [0.4, 0.6]),
  }));

  return (
    <View style={styles.container}>
      {/* Base gradient */}
      <LinearGradient
        colors={colors.gradients.background as unknown as string[]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Ambient glow orb */}
      {variant !== 'minimal' && (
        <Animated.View style={[styles.glowOrb, glowStyle]} />
      )}

      {/* Decorative lines */}
      {variant === 'glow' && (
        <>
          <View style={[styles.decorLine, styles.decorLineLeft]} />
          <View style={[styles.decorLine, styles.decorLineRight]} />
        </>
      )}

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  glowOrb: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.25,
    left: SCREEN_WIDTH * 0.5 - 150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.accent.wine,
    opacity: 0.3,
  },
  decorLine: {
    position: 'absolute',
    width: 100,
    height: 1,
    backgroundColor: colors.accent.gold,
    opacity: 0.2,
  },
  decorLineLeft: {
    bottom: 150,
    left: -30,
    transform: [{ rotate: '45deg' }],
  },
  decorLineRight: {
    bottom: 150,
    right: -30,
    transform: [{ rotate: '-45deg' }],
  },
  content: {
    flex: 1,
  },
});

export default ScreenBackground;
