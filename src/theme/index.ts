/**
 * Zoogit Theme - "Velvet Lounge" Premium
 *
 * בר יין פרטי בשעה אחת בלילה.
 * Glass morphism, Gold accents, Soft gradients, Intimate lighting, Premium feel
 */

export * from './colors';
export * from './fonts';
export * from './spacing';
export * from './shadows';

import { colors } from './colors';
import { fontFamilies, fontSizes, lineHeights, fontWeights, typography } from './fonts';
import { spacing, borderRadius, layout } from './spacing';
import { shadows } from './shadows';

export const theme = {
  colors,
  fonts: {
    families: fontFamilies,
    sizes: fontSizes,
    lineHeights,
    weights: fontWeights,
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
} as const;

export type Theme = typeof theme;

export default theme;
