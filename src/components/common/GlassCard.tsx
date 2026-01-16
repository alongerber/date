/**
 * כרטיס זכוכית - Glass Morphism
 * האלמנט הויזואלי המרכזי של האפליקציה
 */

import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';

import { colors, borderRadius, shadows } from '../../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'light' | 'medium' | 'strong';
  animated?: boolean;
  noPadding?: boolean;
}

export const GlassCard: React.FC<Props> = ({
  children,
  style,
  intensity = 'medium',
  animated = true,
  noPadding = false,
}) => {
  const intensityMap = {
    light: { blur: 40, opacity: 0.08, bg: 0.06 },
    medium: { blur: 60, opacity: 0.12, bg: 0.08 },
    strong: { blur: 80, opacity: 0.15, bg: 0.12 },
  };

  const { blur, opacity, bg } = intensityMap[intensity];

  const Container = animated ? Animated.View : View;
  const animatedProps = animated ? { entering: FadeIn.duration(400) } : {};

  return (
    <Container style={[styles.container, { backgroundColor: `rgba(255, 255, 255, ${bg})` }, style]} {...animatedProps}>
      {/* Blur background - iOS and Android */}
      {Platform.OS !== 'web' && (
        <BlurView
          intensity={blur}
          style={StyleSheet.absoluteFill}
          tint="dark"
        />
      )}

      {/* Gradient overlay for glass effect */}
      <LinearGradient
        colors={[
          `rgba(255, 255, 255, ${opacity})`,
          `rgba(255, 255, 255, ${opacity * 0.4})`,
        ]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Border glow - stronger */}
      <View style={styles.borderOverlay} />

      {/* Content */}
      <View style={[styles.content, noPadding && styles.noPadding]}>
        {children}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.glass,
  },
  borderOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    padding: 24,
  },
  noPadding: {
    padding: 0,
  },
});

export default GlassCard;
