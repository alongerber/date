/**
 * Zoogit Color Palette - "Velvet Lounge" Theme
 *
 * בר יין פרטי בשעה אחת בלילה.
 * וילונות קטיפה, תאורה חלשה, כוס יין שמשקפת אור נר.
 */

export const colors = {
  // רקעים
  background: {
    primary: '#12081C',    // סגול-שחור עמוק - רקע ראשי
    secondary: '#1E1028',  // סגול חצי לילה - רקע משני
    tertiary: '#2A1A38',   // סגול כהה - לכרטיסים
    overlay: 'rgba(18, 8, 28, 0.9)', // שכבת overlay
  },

  // טקסט
  text: {
    primary: '#F7F3E8',    // שמנת חמה - טקסט ראשי
    secondary: '#9D8CA1',  // סגול לבנדר עמום - טקסט משני
    muted: '#6B5B7A',      // סגול עמום - טקסט מושתק
    inverse: '#12081C',    // לטקסט על רקע בהיר
  },

  // אקסנטים
  accent: {
    gold: '#C9A87C',       // זהב ורוד (Rosé Gold) - אקסנט ראשי
    goldLight: '#D9C4A8',  // זהב בהיר
    goldDark: '#A88B5E',   // זהב כהה
    wine: '#6B2D42',       // בורדו יין - הדגשה
    wineLight: '#8B4D62',  // בורדו בהיר
    lavender: '#9D8CA1',   // סגול לבנדר
  },

  // מצבים
  state: {
    success: '#4A7C59',    // ירוק עמום
    error: '#8B3D48',      // אדום עמום
    warning: '#9E7B4F',    // כתום עמום
    info: '#5B6B8A',       // כחול עמום
  },

  // אפקטים
  effects: {
    glow: 'rgba(201, 168, 124, 0.3)',  // זוהר זהב
    shadow: 'rgba(0, 0, 0, 0.5)',       // צל
    glass: 'rgba(255, 255, 255, 0.05)', // glassmorphism
  },

  // גרדיאנטים
  gradients: {
    primary: ['#12081C', '#1E1028'],
    card: ['#1E1028', '#2A1A38'],
    gold: ['#C9A87C', '#A88B5E'],
    wine: ['#6B2D42', '#4A1D2E'],
  },

  // רמות תעוזה
  difficulty: {
    easy: '#4A7C59',       // ירוק עמום - קל
    medium: '#9E7B4F',     // כתום עמום - בינוני
    hard: '#8B3D48',       // אדום עמום - אמיץ
  },

  // שקיפויות
  alpha: {
    10: 'rgba(247, 243, 232, 0.1)',
    20: 'rgba(247, 243, 232, 0.2)',
    30: 'rgba(247, 243, 232, 0.3)',
    50: 'rgba(247, 243, 232, 0.5)',
  },
} as const;

export type ColorTheme = typeof colors;
