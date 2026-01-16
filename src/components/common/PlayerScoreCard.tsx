/**
 * כרטיס שחקן עם ניקוד
 * מציג שם, אווטאר וניקוד בסגנון יוקרתי
 */

import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

import { GlassCard } from './GlassCard';
import { colors, spacing } from '../../theme';

interface Props {
  name: string;
  score: number;
  avatar?: string;
  isActive?: boolean;
  position?: 'left' | 'right';
}

export const PlayerScoreCard: React.FC<Props> = ({
  name,
  score,
  avatar,
  isActive = false,
  position = 'left',
}) => {
  const scaleAnim = useSharedValue(1);

  // Pulse animation when active
  useEffect(() => {
    if (isActive) {
      scaleAnim.value = withSequence(
        withSpring(1.05),
        withSpring(1)
      );
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  const isRight = position === 'right';

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <GlassCard
        intensity={isActive ? 'strong' : 'light'}
        style={[styles.card, isActive && styles.activeCard]}
        noPadding
      >
        <View style={[styles.content, isRight && styles.contentRight]}>
          {/* Avatar */}
          <View style={[styles.avatarContainer, isActive && styles.avatarActive]}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{name.charAt(0)}</Text>
              </View>
            )}
          </View>

          {/* Info */}
          <View style={[styles.info, isRight && styles.infoRight]}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreLabel}>ניקוד</Text>
              <Text style={styles.score}>{score}</Text>
            </View>
          </View>
        </View>

        {/* Active indicator */}
        {isActive && <View style={styles.activeIndicator} />}
      </GlassCard>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 160,
  },
  card: {
    borderRadius: 16,
  },
  activeCard: {
    borderColor: colors.accent.gold,
    borderWidth: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  contentRight: {
    flexDirection: 'row-reverse',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.glass.border,
  },
  avatarActive: {
    borderColor: colors.accent.gold,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.accent.wine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontFamily: 'Heebo-Medium',
    fontSize: 18,
    color: colors.text.primary,
  },
  info: {
    flex: 1,
    alignItems: 'flex-start',
  },
  infoRight: {
    alignItems: 'flex-end',
  },
  name: {
    fontFamily: 'Heebo-Medium',
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  scoreLabel: {
    fontFamily: 'Heebo-Medium',
    fontSize: 9,
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  score: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 20,
    color: colors.accent.gold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: colors.accent.gold,
    borderRadius: 1,
  },
});

export default PlayerScoreCard;
