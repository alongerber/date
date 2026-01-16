/**
 * אווטאר ד"ר חריף עם 4 הבעות ואנימציות
 * תומך בתמונות עם fallback לגרדיאנט
 */

import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, shadows } from '../../theme';

export type DrCharifExpression = 'listening' | 'speaking' | 'skeptical' | 'approving';

// Try to load images - will fail gracefully if not present
let EXPRESSIONS: Record<DrCharifExpression, ImageSourcePropType | null> = {
  listening: null,
  speaking: null,
  skeptical: null,
  approving: null,
};

// Try to require images (will be null if files don't exist)
try {
  EXPRESSIONS.listening = require('../../../assets/images/drCharif/charif_listening.png');
} catch (e) {}
try {
  EXPRESSIONS.speaking = require('../../../assets/images/drCharif/charif_speaking.png');
} catch (e) {}
try {
  EXPRESSIONS.skeptical = require('../../../assets/images/drCharif/charif_skeptical.png');
} catch (e) {}
try {
  EXPRESSIONS.approving = require('../../../assets/images/drCharif/charif_approving.png');
} catch (e) {}

interface Props {
  expression?: DrCharifExpression;
  isSpeaking?: boolean;
  size?: number;
}

export const DrCharifAvatar: React.FC<Props> = ({
  expression = 'listening',
  isSpeaking = false,
  size = 100,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = EXPRESSIONS[expression] !== null && !imageError;

  // Animations
  const breatheAnim = useSharedValue(0);
  const speakingAnim = useSharedValue(0);
  const glowAnim = useSharedValue(0.3);

  // Breathing animation (always running)
  useEffect(() => {
    breatheAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  // Speaking pulse animation
  useEffect(() => {
    if (isSpeaking) {
      speakingAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        true
      );
      glowAnim.value = withTiming(0.7, { duration: 200 });
    } else {
      speakingAnim.value = withTiming(0, { duration: 200 });
      glowAnim.value = withTiming(0.3, { duration: 300 });
    }
  }, [isSpeaking]);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    const breatheScale = interpolate(breatheAnim.value, [0, 1], [1, 1.015]);
    const speakingScale = interpolate(speakingAnim.value, [0, 1], [1, 1.04]);
    return {
      transform: [{ scale: breatheScale * speakingScale }],
    };
  });

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowAnim.value,
    transform: [
      { scale: interpolate(glowAnim.value, [0.3, 0.7], [1, 1.1]) },
    ],
  }));

  // Expression colors for fallback gradient
  const getExpressionColors = (): [string, string, string] => {
    switch (expression) {
      case 'speaking':
        return [colors.accent.wine, colors.accent.wineLight, colors.accent.wine];
      case 'skeptical':
        return [colors.accent.goldDark, colors.accent.wine, colors.accent.goldDark];
      case 'approving':
        return [colors.accent.gold, colors.accent.goldLight, colors.accent.gold];
      case 'listening':
      default:
        return [colors.accent.wine, colors.accent.wineLight, colors.accent.wine];
    }
  };

  return (
    <View style={[styles.container, { width: size * 1.4, height: size * 1.4 }]}>
      {/* Strong glow effect behind avatar */}
      <Animated.View
        style={[
          styles.glowContainer,
          {
            width: size * 1.6,
            height: size * 1.6,
            borderRadius: size * 0.8,
          },
          glowStyle,
        ]}
      >
        <LinearGradient
          colors={['rgba(114, 47, 55, 0.6)', 'rgba(114, 47, 55, 0.2)', 'transparent']}
          style={styles.glow}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Secondary glow for depth */}
      <Animated.View
        style={[
          styles.secondaryGlow,
          {
            width: size * 1.3,
            height: size * 1.3,
            borderRadius: size * 0.65,
          },
          glowStyle,
        ]}
      >
        <LinearGradient
          colors={[colors.accent.gold, colors.accent.wine, 'transparent']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>

      {/* Avatar container */}
      <Animated.View
        style={[
          styles.avatarContainer,
          { width: size, height: size, borderRadius: size / 2 },
          containerStyle,
        ]}
      >
        {/* Gold ring */}
        <View
          style={[
            styles.ring,
            { width: size + 4, height: size + 4, borderRadius: (size + 4) / 2 },
          ]}
        />

        {/* Avatar - Image or Gradient Fallback */}
        {hasImage && EXPRESSIONS[expression] ? (
          <Image
            source={EXPRESSIONS[expression]!}
            style={[styles.avatarImage, { borderRadius: size / 2 }]}
            resizeMode="cover"
            onError={(e) => {
              console.log('Image failed to load:', e.nativeEvent.error);
              setImageError(true);
            }}
          />
        ) : (
          <LinearGradient
            colors={getExpressionColors()}
            style={[styles.avatar, { borderRadius: size / 2 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Inner glow for fallback */}
            <View style={[styles.innerGlow, { borderRadius: size / 2 }]} />
          </LinearGradient>
        )}
      </Animated.View>

      {/* Speaking indicator */}
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

// Speaking indicator dots
const SpeakingDot: React.FC<{ delay: number }> = ({ delay }) => {
  const anim = useSharedValue(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      anim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 300 }),
          withTiming(0, { duration: 300 })
        ),
        -1,
        true
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 1], [0.3, 1]),
    transform: [{ scale: interpolate(anim.value, [0, 1], [0.8, 1.2]) }],
  }));

  return <Animated.View style={[styles.dot, dotStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  secondaryGlow: {
    position: 'absolute',
    overflow: 'hidden',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.goldGlow,
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: colors.accent.gold,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background.secondary,
  },
  avatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    bottom: 0,
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
