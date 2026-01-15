/**
 * החוויה המלאה של ד"ר חריף
 * משלב אווטאר + טקסט + אווירה
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { DrCharifAvatar } from './DrCharifAvatar';
import { DrCharifText } from './DrCharifText';
import { colors } from '@/theme/colors';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface TextLine {
  text: string;
  delay: number;
}

interface Props {
  lines: TextLine[];
  onComplete?: () => void;
  showAvatar?: boolean;
  variant?: 'fullscreen' | 'inline';
}

export const DrCharifExperience: React.FC<Props> = ({
  lines,
  onComplete,
  showAvatar = true,
  variant = 'fullscreen',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(true);

  const handleLineStart = useCallback((index: number) => {
    setIsSpeaking(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  const handleLineComplete = useCallback((index: number) => {
    setIsSpeaking(false);
  }, []);

  const handleAllComplete = useCallback(() => {
    setIsSpeaking(false);
    onComplete?.();
  }, [onComplete]);

  const content = (
    <View style={styles.content}>
      {showAvatar && (
        <View style={styles.avatarSection}>
          <DrCharifAvatar isSpeaking={isSpeaking} size={80} />
        </View>
      )}

      <View style={styles.textSection}>
        <DrCharifText
          lines={lines}
          onLineStart={handleLineStart}
          onLineComplete={handleLineComplete}
          onAllComplete={handleAllComplete}
        />
      </View>
    </View>
  );

  if (variant === 'inline') {
    return <View style={styles.inlineContainer}>{content}</View>;
  }

  return (
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary, colors.background.primary]}
      style={styles.fullscreenContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* Ambient glow effect */}
      <View style={styles.ambientGlow} />

      {content}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineContainer: {
    paddingVertical: 40,
  },
  ambientGlow: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.3,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.accent.wine,
    opacity: 0.1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  avatarSection: {
    marginBottom: 48,
  },
  textSection: {
    width: '100%',
  },
});

export default DrCharifExperience;
