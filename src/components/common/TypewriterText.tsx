/**
 * טקסט עם אפקט הקלדה
 * כל אות מופיעה בנפרד עם קורסור מהבהב
 */

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '../../theme';

interface Props {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay
  style?: TextStyle;
  onStart?: () => void;
  onComplete?: () => void;
  showCursor?: boolean;
}

export const TypewriterText: React.FC<Props> = ({
  text,
  speed = 35,
  delay = 0,
  style,
  onStart,
  onComplete,
  showCursor = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const cursorOpacity = useSharedValue(1);

  // Blinking cursor animation
  useEffect(() => {
    cursorOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 400 }),
        withTiming(1, { duration: 400 })
      ),
      -1,
      true
    );
  }, []);

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: cursorOpacity.value,
  }));

  // Typewriter effect
  useEffect(() => {
    let charIndex = 0;
    let typeInterval: NodeJS.Timeout;
    setDisplayedText('');

    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      onStart?.();

      typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          setDisplayedText(text.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (typeInterval) clearInterval(typeInterval);
    };
  }, [text, speed, delay]);

  return (
    <Text style={[styles.text, style]}>
      {displayedText}
      {showCursor && isTyping && (
        <Animated.Text style={[styles.cursor, cursorStyle]}>|</Animated.Text>
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Heebo-Light',
    fontSize: 24,
    lineHeight: 40,
    color: colors.text.primary,
    textAlign: 'center',
  },
  cursor: {
    color: colors.accent.gold,
    fontWeight: '300',
  },
});

export default TypewriterText;
