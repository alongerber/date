/**
 * אווטאר ד"ר חריף - עיגול זוהר עם אינדיקטור דיבור
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';

interface Props {
  isSpeaking: boolean;
  size?: number;
}

export const DrCharifAvatar: React.FC<Props> = ({
  isSpeaking,
  size = 80
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;

  // אנימציית נשימה קבועה
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.02,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // אנימציית דיבור
  useEffect(() => {
    if (isSpeaking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.timing(glowAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
      Animated.timing(glowAnim, {
        toValue: 0.3,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isSpeaking]);

  const combinedScale = Animated.multiply(pulseAnim, breatheAnim);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Glow effect */}
      <Animated.View
        style={[
          styles.glow,
          {
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: size * 0.75,
            opacity: glowAnim,
            transform: [{ scale: combinedScale }],
          },
        ]}
      />

      {/* Main avatar */}
      <Animated.View
        style={[
          styles.avatarContainer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: combinedScale }],
          },
        ]}
      >
        <LinearGradient
          colors={[colors.accent.wine, colors.accent.wineLight, colors.accent.wine]}
          style={[styles.avatar, { borderRadius: size / 2 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Inner glow */}
          <View style={[styles.innerGlow, { borderRadius: size / 2 }]} />
        </LinearGradient>
      </Animated.View>

      {/* Speaking indicator dots */}
      {isSpeaking && (
        <View style={styles.speakingIndicator}>
          {[0, 1, 2].map((i) => (
            <SpeakingDot key={i} delay={i * 150} />
          ))}
        </View>
      )}
    </View>
  );
};

const SpeakingDot: React.FC<{ delay: number }> = ({ delay }) => {
  const anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <Animated.View
      style={[
        styles.dot,
        { opacity: anim, transform: [{ scale: anim }] },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    backgroundColor: colors.accent.wine,
  },
  avatarContainer: {
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent.gold,
  },
  innerGlow: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    right: '20%',
    bottom: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  speakingIndicator: {
    position: 'absolute',
    bottom: -20,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.gold,
  },
});

export default DrCharifAvatar;
