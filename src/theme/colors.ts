/**
 * פלטת צבעים פרימיום - זוגיט
 * מבוסס על אווירת בר יין אינטימי
 *
 * "בר יין יוקרתי ב-1 בלילה" - אינטימית, מתוחכמת, חמה.
 */

export const colors = {
  // רקעים - גרדיאנטים עמוקים
  background: {
    primary: '#0D0714',      // סגול-שחור עמוק (הבסיס)
    secondary: '#1A0F24',    // סגול כהה
    tertiary: '#251635',     // סגול בינוני לאלמנטים
    card: 'rgba(255, 255, 255, 0.05)', // זכוכית שקופה
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    overlay: 'rgba(13, 7, 20, 0.9)', // שכבת overlay
  },

  // Glass Morphism
  glass: {
    background: 'rgba(255, 255, 255, 0.08)',
    backgroundStrong: 'rgba(255, 255, 255, 0.12)',
    border: 'rgba(255, 255, 255, 0.15)',
    borderLight: 'rgba(255, 255, 255, 0.08)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },

  // אקסנטים - זהב וורוד
  accent: {
    gold: '#D4A574',         // זהב חמים (ראשי)
    goldLight: '#E8C9A0',    // זהב בהיר
    goldDark: '#B8956A',     // זהב כהה
    wine: '#722F37',         // בורדו/יין
    wineLight: '#8B3D47',    // בורדו בהיר
    rose: '#C97B84',         // ורוד עתיק
    lavender: '#9D8CA1',     // סגול לבנדר
  },

  // טקסט
  text: {
    primary: '#FFFFFF',       // לבן מלא לכותרות
    secondary: 'rgba(255, 255, 255, 0.85)', // לבן רך לגוף
    tertiary: 'rgba(255, 255, 255, 0.6)',   // לבן עמום למשני
    muted: 'rgba(255, 255, 255, 0.4)',      // עמום מאוד
    gold: '#D4A574',          // זהב לדגשים
    inverse: '#0D0714',       // לטקסט על רקע בהיר
  },

  // מצבים
  status: {
    success: '#4CAF50',
    error: '#E57373',
    warning: '#FFB74D',
    info: '#5B6B8A',
  },

  // גרדיאנטים (לשימוש עם LinearGradient)
  gradients: {
    background: ['#0D0714', '#1A0F24', '#0D0714'],
    card: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'],
    gold: ['#D4A574', '#E8C9A0', '#D4A574'],
    button: ['#D4A574', '#B8956A'],
    glow: ['rgba(212,165,116,0.3)', 'rgba(212,165,116,0)'],
    wine: ['#722F37', '#4A1D2E'],
  },

  // רמות תעוזה
  difficulty: {
    easy: '#4A7C59',       // ירוק עמום - קל
    medium: '#9E7B4F',     // כתום עמום - בינוני
    hard: '#8B3D48',       // אדום עמום - אמיץ
  },

  // אפקטים
  effects: {
    glow: 'rgba(212, 165, 116, 0.3)',  // זוהר זהב
    shadow: 'rgba(0, 0, 0, 0.5)',       // צל
    glass: 'rgba(255, 255, 255, 0.05)', // glassmorphism
  },

  // שקיפויות
  alpha: {
    10: 'rgba(255, 255, 255, 0.1)',
    20: 'rgba(255, 255, 255, 0.2)',
    30: 'rgba(255, 255, 255, 0.3)',
    50: 'rgba(255, 255, 255, 0.5)',
  },
} as const;

export type ColorTheme = typeof colors;
export default colors;
