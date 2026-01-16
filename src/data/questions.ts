/**
 * שאלות - גרסה פסיכולוגית עמוקה
 *
 * 10 קטגוריות × שאלות מדורגות
 * כל שאלה עברה מבחן: "האם זה יגרום לשתיקה של 5 שניות לפני התשובה?"
 */

export type QuestionCategory =
  | 'time_machine'      // עבר/עתיד עם טוויסט
  | 'parallel_worlds'   // תרחישי "מה אם"
  | 'body_soul'         // אינטימיות דרך עקיפין
  | 'money_talks'       // ערכים דרך כסף
  | 'social_judgment'   // איך אחרים רואים אותנו
  | 'small_secrets'     // דברים שעדיין לא נאמרו
  | 'ego_war'          // תחרותיות ואגו
  | 'fears_desires'     // פחדים ורצונות עמוקים
  | 'small_things'      // הקטנות שהורגות
  | 'one_night';        // פנטזיות ספציפיות

export interface Question {
  id: string;
  stage: number;
  category: QuestionCategory;
  difficulty: 1 | 2 | 3;
  text: string;
  textMale?: string;
  textFemale?: string;
  followUp?: string;
}

export const questions: Question[] = [
  // ════════════════════════════════════════════
  // שלב 1 - "רגע לפני שנפגשנו"
  // נושא: מי היינו לפני, ומה נשאר
  // 8 פריטים (70% שאלות = 5-6 שאלות)
  // ════════════════════════════════════════════

  {
    id: 'q1_1',
    stage: 1,
    category: 'time_machine',
    difficulty: 1,
    text: 'אם הייתי פוגש אותך בגיל 16 - הייתי מוצא חן בעיניך?',
    followUp: 'למה כן או למה לא?',
  },
  {
    id: 'q1_2',
    stage: 1,
    category: 'small_secrets',
    difficulty: 2,
    text: 'מה הדבר שחשבת עליי בשבועות הראשונים ולא העזת להגיד עד היום?',
  },
  {
    id: 'q1_3',
    stage: 1,
    category: 'parallel_worlds',
    difficulty: 2,
    text: 'אם היינו נפגשים היום בפעם הראשונה - היית מתחיל/ה איתי?',
  },
  {
    id: 'q1_4',
    stage: 1,
    category: 'time_machine',
    difficulty: 2,
    text: 'איזה חלק מעצמך מתקופה לפני שהכרת אותי אתה מתגעגע אליו?',
  },
  {
    id: 'q1_5',
    stage: 1,
    category: 'fears_desires',
    difficulty: 3,
    text: 'מה ויתרת עליו בשבילנו שאתה עדיין לא בטוח שזה היה שווה?',
  },
  {
    id: 'q1_6',
    stage: 1,
    category: 'small_secrets',
    difficulty: 3,
    text: 'מה שיקרת לי עליו בהתחלה כי רצית שאתרשם?',
  },

  // ════════════════════════════════════════════
  // שלב 2 - "הרמת כוסית"
  // נושא: חימום, הנאה, קלילות עם עומק
  // 8 פריטים (40% שאלות = 3 שאלות)
  // ════════════════════════════════════════════

  {
    id: 'q2_1',
    stage: 2,
    category: 'ego_war',
    difficulty: 1,
    text: 'במה אני יותר טוב ממך ובמה את/ה יותר טוב ממני?',
  },
  {
    id: 'q2_2',
    stage: 2,
    category: 'social_judgment',
    difficulty: 1,
    text: 'מה לדעתך החברים שלנו אומרים עלינו כשאנחנו לא בחדר?',
  },
  {
    id: 'q2_3',
    stage: 2,
    category: 'small_things',
    difficulty: 2,
    text: 'מה הדבר הכי קטן שאני עושה שמשגע אותך - בטוב?',
  },

  // ════════════════════════════════════════════
  // שלב 3 - "דברים שלא אומרים בקול"
  // נושא: פגיעות, כנות כואבת
  // 8 פריטים (50% שאלות = 4 שאלות)
  // ════════════════════════════════════════════

  {
    id: 'q3_1',
    stage: 3,
    category: 'fears_desires',
    difficulty: 2,
    text: 'מתי הרגשת הכי בודד/ה בתוך הזוגיות שלנו?',
  },
  {
    id: 'q3_2',
    stage: 3,
    category: 'small_secrets',
    difficulty: 2,
    text: 'מה הדבר שאתה הכי מפחד שאגלה עליך?',
  },
  {
    id: 'q3_3',
    stage: 3,
    category: 'body_soul',
    difficulty: 3,
    text: 'מה אתה רוצה שאעשה לך שמעולם לא ביקשת כי התביישת?',
  },
  {
    id: 'q3_4',
    stage: 3,
    category: 'fears_desires',
    difficulty: 3,
    text: 'מה הויתור הכי גדול שעשית למעננו שאני לא יודע עליו?',
  },

  // ════════════════════════════════════════════
  // שלב 4 - "מלחמת הגירסאות"
  // נושא: איך כל אחד רואה את אותו דבר אחרת
  // 8 פריטים (80% שאלות = 6 שאלות)
  // ════════════════════════════════════════════

  {
    id: 'q4_1',
    stage: 4,
    category: 'ego_war',
    difficulty: 2,
    text: 'על מה אתה יודע שאתה צודק - אבל ויתרת כי לא שווה להילחם?',
  },
  {
    id: 'q4_2',
    stage: 4,
    category: 'ego_war',
    difficulty: 2,
    text: 'מה הדבר שאני עושה שמעצבן אותך אבל אתה כבר הפסקת להעיר עליו?',
  },
  {
    id: 'q4_3',
    stage: 4,
    category: 'social_judgment',
    difficulty: 2,
    text: 'מה לדעתך המשפחה שלי באמת חושבת עליך?',
  },
  {
    id: 'q4_4',
    stage: 4,
    category: 'money_talks',
    difficulty: 2,
    text: 'על מה אנחנו הכי לא מסכימים בנושא כסף - ומי צודק?',
  },
  {
    id: 'q4_5',
    stage: 4,
    category: 'ego_war',
    difficulty: 3,
    text: 'באיזה ריב ישן אתה עדיין בטוח שצדקת - למרות שהודית?',
  },
  {
    id: 'q4_6',
    stage: 4,
    category: 'small_things',
    difficulty: 3,
    text: 'מה הדבר שאני עושה שגורם לך לחשוב "למה התחתנתי עם זה"?',
  },

  // ════════════════════════════════════════════
  // שלב 5 - "טמפרטורה עולה"
  // נושא: אינטימיות, משיכה, גוף
  // 8 פריטים (30% שאלות = 2-3 שאלות)
  // ════════════════════════════════════════════

  {
    id: 'q5_1',
    stage: 5,
    category: 'body_soul',
    difficulty: 2,
    text: 'מה הדבר האחרון שעשינו במיטה שהפתיע אותך שנהנית ממנו?',
  },
  {
    id: 'q5_2',
    stage: 5,
    category: 'one_night',
    difficulty: 3,
    text: 'אם היית צריך לבחור: לילה אחד של סקס כמו שהיה בהתחלה, או לילה של משהו שאף פעם לא עשינו?',
  },
  {
    id: 'q5_3',
    stage: 5,
    category: 'body_soul',
    difficulty: 3,
    text: 'מתי היה הרגע האחרון שהגוף שלי באמת הפתיע אותך?',
  },
];

// פונקציות עזר
export const formatQuestion = (
  question: Question,
  partnerName: string,
  currentPlayerGender: 'male' | 'female' | 'other'
): string => {
  let text = question.text;
  if (currentPlayerGender === 'male' && question.textMale) {
    text = question.textMale;
  } else if (currentPlayerGender === 'female' && question.textFemale) {
    text = question.textFemale;
  }
  return text.replace(/{partner}/g, partnerName);
};

export const getQuestionsForStage = (stage: number): Question[] => {
  return questions.filter((q) => q.stage === stage);
};

export const getRandomQuestion = (
  stage: number,
  difficulty: 1 | 2 | 3,
  excludeIds: string[] = []
): Question | null => {
  const available = questions.filter(
    (q) => q.stage === stage && q.difficulty === difficulty && !excludeIds.includes(q.id)
  );
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};
