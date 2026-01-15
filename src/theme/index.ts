/**
 * Zoogit Theme - "Velvet Lounge"
 *
 * בר יין פרטי בשעה אחת בלילה.
 * וילונות קטיפה, תאורה חלשה, כוס יין שמשקפת אור נר.
 * יוקרה שקטה עם חום.
 */

export * from './colors';
export * from './fonts';
export * from './spacing';

import { colors } from './colors';
import { fontFamilies, fontSizes, lineHeights, fontWeights, typography } from './fonts';
import { spacing, borderRadius, shadows, layout } from './spacing';

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
