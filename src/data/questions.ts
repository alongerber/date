/**
 * Questions Data - שאלות לשלבים 1-5
 *
 * 10 קטגוריות:
 * 1. מכונת זמן - עבר/עתיד עם טוויסט
 * 2. עולמות מקבילים - תרחישי "מה אם" מופרכים
 * 3. גוף ונפש - מיניות דרך עקיפין
 * 4. כסף מדבר - ערכים דרך דילמות כלכליות
 * 5. חברה ושיפוט - מה אחרים חושבים עלינו
 * 6. סודות קטנים - דברים שעדיין לא נאמרו
 * 7. מלחמת האגו - תחרותיות משעשעת
 * 8. פחדים ורצונות - פגיעות אמיתית
 * 9. הקטנות שהורגות - שגרה ביתית בזכוכית מגדלת
 * 10. לילה אחד - פנטזיות מוגדרות היטב
 */

export type QuestionCategory =
  | 'time_machine'
  | 'parallel_worlds'
  | 'body_soul'
  | 'money_talks'
  | 'social_judgment'
  | 'small_secrets'
  | 'ego_war'
  | 'fears_desires'
  | 'small_things'
  | 'one_night';

export interface Question {
  id: string;
  stage: number;
  category: QuestionCategory;
  difficulty: 1 | 2 | 3;
  text: string;
  textMale?: string; // גירסה זכר
  textFemale?: string; // גירסה נקבה
}

