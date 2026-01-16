/**
 * טיפוגרפיה פרימיום
 * עברית: Heebo (נקי, מודרני)
 * דגשים: Playfair Display (אלגנטי, יוקרתי)
 */

import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export const fontFamilies = {
  // עברית
  heeboLight: 'Heebo-Light',
  heeboRegular: 'Heebo-Regular',
  heeboMedium: 'Heebo-Medium',
  heeboBold: 'Heebo-Bold',

  // אנגלית/מספרים יוקרתיים
  playfairRegular: 'PlayfairDisplay-Regular',
  playfairBold: 'PlayfairDisplay-Bold',
  playfairItalic: 'PlayfairDisplay-Italic',
};

export const typography = StyleSheet.create({
  // כותרות
  heroTitle: {
    fontFamily: fontFamilies.heeboLight,
    fontSize: 36,
    lineHeight: 48,
    color: colors.text.primary,
    textAlign: 'center',
    letterSpacing: 1,
  },

  screenTitle: {
    fontFamily: fontFamilies.heeboBold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.text.primary,
    textAlign: 'center',
  },

  sectionTitle: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: 20,
    lineHeight: 28,
    color: colors.text.primary,
  },

  // גוף טקסט
  bodyLarge: {
    fontFamily: fontFamilies.heeboLight,
    fontSize: 22,
    lineHeight: 34,
    color: colors.text.secondary,
    textAlign: 'center',
  },

  body: {
    fontFamily: fontFamilies.heeboRegular,
    fontSize: 16,
    lineHeight: 26,
    color: colors.text.secondary,
  },

  bodySmall: {
    fontFamily: fontFamilies.heeboRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.text.tertiary,
  },

  // דגשים
  accent: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: 16,
    color: colors.accent.gold,
  },

  // תוויות
  label: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: 12,
    lineHeight: 16,
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },

  // כפתורים
  button: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: 16,
    color: colors.background.primary,
    letterSpacing: 0.5,
  },

  buttonSecondary: {
    fontFamily: fontFamilies.heeboRegular,
    fontSize: 16,
    color: colors.text.primary,
  },

  // מספרים (עם פונט אלגנטי)
  number: {
    fontFamily: fontFamilies.playfairRegular,
    fontSize: 32,
    color: colors.accent.gold,
  },

  numberLarge: {
    fontFamily: fontFamilies.playfairBold,
    fontSize: 48,
    color: colors.accent.gold,
  },

  // שם משתמש
  playerName: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: 18,
    color: colors.text.primary,
  },

  // ד"ר חריף
  drCharifSpeech: {
    fontFamily: fontFamilies.heeboLight,
    fontSize: 24,
    lineHeight: 40,
    color: colors.text.primary,
    textAlign: 'center',
  },

  drCharifLabel: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: 14,
    color: colors.accent.gold,
    letterSpacing: 1,
  },
});

export default typography;
