/**
 * Zoogit Spacing System
 *
 * מרווחים ומימדים לעיצוב עקבי
 */

export const spacing = {
  // מרווחים בסיסיים
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
  '7xl': 80,
  '8xl': 96,
} as const;

export const borderRadius = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 24,
  full: 9999,
} as const;

// Layout constants
export const layout = {
  screenPadding: spacing.xl,
  cardPadding: spacing.lg,
  contentMaxWidth: 400,
  headerHeight: 60,
  buttonHeight: 56,
  inputHeight: 52,
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
