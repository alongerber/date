/**
 * בועת דיבור של ד"ר חריף
 * טקסט שמתחלף (לא נערם) עם אפקט הקלדה
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { GlassCard } from '../common/GlassCard';
import { TypewriterText } from '../common/TypewriterText';
import { colors } from '../../theme';

interface SpeechLine {
  text: string;
  pauseAfter?: number; // ms to wait after this line
}

interface Props {
  lines: SpeechLine[];
  onLineStart?: (index: number) => void;
  onLineComplete?: (index: number) => void;
  onAllComplete?: () => void;
  typingSpeed?: number;
}

export const DrCharifSpeech: React.FC<Props> = ({
  lines,
  onLineStart,
  onLineComplete,
  onAllComplete,
  typingSpeed = 35,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [key, setKey] = useState(0); // Force re-render of TypewriterText

  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  const currentLine = lines[currentLineIndex];

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const goToNextLine = useCallback(() => {
    if (currentLineIndex < lines.length - 1) {
      // Animate out
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(-15, { duration: 200 });

      setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setKey((prev) => prev + 1);

        // Animate in
        translateY.value = 15;
        opacity.value = withTiming(1, { duration: 300 });
        translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
      }, 200);
    } else {
      onAllComplete?.();
    }
  }, [currentLineIndex, lines.length, onAllComplete]);

  const handleLineComplete = useCallback(() => {
    onLineComplete?.(currentLineIndex);

    const pauseDuration = currentLine?.pauseAfter ?? 1500;
    setTimeout(goToNextLine, pauseDuration);
  }, [currentLineIndex, currentLine, goToNextLine, onLineComplete]);

  const handleLineStart = useCallback(() => {
    onLineStart?.(currentLineIndex);
  }, [currentLineIndex, onLineStart]);

  if (!currentLine) return null;

  return (
    <GlassCard intensity="medium" style={styles.container}>
      <Text style={styles.label}>ד״ר חריף:</Text>

      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <TypewriterText
          key={key}
          text={currentLine.text}
          speed={typingSpeed}
          style={styles.speechText}
          onStart={handleLineStart}
          onComplete={handleLineComplete}
          showCursor={true}
        />
      </Animated.View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    minHeight: 140,
  },
  label: {
    fontFamily: 'Heebo-Medium',
    fontSize: 14,
    color: colors.accent.gold,
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'right',
  },
  textContainer: {
    minHeight: 80,
    justifyContent: 'center',
  },
  speechText: {
    fontFamily: 'Heebo-Light',
    fontSize: 24,
    lineHeight: 40,
    color: colors.text.primary,
    textAlign: 'center',
  },
});

export default DrCharifSpeech;
