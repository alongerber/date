/**
 * TypewriterText Component
 *
 * מציג טקסט של ד"ר חריף באפקט מכונת כתיבה
 * כל מילה מופיעה בנפרד עם פאוזות מכוונות
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing } from '@/theme/spacing';

interface TypewriterLine {
  text: string;
  delay: number; // delay after this line in ms
}

interface TypewriterTextProps {
  lines: TypewriterLine[];
  onComplete?: () => void;
  speed?: 'slow' | 'normal' | 'fast';
  style?: ViewStyle;
  textStyle?: TextStyle;
  autoStart?: boolean;
}

const SPEED_MAP = {
  slow: 80,
  normal: 50,
  fast: 30,
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  lines,
  onComplete,
  speed = 'normal',
  style,
  textStyle,
  autoStart = true,
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const fadeAnims = useRef<Animated.Value[]>([]).current;
  const charSpeed = SPEED_MAP[speed];

  // Initialize fade animations for each line
  useEffect(() => {
    lines.forEach((_, index) => {
      if (!fadeAnims[index]) {
        fadeAnims[index] = new Animated.Value(0);
      }
    });
  }, [lines, fadeAnims]);

  // Start typing when autoStart is true
  useEffect(() => {
    if (autoStart && !isTyping && !isComplete && lines.length > 0) {
      setIsTyping(true);
    }
  }, [autoStart, isTyping, isComplete, lines.length]);

  // Typing effect
  useEffect(() => {
    if (!isTyping || isComplete) return;

    const currentLine = lines[currentLineIndex];
    if (!currentLine) {
      setIsComplete(true);
      setIsTyping(false);
      onComplete?.();
      return;
    }

    // Start fade in animation for new line
    if (currentCharIndex === 0 && fadeAnims[currentLineIndex]) {
      Animated.timing(fadeAnims[currentLineIndex], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    // Type next character
    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.text.substring(
            0,
            currentCharIndex + 1
          );
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, charSpeed);

      return () => clearTimeout(timeout);
    }

    // Line complete, wait for delay then move to next line
    if (currentCharIndex >= currentLine.text.length) {
      const timeout = setTimeout(() => {
        if (currentLineIndex < lines.length - 1) {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        } else {
          setIsComplete(true);
          setIsTyping(false);
          onComplete?.();
        }
      }, currentLine.delay);

      return () => clearTimeout(timeout);
    }
  }, [
    isTyping,
    isComplete,
    currentLineIndex,
    currentCharIndex,
    lines,
    charSpeed,
    fadeAnims,
    onComplete,
  ]);

  // Manual start function
  const start = useCallback(() => {
    if (!isTyping && !isComplete) {
      setIsTyping(true);
    }
  }, [isTyping, isComplete]);

  // Reset function
  const reset = useCallback(() => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(false);
    setIsComplete(false);
    fadeAnims.forEach((anim) => anim.setValue(0));
  }, [fadeAnims]);

  return (
    <View style={[styles.container, style]}>
      {displayedLines.map((line, index) => (
        <Animated.View
          key={index}
          style={[
            styles.lineContainer,
            {
              opacity: fadeAnims[index] || 1,
            },
          ]}
        >
          <Text style={[styles.text, textStyle]}>
            {line}
            {index === currentLineIndex && isTyping && (
              <Text style={styles.cursor}>|</Text>
            )}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
  },
  lineContainer: {
    marginBottom: spacing.md,
  },
  text: {
    ...typography.quote,
    color: colors.text.primary,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  cursor: {
    color: colors.accent.gold,
    opacity: 0.7,
  },
});

export default TypewriterText;
