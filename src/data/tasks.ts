/**
 * Tasks Data - משימות לשלבים 1-5
 *
 * משימות פיזיות שדורשות אישור של בן/בת הזוג
 */

export interface Task {
  id: string;
  stage: number;
  difficulty: 1 | 2 | 3;
  text: string;
  textMale?: string;
  textFemale?: string;
  requiresConfirmation: boolean;
  intensity?: 'soft' | 'medium' | 'spicy'; // רק לשלב 5
}

export const tasks: Task[] = [
  // שלב 1 - רגע לפני שנפגשנו (8 פריטים, 30% משימות = ~2-3)
  {
    id: 't1_1',
    stage: 1,
    difficulty: 1,
    text: 'ספר/י ל{partner} משהו שאהבת לעשות לפני שהכרתם ולא עשית כבר הרבה זמן.',
    requiresConfirmation: true,
  },
  {
    id: 't1_2',
    stage: 1,
    difficulty: 2,
    text: 'תראה/י ל{partner} תמונה מהתקופה לפני שהכרתם וספר/י מה עבר לך בראש כשצולמת.',
    requiresConfirmation: true,
  },

  // שלב 2 - הרמת כוסית (8 פריטים, 60% משימות = ~5)
  {
    id: 't2_1',
    stage: 2,
    difficulty: 1,
    text: 'קחו צ׳ופצ׳יק ביחד. מי שמסיים אחרון שותה עוד אחד.',
    requiresConfirmation: true,
  },
  {
    id: 't2_2',
    stage: 2,
    difficulty: 1,
    text: 'הסתכלו אחד לשנייה בעיניים 30 שניות בלי לדבר. בלי לצחוק.',
    requiresConfirmation: true,
  },
  {
    id: 't2_3',
    stage: 2,
    difficulty: 1,
    text: 'תגיד/י ל{partner} שלושה דברים שאת/ה אוהב/ת בו/בה שלא קשורים לאיך שהוא/היא נראה.',
    requiresConfirmation: true,
  },
  {
    id: 't2_4',
    stage: 2,
    difficulty: 2,
    text: 'עשו יחד סלפי שמתאר את הזוגיות שלכם עכשיו. בלי לדבר על זה קודם.',
    requiresConfirmation: true,
  },
  {
    id: 't2_5',
    stage: 2,
    difficulty: 2,
    text: 'חבק/י את {partner} לפחות 20 שניות. בלי לדבר.',
    requiresConfirmation: true,
  },

  // שלב 3 - דברים שלא אומרים בקול (8 פריטים, 50% משימות = 4)
  {
    id: 't3_1',
    stage: 3,
    difficulty: 2,
    text: 'תגיד/י ל{partner} משהו שאתה מתבייש להגיד בדרך כלל. מתחיל ב"אני מודה ש..."',
    requiresConfirmation: true,
  },
  {
    id: 't3_2',
    stage: 3,
    difficulty: 2,
    text: 'כתוב/י הודעה ל{partner} שאת/ה לא היית שולח/ת בדרך כלל. תקריא/י בקול.',
    requiresConfirmation: true,
  },
  {
    id: 't3_3',
    stage: 3,
    difficulty: 3,
    text: 'ספר/י ל{partner} על רגע שהיית צריך/ה אותו/ה ולא אמרת.',
    requiresConfirmation: true,
  },
  {
    id: 't3_4',
    stage: 3,
    difficulty: 3,
    text: 'תאר/י מה את/ה מרגיש/ה עכשיו בשלוש מילים בלבד. הסבר/י למה.',
    requiresConfirmation: true,
  },

  // שלב 4 - מלחמת הגירסאות (8 פריטים, 20% משימות = ~2)
  {
    id: 't4_1',
    stage: 4,
    difficulty: 2,
    text: 'חקה/י את {partner} כשהוא/היא כועס/ת. תן/י לו/לה לתקן אותך.',
    requiresConfirmation: true,
  },
  {
    id: 't4_2',
    stage: 4,
    difficulty: 2,
    text: 'תגיד/י ל{partner} במה הוא/היא צודק/ת לגמרי בריב האחרון שלכם.',
    requiresConfirmation: true,
  },

  // שלב 5 - טמפרטורה עולה (8 פריטים, 70% משימות = ~5-6)
  // Soft intensity
  {
    id: 't5_soft_1',
    stage: 5,
    difficulty: 1,
    text: 'נשק/י את הצוואר של {partner} לאט במשך 10 שניות.',
    requiresConfirmation: true,
    intensity: 'soft',
  },
  {
    id: 't5_soft_2',
    stage: 5,
    difficulty: 1,
    text: 'לחש/י משהו אינטימי לאוזן של {partner}.',
    requiresConfirmation: true,
    intensity: 'soft',
  },
  {
    id: 't5_soft_3',
    stage: 5,
    difficulty: 2,
    text: 'הוריד/י פריט לבוש אחד של {partner}. לאט.',
    requiresConfirmation: true,
    intensity: 'soft',
  },
  {
    id: 't5_soft_4',
    stage: 5,
    difficulty: 2,
    text: 'עשה/י עיסוי כתפיים ל{partner} במשך דקה. בלי להפסיק.',
    requiresConfirmation: true,
    intensity: 'soft',
  },

  // Medium intensity
  {
    id: 't5_med_1',
    stage: 5,
    difficulty: 2,
    text: 'תאר/י ל{partner} מה היית עושה לו/לה עכשיו אם לא היה פה משחק.',
    requiresConfirmation: true,
    intensity: 'medium',
  },
  {
    id: 't5_med_2',
    stage: 5,
    difficulty: 2,
    text: 'נשק/י את {partner} כמו שנישקת אותו/ה בפעם הראשונה.',
    requiresConfirmation: true,
    intensity: 'medium',
  },
  {
    id: 't5_med_3',
    stage: 5,
    difficulty: 3,
    text: 'תגיד/י ל{partner} איפה בדיוק את/ה רוצה שיגע/תיגע בך עכשיו.',
    requiresConfirmation: true,
    intensity: 'medium',
  },
  {
    id: 't5_med_4',
    stage: 5,
    difficulty: 3,
    text: 'מצא/י נקודה בגוף של {partner} שאת/ה יודע/ת שמשגעת אותו/ה. תוכיח/י.',
    requiresConfirmation: true,
    intensity: 'medium',
  },

  // Spicy intensity
  {
    id: 't5_spicy_1',
    stage: 5,
    difficulty: 2,
    text: 'הוריד/י שני פריטי לבוש של {partner}. באיזה סדר שאת/ה רוצה.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
  {
    id: 't5_spicy_2',
    stage: 5,
    difficulty: 3,
    text: 'תראה/י ל{partner} בדיוק מה את/ה רוצה עכשיו. בלי מילים.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
  {
    id: 't5_spicy_3',
    stage: 5,
    difficulty: 3,
    text: 'תעשה/י ל{partner} את מה שאת/ה יודע/ת שהוא/היא הכי אוהב/ת.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
  {
    id: 't5_spicy_4',
    stage: 5,
    difficulty: 3,
    text: 'המשחק יכול לחכות. תקחו 5 דקות. רק אתם.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
];

// פונקציה להחלפת {partner} בשם האמיתי
export const formatTask = (task: Task, partnerName: string): string => {
  return task.text.replace(/{partner}/g, partnerName);
};

// קבלת משימות לשלב מסוים
export const getTasksForStage = (stage: number, intensity?: 'soft' | 'medium' | 'spicy'): Task[] => {
  return tasks.filter((t) => {
    if (t.stage !== stage) return false;
    if (stage === 5 && intensity && t.intensity !== intensity) return false;
    return true;
  });
};

// קבלת משימה אקראית
export const getRandomTask = (
  stage: number,
  difficulty: 1 | 2 | 3,
  excludeIds: string[] = [],
  intensity?: 'soft' | 'medium' | 'spicy'
): Task | null => {
  const available = tasks.filter((t) => {
    if (t.stage !== stage) return false;
    if (t.difficulty !== difficulty) return false;
    if (excludeIds.includes(t.id)) return false;
    if (stage === 5 && intensity && t.intensity !== intensity) return false;
    return true;
  });

  if (available.length === 0) return null;

  return available[Math.floor(Math.random() * available.length)];
};
