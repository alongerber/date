/**
 * משימות - גרסה משמעותית
 *
 * כל משימה חייבת להיות:
 * 1. לא טריוויאלית (לא "חבק 20 שניות")
 * 2. יוצרת רגע של בחירה או פגיעות
 * 3. בלתי נשכחת
 */

export interface Task {
  id: string;
  stage: number;
  difficulty: 1 | 2 | 3;
  text: string;
  textMale?: string;
  textFemale?: string;
  requiresConfirmation: boolean;
  intensity?: 'soft' | 'medium' | 'spicy';
}

export const tasks: Task[] = [
  // ════════════════════════════════════════════
  // שלב 1 - "רגע לפני שנפגשנו"
  // 2-3 משימות
  // ════════════════════════════════════════════

  {
    id: 't1_1',
    stage: 1,
    difficulty: 1,
    text: 'פתח את הגלריה בטלפון, מצא תמונה מלפני שהכרתם, הראה ל{partner} וספר מה עבר לך בראש כשצולמה.',
    requiresConfirmation: true,
  },
  {
    id: 't1_2',
    stage: 1,
    difficulty: 2,
    text: 'תאר ל{partner} את הרגע המדויק שבו הבנת שאתה נופל. לא "מתי התאהבת" - הרגע עצמו.',
    requiresConfirmation: true,
  },

  // ════════════════════════════════════════════
  // שלב 2 - "הרמת כוסית"
  // 5 משימות
  // ════════════════════════════════════════════

  {
    id: 't2_1',
    stage: 2,
    difficulty: 1,
    text: 'הסתכלו אחד לשנייה בעיניים 60 שניות מלאות. בלי לדבר, בלי לצחוק, בלי להסתכל הצידה. מי ששובר קודם - שותה.',
    requiresConfirmation: true,
  },
  {
    id: 't2_2',
    stage: 2,
    difficulty: 1,
    text: 'פתח את ההודעות האחרונות שלך עם {partner}. קרא בקול את ההודעה האחרונה ששלחת שהיא לא עניינית.',
    requiresConfirmation: true,
  },
  {
    id: 't2_3',
    stage: 2,
    difficulty: 2,
    text: 'תן ל{partner} לבחור שיר. תרקדו יחד את כל השיר - גם אם זה מביך, גם אם אתם לא יודעים לרקוד.',
    requiresConfirmation: true,
  },
  {
    id: 't2_4',
    stage: 2,
    difficulty: 2,
    text: 'צלמו סלפי ביחד עכשיו. לפני שאתם מסתכלים עליו, כל אחד ינחש: מה יהיה הדבר הראשון ש{partner} יגיד על התמונה?',
    requiresConfirmation: true,
  },
  {
    id: 't2_5',
    stage: 2,
    difficulty: 2,
    text: 'אמור ל{partner} שלושה דברים שאתה אוהב בו/בה - שלא קשורים למראה, להצלחות, או לדברים שהוא/היא עושה בשבילך.',
    requiresConfirmation: true,
  },

  // ════════════════════════════════════════════
  // שלב 3 - "דברים שלא אומרים בקול"
  // 4 משימות
  // ════════════════════════════════════════════

  {
    id: 't3_1',
    stage: 3,
    difficulty: 2,
    text: 'כתוב הודעה ל{partner} שלא היית שולח בדרך כלל. משהו שאתה חושב ולא אומר. הקרא בקול.',
    requiresConfirmation: true,
  },
  {
    id: 't3_2',
    stage: 3,
    difficulty: 2,
    text: 'השלם את המשפט בקול: "אני מצטער/ת על..." - על משהו שמעולם לא התנצלת עליו.',
    requiresConfirmation: true,
  },
  {
    id: 't3_3',
    stage: 3,
    difficulty: 3,
    text: 'ספר ל{partner} על רגע שהיית צריך אותו/ה ולא אמרת. תאר את הרגע, לא רק את העובדה.',
    requiresConfirmation: true,
  },
  {
    id: 't3_4',
    stage: 3,
    difficulty: 3,
    text: 'יש לך 30 שניות לומר ל{partner} משהו שאתה תמיד רוצה להגיד אבל תמיד עוצר את עצמך. הטיימר רץ - עכשיו.',
    requiresConfirmation: true,
  },

  // ════════════════════════════════════════════
  // שלב 4 - "מלחמת הגירסאות"
  // 2 משימות
  // ════════════════════════════════════════════

  {
    id: 't4_1',
    stage: 4,
    difficulty: 2,
    text: 'בחרו אירוע מהעבר שזוכרים אחרת. כל אחד מספר את הגרסה שלו - דקה אחת, בלי הפרעות. אחר כך: מי צודק?',
    requiresConfirmation: true,
  },
  {
    id: 't4_2',
    stage: 4,
    difficulty: 3,
    text: 'חקה את {partner} כשהוא/היא כועס/ת עליך. אחרי זה, {partner} יתקן אותך.',
    requiresConfirmation: true,
  },

  // ════════════════════════════════════════════
  // שלב 5 - "טמפרטורה עולה"
  // 5-6 משימות לכל רמת עוצמה
  // ════════════════════════════════════════════

  // SOFT
  {
    id: 't5_soft_1',
    stage: 5,
    difficulty: 1,
    text: 'שב/י מול {partner}. סגור עיניים. הוא/היא יגע/תיגע בך בדיוק במקום אחד. נחש איפה - לפני שתפקח עיניים.',
    requiresConfirmation: true,
    intensity: 'soft',
  },
  {
    id: 't5_soft_2',
    stage: 5,
    difficulty: 1,
    text: 'לחש לאוזן של {partner} דבר אחד שאתה רוצה שיקרה הלילה. בלי להסתכל בעיניים.',
    requiresConfirmation: true,
    intensity: 'soft',
  },
  {
    id: 't5_soft_3',
    stage: 5,
    difficulty: 2,
    text: 'נשק את {partner} בדיוק במקום שאתה יודע שמשגע אותו/ה - אבל לא על הפה.',
    requiresConfirmation: true,
    intensity: 'soft',
  },
  {
    id: 't5_soft_4',
    stage: 5,
    difficulty: 2,
    text: 'הורד פריט לבוש אחד מ{partner}. לאט מאוד. בלי לדבר.',
    requiresConfirmation: true,
    intensity: 'soft',
  },

  // MEDIUM
  {
    id: 't5_med_1',
    stage: 5,
    difficulty: 2,
    text: 'תאר ל{partner} בדיוק מה היית עושה לו/לה עכשיו אם לא היה פה משחק. פרטים.',
    requiresConfirmation: true,
    intensity: 'medium',
  },
  {
    id: 't5_med_2',
    stage: 5,
    difficulty: 2,
    text: 'נשק את {partner} כאילו זו הפעם הראשונה. לא כמו שאתה מנשק עכשיו - כמו שנישקת בהתחלה.',
    requiresConfirmation: true,
    intensity: 'medium',
  },
  {
    id: 't5_med_3',
    stage: 5,
    difficulty: 3,
    text: 'קח את היד של {partner} ושים אותה בדיוק במקום שאתה רוצה שהיא תהיה עכשיו.',
    requiresConfirmation: true,
    intensity: 'medium',
  },
  {
    id: 't5_med_4',
    stage: 5,
    difficulty: 3,
    text: 'יש לך 60 שניות להדליק את {partner} בלי לגעת. רק מילים.',
    requiresConfirmation: true,
    intensity: 'medium',
  },

  // SPICY
  {
    id: 't5_spicy_1',
    stage: 5,
    difficulty: 2,
    text: 'הורד מ{partner} שני פריטי לבוש. את/ה בוחר/ת את הסדר.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
  {
    id: 't5_spicy_2',
    stage: 5,
    difficulty: 3,
    text: 'הראה ל{partner} בדיוק מה אתה רוצה עכשיו. בלי מילים כלל.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
  {
    id: 't5_spicy_3',
    stage: 5,
    difficulty: 3,
    text: 'עשה ל{partner} את מה שאתה יודע שהוא/היא הכי אוהב/ת. יש לך דקה להוכיח שאתה יודע.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
  {
    id: 't5_spicy_4',
    stage: 5,
    difficulty: 3,
    text: 'המשחק יכול לחכות. 5 דקות, רק אתם. תחזרו כשתהיו מוכנים.',
    requiresConfirmation: true,
    intensity: 'spicy',
  },
];

// פונקציות עזר
export const formatTask = (task: Task, partnerName: string): string => {
  return task.text.replace(/{partner}/g, partnerName);
};

export const getTasksForStage = (
  stage: number,
  intensity?: 'soft' | 'medium' | 'spicy'
): Task[] => {
  return tasks.filter((t) => {
    if (t.stage !== stage) return false;
    if (stage === 5 && intensity && t.intensity !== intensity) return false;
    return true;
  });
};

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
