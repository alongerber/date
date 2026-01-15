/**
 * Zoogit Typography System
 *
 * פונטים: Heebo לעברית, Playfair Display לכותרות
 */

export const fontFamilies = {
  // עברית - Heebo
  heeboLight: 'Heebo-Light',
  heeboRegular: 'Heebo-Regular',
  heeboMedium: 'Heebo-Medium',
  heeboBold: 'Heebo-Bold',

  // כותרות אנגליות - Playfair Display
  playfairRegular: 'PlayfairDisplay-Regular',
  playfairBold: 'PlayfairDisplay-Bold',
  playfairItalic: 'PlayfairDisplay-Italic',
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

// Typography presets for Hebrew text
export const typography = {
  // כותרות
  h1: {
    fontFamily: fontFamilies.heeboBold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights.tight,
  },
  h2: {
    fontFamily: fontFamilies.heeboBold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.tight,
  },
  h3: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.normal,
  },
  h4: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.normal,
  },

  // גוף טקסט
  bodyLarge: {
    fontFamily: fontFamilies.heeboRegular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
  },
  body: {
    fontFamily: fontFamilies.heeboRegular,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.relaxed,
  },
  bodySmall: {
    fontFamily: fontFamilies.heeboRegular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
  },

  // ציטוטים ד"ר חריף
  quote: {
    fontFamily: fontFamilies.heeboLight,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.loose,
    fontStyle: 'italic' as const,
  },
  quoteSmall: {
    fontFamily: fontFamilies.heeboLight,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.relaxed,
    fontStyle: 'italic' as const,
  },

  // כפתורים
  button: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.tight,
  },
  buttonSmall: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.tight,
  },

  // תוויות
  label: {
    fontFamily: fontFamilies.heeboMedium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
  },
  caption: {
    fontFamily: fontFamilies.heeboRegular,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.normal,
  },
} as const;

export type Typography = typeof typography;