export const questions: Question[] = [
  // שלב 1 - רגע לפני שנפגשנו (8 שאלות, 70% שאלות)
  {
    id: 'q1_1',
    stage: 1,
    category: 'time_machine',
    difficulty: 1,
    text: 'באיזה גיל של {partner} היית רוצה לפגוש אותו/ה ולמה?',
  },
  {
    id: 'q1_2',
    stage: 1,
    category: 'time_machine',
    difficulty: 1,
    text: 'מה לדעתך הייתה הדעה הראשונה של {partner} עליך כשהכרתם?',
  },
  {
    id: 'q1_3',
    stage: 1,
    category: 'parallel_worlds',
    difficulty: 2,
    text: 'אם היית פוגש/ת את {partner} בעולם מקביל שבו שניכם כבר נשואים לאחרים - היית מתחיל/ה איתו/ה רומן?',
  },
  {
    id: 'q1_4',
    stage: 1,
    category: 'small_secrets',
    difficulty: 2,
    text: 'מה הדבר שחשבת על {partner} כשהכרתם ולא העזת להגיד לו/ה עד היום?',
  },
  {
    id: 'q1_5',
    stage: 1,
    category: 'time_machine',
    difficulty: 2,
    text: 'איזה חלק מעצמך מהתקופה לפני שהכרת את {partner} אתה מתגעגע אליו?',
  },
  {
    id: 'q1_6',
    stage: 1,
    category: 'fears_desires',
    difficulty: 3,
    text: 'אם היית יכול/ה לשנות דבר אחד בדרך שבה התנהגת כשרק הכרתם - מה זה היה?',
  },

  // שלב 2 - הרמת כוסית (8 פריטים, 40% שאלות)
  {
    id: 'q2_1',
    stage: 2,
    category: 'ego_war',
    difficulty: 1,
    text: 'מי מכם יותר עקשן/ית ולמה?',
  },
  {
    id: 'q2_2',
    stage: 2,
    category: 'social_judgment',
    difficulty: 1,
    text: 'מה לדעתך החברים שלכם אומרים עליכם כשאתם לא בחדר?',
  },
  {
    id: 'q2_3',
    stage: 2,
    category: 'small_things',
    difficulty: 2,
    text: 'מה הדבר הכי קטן ש{partner} עושה שמשגע אותך בטוב?',
  },

  // שלב 3 - דברים שלא אומרים בקול (8 פריטים, 50% שאלות)
  {
    id: 'q3_1',
    stage: 3,
    category: 'small_secrets',
    difficulty: 2,
    text: 'מה הדבר שאתה הכי מפחד ש{partner} יגלה עליך?',
  },
  {
    id: 'q3_2',
    stage: 3,
    category: 'fears_desires',
    difficulty: 2,
    text: 'מתי הרגשת הכי בודד/ה בתוך הזוגיות הזו?',
  },
  {
    id: 'q3_3',
    stage: 3,
    category: 'body_soul',
    difficulty: 2,
    text: 'מה הדבר שאתה הכי רוצה ש{partner} יעשה לך אבל מתבייש לבקש?',
  },
  {
    id: 'q3_4',
    stage: 3,
    category: 'fears_desires',
    difficulty: 3,
    text: 'מה הויתור הכי גדול שעשית למען הזוגיות הזו ולא סיפרת עליו?',
  },

  // שלב 4 - מלחמת הגירסאות (8 פריטים, 80% שאלות)
  {
    id: 'q4_1',
    stage: 4,
    category: 'ego_war',
    difficulty: 2,
    text: 'מה הריב הכי מטופש שהיה לכם ואיך כל אחד מכם זוכר אותו?',
  },
  {
    id: 'q4_2',
    stage: 4,
    category: 'ego_war',
    difficulty: 2,
    text: 'על מה לדעתך {partner} מרגיש/ה שהוא/היא צודק/ת אבל אתה בכלל לא מסכים/ה?',
  },
  {
    id: 'q4_3',
    stage: 4,
    category: 'small_things',
    difficulty: 2,
    text: 'מה הדבר שאתה עושה שאתה בטוח שמעצבן את {partner} אבל ממשיך לעשות בכל זאת?',
  },
  {
    id: 'q4_4',
    stage: 4,
    category: 'ego_war',
    difficulty: 3,
    text: 'באיזה נושא אתה יודע שאתה טועה אבל פשוט לא מוכן להודות בזה?',
  },
  {
    id: 'q4_5',
    stage: 4,
    category: 'social_judgment',
    difficulty: 2,
    text: 'מה לדעתך המשפחה של {partner} באמת חושבת עליך?',
  },
  {
    id: 'q4_6',
    stage: 4,
    category: 'money_talks',
    difficulty: 2,
    text: 'על מה אתם הכי לא מסכימים בנושא כסף?',
  },

  // שלב 5 - טמפרטורה עולה (8 פריטים, 30% שאלות)
  {
    id: 'q5_1',
    stage: 5,
    category: 'body_soul',
    difficulty: 2,
    text: 'מה הדבר האחרון שעשית בסקס שהפתיע אותך שנהנית ממנו?',
  },
  {
    id: 'q5_2',
    stage: 5,
    category: 'one_night',
    difficulty: 3,
    text: 'אם היית צריך/ה לבחור - לילה אחד של סקס כמו שהיה לכם בהתחלה, או לילה של משהו שאף פעם לא עשיתם ביחד?',
  },
  {
    id: 'q5_3',
    stage: 5,
    category: 'body_soul',
    difficulty: 3,
    text: 'מתי היה הרגע האחרון שבאמת הרגשת שהגוף של {partner} מפתיע אותך?',
  },
];

// פונקציה להחלפת {partner} בשם האמיתי
export const formatQuestion = (
  question: Question,
  partnerName: string,
  currentPlayerGender: 'male' | 'female' | 'other'
): string => {
  let text = question.text;

  // בחר גירסה לפי מגדר אם קיימת
  if (currentPlayerGender === 'male' && question.textMale) {
    text = question.textMale;
  } else if (currentPlayerGender === 'female' && question.textFemale) {
    text = question.textFemale;
  }

  return text.replace(/{partner}/g, partnerName);
};

// קבלת שאלות לשלב מסוים
export const getQuestionsForStage = (stage: number): Question[] => {
  return questions.filter((q) => q.stage === stage);
};

// קבלת שאלה אקראית לפי שלב ורמת קושי
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
