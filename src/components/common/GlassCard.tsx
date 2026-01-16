/**
 * כרטיס זכוכית - Glass Morphism
 * האלמנט הויזואלי המרכזי של האפליקציה
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
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
    light: { opacity: 0.05 },
    medium: { opacity: 0.08 },
    strong: { opacity: 0.12 },
  };

  const { opacity } = intensityMap[intensity];

  const Container = animated ? Animated.View : View;
  const animatedProps = animated ? { entering: FadeIn.duration(400) } : {};

  return (
    <Container style={[styles.container, style]} {...animatedProps}>
      {/* Gradient overlay */}
      <LinearGradient
        colors={[
          `rgba(255, 255, 255, ${opacity})`,
          `rgba(255, 255, 255, ${opacity * 0.5})`,
        ]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Border glow */}
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
    backgroundColor: colors.glass.background,
    ...shadows.glass,
  },
  borderOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  content: {
    padding: 24,
  },
  noPadding: {
    padding: 0,
  },
});

export default GlassCard;
