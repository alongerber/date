/**
 * Quiz Questions - שאלות לחידון הזוגי (שלב 6)
 *
 * 6 קטגוריות × 10 שאלות = 60 שאלות בבנק
 * 24 שאלות נבחרות למשחק (4 מכל קטגוריה)
 */

export type QuizCategory = 'past' | 'daily' | 'dreams' | 'intimacy' | 'dilemmas' | 'us';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  text: string;
  options: string[];
}

export const QUIZ_CATEGORIES: Record<QuizCategory, { name: string; description: string }> = {
  past: { name: 'עבר', description: 'איך הכרנו, רגעים ראשונים' },
  daily: { name: 'יומיום', description: 'הרגלים, העדפות, שגרה' },
  dreams: { name: 'חלומות', description: 'שאיפות, פחדים, חזון' },
  intimacy: { name: 'אינטימיות', description: 'קרבה, מגע, רגשות' },
  dilemmas: { name: 'דילמות', description: 'בחירות קשות' },
  us: { name: 'אנחנו', description: 'הזוגיות עצמה' },
};

export const quizQuestions: QuizQuestion[] = [
  // קטגוריה: עבר
  {
    id: 'quiz_past_1',
    category: 'past',
    text: 'מה הדבר הראשון שהבחנתי בו/בה כשהכרנו?',
    options: ['העיניים', 'החיוך', 'הקול', 'הסגנון', 'תחושה כללית', 'משהו אחר'],
  },
  {
    id: 'quiz_past_2',
    category: 'past',
    text: 'מה חשבתי אחרי הדייט הראשון שלנו?',
    options: ['זה האחד/האחת', 'רוצה עוד', 'לא בטוח/ה', 'חברים זה מספיק', 'צריך לחשוב על זה', 'וואו'],
  },
  {
    id: 'quiz_past_3',
    category: 'past',
    text: 'איפה היינו בנשיקה הראשונה שלנו?',
    options: ['בבית', 'ברחוב', 'במכונית', 'בבר/מסעדה', 'בים/פארק', 'לא זוכר/ת'],
  },
  {
    id: 'quiz_past_4',
    category: 'past',
    text: 'מה הדבר הכי מביך שקרה לנו בתחילת הקשר?',
    options: ['נפילה/מעידה', 'משהו שאמרתי', 'פגישה עם ההורים', 'משהו בסקס', 'שכחתי משהו חשוב', 'אין לי מושג'],
  },
  {
    id: 'quiz_past_5',
    category: 'past',
    text: 'כמה זמן לקח לי להבין שזה רציני?',
    options: ['מהרגע הראשון', 'אחרי כמה דייטים', 'אחרי חודש', 'אחרי כמה חודשים', 'לקח הרבה זמן', 'עדיין לא בטוח/ה'],
  },

  // קטגוריה: יומיום
  {
    id: 'quiz_daily_1',
    category: 'daily',
    text: 'מה הדבר הראשון שאני עושה בבוקר?',
    options: ['בודק/ת טלפון', 'קפה', 'שירותים', 'מתיחות', 'מנשק/ת אותך', 'ממשיך/ה לישון'],
  },
  {
    id: 'quiz_daily_2',
    category: 'daily',
    text: 'איזה אוכל אני לא יכול/ה בלעדיו?',
    options: ['פיצה', 'סושי', 'בשר', 'שוקולד', 'לחם', 'משהו אחר'],
  },
  {
    id: 'quiz_daily_3',
    category: 'daily',
    text: 'מה מעצבן אותי הכי הרבה בבית?',
    options: ['אי סדר', 'רעש', 'כלים בכיור', 'מיזוג', 'שום דבר', 'הכל'],
  },
  {
    id: 'quiz_daily_4',
    category: 'daily',
    text: 'מה אני מעדיף/ה לעשות בערב חופשי?',
    options: ['נטפליקס', 'לצאת לאכול', 'להיפגש עם חברים', 'לקרוא', 'סקס', 'לישון'],
  },
  {
    id: 'quiz_daily_5',
    category: 'daily',
    text: 'איך אני מתמודד/ת עם לחץ?',
    options: ['אוכל/ת', 'מתבודד/ת', 'מדבר/ת', 'פעילות גופנית', 'צועק/ת', 'מתעלם/ת'],
  },

  // קטגוריה: חלומות
  {
    id: 'quiz_dreams_1',
    category: 'dreams',
    text: 'איפה הייתי רוצה לגור בעוד 10 שנים?',
    options: ['כאן', 'חו"ל', 'כפר/מושב', 'עיר גדולה', 'ליד הים', 'לא יודע/ת'],
  },
  {
    id: 'quiz_dreams_2',
    category: 'dreams',
    text: 'מה החלום הכי גדול שלי?',
    options: ['קריירה', 'משפחה', 'לטייל בעולם', 'עושר', 'שקט נפשי', 'משהו אחר'],
  },
  {
    id: 'quiz_dreams_3',
    category: 'dreams',
    text: 'מה הפחד הכי גדול שלי לגבי העתיד?',
    options: ['בריאות', 'כסף', 'בדידות', 'להיפרד', 'לא להגשים חלומות', 'אין לי פחדים'],
  },
  {
    id: 'quiz_dreams_4',
    category: 'dreams',
    text: 'כמה ילדים אני רוצה (או רציתי)?',
    options: ['0', '1', '2', '3', '4+', 'לא יודע/ת'],
  },
  {
    id: 'quiz_dreams_5',
    category: 'dreams',
    text: 'אם הייתי זוכה בלוטו, מה הייתי עושה ראשון?',
    options: ['מפסיק/ה לעבוד', 'קונה בית', 'טיול גדול', 'נותן/ת להורים', 'משקיע/ה', 'ממשיך/ה כרגיל'],
  },

  // קטגוריה: אינטימיות
  {
    id: 'quiz_intimacy_1',
    category: 'intimacy',
    text: 'מה הכי מדליק אותי?',
    options: ['נגיעה', 'מילים', 'מראה', 'ריח', 'אווירה', 'הפתעות'],
  },
  {
    id: 'quiz_intimacy_2',
    category: 'intimacy',
    text: 'באיזו תדירות אני רוצה סקס (אידיאלית)?',
    options: ['כל יום', 'כמה פעמים בשבוע', 'פעם בשבוע', 'כמה פעמים בחודש', 'פעם בחודש', 'לא משנה'],
  },
  {
    id: 'quiz_intimacy_3',
    category: 'intimacy',
    text: 'מה הכי חשוב לי בסקס?',
    options: ['תשוקה', 'רגש', 'חידוש', 'חיבור', 'הנאה פיזית', 'הכל'],
  },
  {
    id: 'quiz_intimacy_4',
    category: 'intimacy',
    text: 'מה אני מרגיש/ה אחרי סקס טוב?',
    options: ['מאושר/ת', 'רגוע/ה', 'מחובר/ת', 'עייף/ה', 'רוצה עוד', 'רעב/ה'],
  },
  {
    id: 'quiz_intimacy_5',
    category: 'intimacy',
    text: 'איזה חלק בגוף שלי אני הכי אוהב/ת שנוגעים בו?',
    options: ['פנים', 'צוואר', 'גב', 'ידיים', 'רגליים', 'מקום אחר'],
  },

  // קטגוריה: דילמות
  {
    id: 'quiz_dilemmas_1',
    category: 'dilemmas',
    text: 'אם הייתי צריך/ה לבחור - קריירה מבריקה או יותר זמן ביחד?',
    options: ['קריירה', 'זמן ביחד', 'איזון', 'תלוי בתקופה', 'לא יודע/ת', 'שניהם'],
  },
  {
    id: 'quiz_dilemmas_2',
    category: 'dilemmas',
    text: 'מה עדיף - לדעת שבן/בת הזוג בגד/ה או לא לדעת?',
    options: ['לדעת', 'לא לדעת', 'תלוי במי', 'תלוי מתי', 'אף אחד', 'לא יודע/ת'],
  },
  {
    id: 'quiz_dilemmas_3',
    category: 'dilemmas',
    text: 'הייתי מוכן/ה לעבור לעיר אחרת בשביל העבודה של בן/בת הזוג?',
    options: ['בוודאות', 'כנראה שכן', 'תלוי לאן', 'כנראה שלא', 'בשום פנים', 'רק אם...'],
  },
  {
    id: 'quiz_dilemmas_4',
    category: 'dilemmas',
    text: 'מה יותר גרוע - שקר קטן או אמת כואבת?',
    options: ['שקר קטן', 'אמת כואבת', 'תלוי בנושא', 'שניהם נוראים', 'שניהם בסדר', 'לא יודע/ת'],
  },
  {
    id: 'quiz_dilemmas_5',
    category: 'dilemmas',
    text: 'אם הייתי יכול/ה לשנות דבר אחד בבן/בת הזוג - מה זה היה?',
    options: ['כלום', 'הרגלים', 'תקשורת', 'משהו פיזי', 'גישה לכסף', 'משהו אחר'],
  },

  // קטגוריה: אנחנו
  {
    id: 'quiz_us_1',
    category: 'us',
    text: 'מה הדבר הכי טוב בזוגיות שלנו?',
    options: ['התקשורת', 'הצחוק', 'הסקס', 'הביטחון', 'החברות', 'הכל'],
  },
  {
    id: 'quiz_us_2',
    category: 'us',
    text: 'מה הדבר שהכי צריך לשפר בינינו?',
    options: ['תקשורת', 'זמן איכות', 'סקס', 'חלוקת משימות', 'כסף', 'כלום'],
  },
  {
    id: 'quiz_us_3',
    category: 'us',
    text: 'מי מאיתנו יותר רומנטי/ת?',
    options: ['אני', 'בן/בת הזוג', 'שנינו', 'אף אחד', 'תלוי ביום', 'לא יודע/ת'],
  },
  {
    id: 'quiz_us_4',
    category: 'us',
    text: 'איך אני חושב/ת שבן/בת הזוג היה/היתה מתאר/ת אותי לחבר/ה?',
    options: ['מדהים/ה', 'טוב/ה', 'מסובך/ת', 'מצחיק/ה', 'רציני/ת', 'לא יודע/ת'],
  },
  {
    id: 'quiz_us_5',
    category: 'us',
    text: 'מה הסיכוי שנהיה ביחד עוד 10 שנים?',
    options: ['100%', 'גבוה מאוד', 'גבוה', 'בינוני', 'נמוך', 'מי יודע'],
  },
];

// קבלת שאלות אקראיות לחידון (4 מכל קטגוריה = 24 שאלות)
export const getQuizQuestionsForGame = (): QuizQuestion[] => {
  const categories: QuizCategory[] = ['past', 'daily', 'dreams', 'intimacy', 'dilemmas', 'us'];
  const selectedQuestions: QuizQuestion[] = [];

  categories.forEach((category) => {
    const categoryQuestions = quizQuestions.filter((q) => q.category === category);
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    selectedQuestions.push(...shuffled.slice(0, 4));
  });

  // ערבוב סופי של כל השאלות
  return selectedQuestions.sort(() => Math.random() - 0.5);
};

// קבלת שאלה לפי ID
export const getQuizQuestionById = (id: string): QuizQuestion | undefined => {
  return quizQuestions.find((q) => q.id === id);
};
