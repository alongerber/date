/**
 * Prizes Data - פרסי גלגל המזל
 *
 * 15 פרסים למנצח
 */

export interface Prize {
  id: number;
  name: string;
  description: string;
  intensity: 1 | 2 | 3;
  category: string;
  emoji: string;
}

export const prizes: Prize[] = [
  {
    id: 1,
    name: 'השבוע שלי',
    description: 'המנצח בוחר יום בשבוע הקרוב. באותו יום, כל החלטה עליו.',
    intensity: 2,
    category: 'שליטה',
    emoji: '📅',
  },
  {
    id: 2,
    name: 'הקעקוע',
    description: 'קעקוע זמני במקום שהמנצח בוחר. נשאר שבוע.',
    intensity: 2,
    category: 'גוף',
    emoji: '🎨',
  },
  {
    id: 3,
    name: 'המצלמה',
    description: 'המנצח מצלם 3 תנוחות שהוא בוחר.',
    intensity: 3,
    category: 'אינטימי',
    emoji: '📸',
  },
  {
    id: 4,
    name: 'החוזה',
    description: 'המפסיד חותם על מחויבות לחודש הקרוב.',
    intensity: 2,
    category: 'מחויבות',
    emoji: '📝',
  },
  {
    id: 5,
    name: 'הכרטיס השחור',
    description: 'פעם בחודש המנצח אומר "עכשיו" והמפסיד בא.',
    intensity: 3,
    category: 'כוח',
    emoji: '🃏',
  },
  {
    id: 6,
    name: 'הבמה',
    description: 'פוסט ציבורי שהמנצח מכתיב.',
    intensity: 2,
    category: 'פומבי',
    emoji: '📱',
  },
  {
    id: 7,
    name: 'ללא ידיים',
    description: 'שעה בלי ידיים, המנצח מאכיל ומשקה.',
    intensity: 2,
    category: 'משחק',
    emoji: '🙌',
  },
  {
    id: 8,
    name: 'הבוקר שאחרי',
    description: 'המנצח ישן כמה שרוצה, המפסיד מכין הכל.',
    intensity: 1,
    category: 'פינוק',
    emoji: '☀️',
  },
  {
    id: 9,
    name: 'הפנטזיה',
    description: 'המנצח מתאר פנטזיה, שבועיים להגשים.',
    intensity: 3,
    category: 'אינטימי',
    emoji: '💭',
  },
  {
    id: 10,
    name: 'הארנק הפתוח',
    description: 'קניות - פריט אחד ללא תקרה.',
    intensity: 2,
    category: 'כסף',
    emoji: '💰',
  },
  {
    id: 11,
    name: 'ההקלטה',
    description: 'הודעה קולית של דקה שהמנצח מכתיב.',
    intensity: 1,
    category: 'רגשי',
    emoji: '🎤',
  },
  {
    id: 12,
    name: '24 שעות',
    description: 'יממה שהמפסיד לא יכול להגיד "לא".',
    intensity: 3,
    category: 'שליטה',
    emoji: '⏰',
  },
  {
    id: 13,
    name: 'הדלת נעולה',
    description: 'ערב בלי טלפונים - שניהם.',
    intensity: 1,
    category: 'חוויה',
    emoji: '🚪',
  },
  {
    id: 14,
    name: 'הבישול',
    description: 'ארוחת 3 מנות, המנצח בוחר תפריט.',
    intensity: 2,
    category: 'שירות',
    emoji: '👨‍🍳',
  },
  {
    id: 15,
    name: 'המפתח',
    description: 'פעם בחודש המנצח קורא כל שיחה בטלפון.',
    intensity: 3,
    category: 'אמון',
    emoji: '🔑',
  },
];

// קבלת פרס אקראי
export const getRandomPrize = (): Prize => {
  const index = Math.floor(Math.random() * prizes.length);
  return prizes[index];
};

// קבלת פרס לפי ID
export const getPrizeById = (id: number): Prize | undefined => {
  return prizes.find((p) => p.id === id);
};

// קבלת כל הפרסים לפי עוצמה
export const getPrizesByIntensity = (intensity: 1 | 2 | 3): Prize[] => {
  return prizes.filter((p) => p.intensity === intensity);
};
