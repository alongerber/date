/**
 * טקסט ד"ר חריף - שורה אחת בכל פעם עם אפקט הקלדה
 *
 * העיקרון: כל משפט מחליף את הקודם. לא נערם.
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors } from '@/theme/colors';

interface TextLine {
  text: string;
  delay: number;
}

interface Props {
  lines: TextLine[];
  onLineStart?: (index: number) => void;
  onLineComplete?: (index: number) => void;
  onAllComplete?: () => void;
  typingSpeed?: number;
}

export const DrCharifText: React.FC<Props> = ({
  lines,
  onLineStart,
  onLineComplete,
  onAllComplete,
  typingSpeed = 35,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const currentLine = lines[currentLineIndex];

  useEffect(() => {
    if (!currentLine) return;

    setIsTyping(true);
    setDisplayedText('');
    onLineStart?.(currentLineIndex);

    fadeAnim.setValue(0);
    slideAnim.setValue(15);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    let charIndex = 0;
    const text = currentLine.text;

    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        onLineComplete?.(currentLineIndex);

        if (currentLineIndex < lines.length - 1) {
          setTimeout(() => {
            Animated.parallel([
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }),
              Animated.timing(slideAnim, {
                toValue: -15,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start(() => {
              setCurrentLineIndex(prev => prev + 1);
            });
          }, currentLine.delay);
        } else {
          setTimeout(() => {
            onAllComplete?.();
          }, currentLine.delay);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [currentLineIndex, currentLine]);

  if (!currentLine) return null;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.text}>
          {displayedText}
          {isTyping && <Text style={styles.cursor}>|</Text>}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Heebo-Light',
    fontSize: 22,
    lineHeight: 36,
    color: colors.text.primary,
    textAlign: 'center',
  },
  cursor: {
    color: colors.accent.gold,
    fontWeight: '100',
  },
});

export default DrCharifText;
