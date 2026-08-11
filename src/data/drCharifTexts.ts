/**
 * Jean-Pierre Texts - All dialogue and narration
 *
 * ז'אן־פייר - המנחה של Date Tower
 * בריטי, שנון, מתוחכם, עוקצני - אבל כריזמטי ומדויק.
 * מארח את הזוג במגדל לאורך שש הקומות, שובר את הקיר הרביעי,
 * אוהב אמת, שונא תירוצים.
 *
 * הערה: שמות הייצוא נשמרו לתאימות לאחור עם שאר האפליקציה.
 */

export interface TextLine {
  text: string;
  delay: number; // delay in ms after this line
}

export interface DrCharifText {
  id: string;
  context: string;
  lines: TextLine[];
}

// מסך הפתיחה - כניסה למגדל
export const splashTexts: DrCharifText = {
  id: 'splash',
  context: 'opening',
  lines: [
    { text: 'ובכן.', delay: 1000 },
    { text: 'הגעתם.', delay: 1000 },
    { text: 'ברוכים הבאים ל־Date Tower.', delay: 1000 },
    { text: 'שמי ז\'אן־פייר.', delay: 800 },
    { text: 'אני מארח כאן. לא מטפל, לא יועץ.', delay: 800 },
    { text: 'מארח.', delay: 800 },
    { text: 'לא משנה מה אמרתם לעצמכם בדרך לפה.', delay: 1000 },
    { text: 'משהו הביא אתכם. סקרנות. שעמום. אולי תקווה.', delay: 800 },
    { text: 'שש קומות מפרידות ביניכם לבין האמת.', delay: 1000 },
    { text: 'זוגות שעולים במגדל הזה - יורדים אחרת.', delay: 800 },
    { text: 'לא בהכרח טובים יותר.', delay: 600 },
    { text: 'אבל אמיתיים יותר. וזה, ידידיי, נדיר.', delay: 1200 },
    { text: 'אז אם אתם מוכנים להסיר קצת שכבות -', delay: 800 },
    { text: 'המעלית מחכה.', delay: 0 },
  ],
};

// הזנת שמות
export const nameEntryTexts = {
  askFirstName: {
    id: 'ask_first_name',
    context: 'onboarding',
    lines: [
      { text: 'לפני שנעלה - איך קוראים לך?', delay: 0 },
    ],
  },
  askSecondName: {
    id: 'ask_second_name',
    context: 'onboarding',
    lines: [
      { text: 'מקסים. ומי הואיל בטובו להצטרף אליך הערב?', delay: 0 },
    ],
  },
  namesConfirm: (name1: string, name2: string): DrCharifText => ({
    id: 'names_confirm',
    context: 'onboarding',
    lines: [
      { text: `${name1} ו${name2}.`, delay: 800 },
      { text: 'אה. נשמע כמו זוג שמסתיר לפחות סוד אחד טוב.', delay: 800 },
      { text: 'טוב. נזרום.', delay: 600 },
      { text: 'בואו נעלה.', delay: 0 },
    ],
  }),
};

// פתיחת משחק
export const gameIntroText: DrCharifText = {
  id: 'game_intro',
  context: 'game_start',
  lines: [
    { text: 'נו, התיישבתם? מצוין.', delay: 600 },
    { text: 'יש יין? עוד יותר טוב.', delay: 800 },
    { text: 'אני ז\'אן־פייר, ואני אלווה אתכם קומה אחר קומה.', delay: 1000 },
    { text: 'ראיתי יותר זוגות מכפי שכדאי לי להודות.', delay: 800 },
    { text: 'כולם אומרים את אותו המשפט: "אנחנו בסדר, רק רצינו לגוון".', delay: 1200 },
    { text: 'שקר קטן ומקסים.', delay: 800 },
    { text: 'אף אחד לא מגיע למגדל כדי לחזק משהו שעובד מצוין.', delay: 800 },
    { text: 'אתם פה כי משהו מגרד.', delay: 600 },
    { text: 'וזה, ביני לביניכם, בדיוק העניין.', delay: 800 },
    { text: 'הגירוד הזה שווה זהב.', delay: 600 },
    { text: 'אז בואו נגרד. בסטייל.', delay: 0 },
  ],
};

// פתיחות קומות
export const stageIntros: Record<number, DrCharifText> = {
  1: {
    id: 'stage_1_intro',
    context: 'stage_intro',
    lines: [
      { text: 'קומה ראשונה.', delay: 800 },
      { text: 'Ice & Fire. אש וקרח.', delay: 1000 },
      { text: 'מתחילים קליל. הומור, פלרטוט, קצת חום.', delay: 800 },
      { text: 'שום דבר שיכול לפגוע.', delay: 600 },
      { text: 'עדיין.', delay: 0 },
    ],
  },
  2: {
    id: 'stage_2_intro',
    context: 'stage_intro',
    lines: [
      { text: 'קומה שנייה.', delay: 800 },
      { text: 'Mind Games. משחקי ראש.', delay: 1000 },
      { text: 'עכשיו נחליף תפקידים ונקודות מבט.', delay: 800 },
      { text: 'תגלו איך אתם נראים דרך העיניים של מי שממול.', delay: 800 },
      { text: 'מרתק. ולעיתים מביך.', delay: 0 },
    ],
  },
  3: {
    id: 'stage_3_intro',
    context: 'stage_intro',
    lines: [
      { text: 'קומה שלישית.', delay: 800 },
      { text: 'Rewind. חזרה אחורה.', delay: 1000 },
      { text: 'העבר הזוגי. הפדיחות. הרגעים הראשונים.', delay: 800 },
      { text: 'הדברים שלא סיפרתם - לא כי הם סוד,', delay: 600 },
      { text: 'אלא כי הם מביכים עד כאב.', delay: 800 },
      { text: 'הערב? מספרים אותם.', delay: 0 },
    ],
  },
  4: {
    id: 'stage_4_intro',
    context: 'stage_intro',
    lines: [
      { text: 'קומה רביעית.', delay: 800 },
      { text: 'Moral Zone. האזור האפור.', delay: 1000 },
      { text: 'הקומה הזו... לא לבעלי לב חלש.', delay: 800 },
      { text: 'מזל שאין פה אף אחד כזה.', delay: 800 },
      { text: 'דילמות, קווים אדומים, עקרונות.', delay: 600 },
      { text: 'נגלה איפה בדיוק עובר הקו שלכם.', delay: 0 },
    ],
  },
  5: {
    id: 'stage_5_intro',
    context: 'stage_intro',
    lines: [
      { text: 'קומה חמישית.', delay: 800 },
      { text: 'Deep Dive. צלילה עמוקה.', delay: 1000 },
      { text: 'עכשיו נכנסים לטריטוריה אחרת.', delay: 800 },
      { text: 'יש זוגות שהחום ביניהם נגמר לא כי הם לא רוצים,', delay: 800 },
      { text: 'אלא כי כל אחד מחכה שהשני יתחיל.', delay: 600 },
      { text: 'שנים של "למה תמיד אני זה ש..."', delay: 800 },
      { text: 'הערב? אני מתחיל בשבילכם.', delay: 600 },
      { text: 'על מה תמשיכו - זה כבר עליכם.', delay: 0 },
    ],
  },
};

// בחירת רמת עוצמה לקומה החמישית
export const intensitySelectionText: DrCharifText = {
  id: 'intensity_selection',
  context: 'stage_5',
  lines: [
    { text: 'לפני שנצלול, החלטה קטנה. ביחד.', delay: 600 },
    { text: 'כמה עמוק אתם מוכנים לרדת הערב?', delay: 800 },
    { text: 'שלוש רמות:', delay: 600 },
    { text: 'רכה - נגיעות, לחישות, נשיקות.', delay: 600 },
    { text: 'בינונית - יותר אינטימי, אבל לא הכל.', delay: 800 },
    { text: 'חריפה - הכל על השולחן.', delay: 800 },
    { text: 'אין תשובה נכונה.', delay: 600 },
    { text: 'יש רק התשובה שלכם.', delay: 0 },
  ],
};

export const intensityChoiceTexts: Record<string, DrCharifText> = {
  soft: {
    id: 'intensity_soft',
    context: 'stage_5',
    lines: [
      { text: 'רמה רכה.', delay: 600 },
      { text: 'סטטיסטיקה קטנה שאספתי לאורך השנים -', delay: 600 },
      { text: '80% מהזוגות מתחילים כאן.', delay: 600 },
      { text: '60% מהם מתחרטים באמצע הערב.', delay: 800 },
      { text: 'אבל אתם לא סטטיסטיקה.', delay: 600 },
      { text: 'אתם שני אנשים עם הרגלים, פחדים ותקוות משלכם.', delay: 800 },
      { text: 'אז קחו את הרכה הזו והפכו אותה למשהו שלכם.', delay: 0 },
    ],
  },
  medium: {
    id: 'intensity_medium',
    context: 'stage_5',
    lines: [
      { text: 'רמה בינונית.', delay: 600 },
      { text: 'בחירה של אנשים שיודעים מה הם רוצים.', delay: 600 },
      { text: 'אבל גם יודעים מה הם לא מוכנים לעשות.', delay: 800 },
      { text: 'מכובד מאוד.', delay: 600 },
      { text: 'גבולות הם לא חולשה.', delay: 600 },
      { text: 'הם סימן שאתם מכירים את עצמכם.', delay: 0 },
    ],
  },
  spicy: {
    id: 'intensity_spicy',
    context: 'stage_5',
    lines: [
      { text: 'רמה חריפה.', delay: 600 },
      { text: 'ובכן.', delay: 800 },
      { text: 'אתם לא מפחדים, אה?', delay: 800 },
      { text: 'מצוין. אני מחבב כאלה.', delay: 600 },
      { text: 'רק זכרו -', delay: 600 },
      { text: '"לא" זו תמיד אופציה. גם באמצע.', delay: 600 },
      { text: 'ועכשיו, בואו נראה ממה אתם עשויים.', delay: 0 },
    ],
  },
};

// טקסטים לפני שאלות
export const beforeQuestionTexts: DrCharifText[] = [
  {
    id: 'before_q_1',
    context: 'before_question',
    lines: [
      { text: 'השאלה הזו הולכת לרחף באוויר כמה שניות אחרי שתקראו אותה.', delay: 800 },
      { text: 'תרגישו דחף לענות מהר כדי לסיים את האי־נוחות.', delay: 600 },
      { text: 'אל.', delay: 800 },
      { text: 'האי־נוחות הזו?', delay: 600 },
      { text: 'שם בדיוק הזוגיות גדלה.', delay: 600 },
      { text: 'במקומות הלא נוחים.', delay: 0 },
    ],
  },
  {
    id: 'before_q_2',
    context: 'before_question',
    lines: [
      { text: 'השאלה הבאה.', delay: 600 },
      { text: 'אל תחפשו את התשובה "הנכונה".', delay: 600 },
      { text: 'אין כזו.', delay: 800 },
      { text: 'יש רק תשובה כנה.', delay: 0 },
    ],
  },
];

// תגובות לביצוע אתגר
export const afterHonestAnswerTexts: DrCharifText[] = [
  {
    id: 'after_honest_1',
    context: 'after_answer',
    lines: [
      { text: 'הפתעת אותי.', delay: 600 },
      { text: 'לרגע חשבתי שאתה פה רק בשביל העיצוב.', delay: 800 },
      { text: 'אבל לא.', delay: 600 },
      { text: 'מישהו פה עכשיו אמר משהו שעלה לו.', delay: 800 },
      { text: 'תסתכלו אחד על השני.', delay: 600 },
      { text: 'רואים? אלה פני של אדם שהוריד שריון.', delay: 800 },
      { text: 'תזכרו את הפנים האלה.', delay: 0 },
    ],
  },
];

// טקסטים לוטו
export const vetoTexts: DrCharifText[] = [
  {
    id: 'veto_1',
    context: 'veto',
    lines: [
      { text: 'וטו.', delay: 600 },
      { text: 'פחדנות אלגנטית.', delay: 800 },
      { text: 'כמו חליפה בלי תחתונים - מרשים, אבל מסוכן.', delay: 1000 },
      { text: 'אני לא שופט. יש דברים שהגוף פשוט אומר עליהם "לא הערב".', delay: 800 },
      { text: 'הבעיה מתחילה כש"לא הערב" הופך ל"לא אף פעם".', delay: 800 },
      { text: 'אז רק זכרו - הייתה כאן שאלה.', delay: 600 },
      { text: 'והיא לא הולכת לשום מקום.', delay: 0 },
    ],
  },
];

// מעברים בין קומות
export const transitionTexts: DrCharifText[] = [
  {
    id: 'transition_1',
    context: 'transition',
    lines: [
      { text: 'יודעים מה ההבדל בין זוגות שנשארים לזוגות שנפרדים?', delay: 800 },
      { text: 'לא אהבה. לא סקס. לא כסף.', delay: 800 },
      { text: 'סקרנות.', delay: 1000 },
      { text: 'הזוגות שנשארים עדיין סקרנים למה שקורה בראש של השני.', delay: 800 },
      { text: 'אלה שנפרדים? בטוחים שהם כבר יודעים הכל.', delay: 800 },
      { text: 'אז בואו נבדוק כמה אתם בטוחים.', delay: 0 },
    ],
  },
];

// רגעים פילוסופיים
export const philosophicalTexts: DrCharifText[] = [
  {
    id: 'philosophy_1',
    context: 'philosophical',
    lines: [
      { text: 'יודעים מה משעשע?', delay: 600 },
      { text: 'זוגות מגיעים אחרי עשר שנים ואומרים "הוא השתנה".', delay: 800 },
      { text: 'לא.', delay: 800 },
      { text: 'הוא תמיד היה ככה.', delay: 600 },
      { text: 'פשוט בהתחלה קראתם לזה "ספונטני",', delay: 600 },
      { text: 'והיום אתם קוראים לזה "חסר אחריות".', delay: 800 },
      { text: 'המציאות לא השתנתה.', delay: 600 },
      { text: 'המילים שלכם השתנו.', delay: 0 },
    ],
  },
];

// פתיחת חידון - Deep Dive Quiz
export const quizIntroText: DrCharifText = {
  id: 'quiz_intro',
  context: 'quiz',
  lines: [
    { text: 'קומה שישית. החידון.', delay: 800 },
    { text: 'עכשיו נגלה מי באמת מכיר את מי.', delay: 800 },
    { text: 'טיפ קטן ממני -', delay: 600 },
    { text: 'זה לא מבחן. אין ציון עובר.', delay: 600 },
    { text: 'יש רק מראה.', delay: 800 },
    { text: 'ומראות לא משקרות,', delay: 600 },
    { text: 'אבל הן גם לא מספרות את כל הסיפור.', delay: 800 },
    { text: 'מה שלא תדעו? זו לא בושה.', delay: 600 },
    { text: 'זו הזמנה.', delay: 0 },
  ],
};

// חיבור מכשירים
export const deviceConnectionText: DrCharifText = {
  id: 'device_connection',
  context: 'quiz',
  lines: [
    { text: 'כל אחד מכם, קחו את הטלפון שלכם.', delay: 800 },
    { text: 'אחד יקבל קוד. השני יקליד אותו.', delay: 600 },
    { text: 'ארבע ספרות.', delay: 800 },
    { text: 'אם אחרי כל השנים האלה אתם לא מסוגלים לזכור ארבע ספרות ביחד,', delay: 600 },
    { text: 'יש לנו בעיות גדולות יותר מחידון.', delay: 0 },
  ],
};

// גלגל המזל
export const wheelIntroText: DrCharifText = {
  id: 'wheel_intro',
  context: 'wheel',
  lines: [
    { text: 'חמש עשרה אפשרויות.', delay: 800 },
    { text: 'לא אגלה לכם מה.', delay: 600 },
    { text: 'רק שחלק מהן נגמרות הלילה,', delay: 600 },
    { text: 'וחלק?', delay: 800 },
    { text: 'חלק ילוו אתכם הרבה אחרי שתסגרו את האפליקציה.', delay: 800 },
    { text: 'גלגלו.', delay: 600 },
    { text: 'ושיהיה לכם מזל.', delay: 600 },
    { text: 'או שלא. תלוי איזה צד של הגלגל אתם מעדיפים.', delay: 0 },
  ],
};

// סיום - Future Perfect
export const endingText = (winnerName: string): DrCharifText => ({
  id: 'ending',
  context: 'ending',
  lines: [
    { text: 'קומה שישית. Future Perfect.', delay: 800 },
    { text: 'הגעתם לפסגת המגדל ואתם עדיין על אותה ספה.', delay: 800 },
    { text: 'אתם יודעים כמה זוגות לא מסיימים את הערב הזה יחד?', delay: 800 },
    { text: 'אם יש גיהנום לזוגות - הוא כנראה הרבה פחות כיפי מזה.', delay: 1000 },
    { text: 'לא משנה הניקוד. לא משנה מי ניצח.', delay: 600 },
    { text: `אבל אם זה חשוב לכם - ${winnerName} ניצח.`, delay: 800 },
    { text: 'מה שמשנה זה שבחרתם להיות פה.', delay: 600 },
    { text: 'אחד עם השני.', delay: 600 },
    { text: 'בערב שיכולתם לבזבז על נטפליקס.', delay: 800 },
    { text: 'בחרתם במשהו קשה יותר. לא נוח יותר.', delay: 600 },
    { text: 'אמיתי יותר.', delay: 1000 },
    { text: 'עכשיו סגרו את הטלפון.', delay: 800 },
    { text: 'יש לכם עבודה לעשות. מהסוג הטוב.', delay: 0 },
  ],
});

export const tieEndingText: DrCharifText = {
  id: 'tie_ending',
  context: 'ending',
  lines: [
    { text: 'קומה שישית. Future Perfect.', delay: 800 },
    { text: 'הגעתם לפסגה. והתוצאה - תיקו.', delay: 600 },
    { text: 'מתאים.', delay: 800 },
    { text: 'בזוגיות טובה אף אחד לא באמת מנצח.', delay: 600 },
    { text: 'ואף אחד לא באמת מפסיד.', delay: 800 },
    { text: 'אתם פשוט ממשיכים.', delay: 600 },
    { text: 'ביחד.', delay: 1000 },
    { text: 'עכשיו סגרו את הטלפון.', delay: 800 },
    { text: 'יש לכם עבודה לעשות. מהסוג הטוב.', delay: 0 },
  ],
};

// Paywall
export const paywallText: DrCharifText = {
  id: 'paywall',
  context: 'paywall',
  lines: [
    { text: 'ובכן, כאן נגמרת הטעימה.', delay: 800 },
    { text: 'מה שמחכה לכם בקומות הבאות?', delay: 600 },
    { text: 'בואו נאמר שאתם עדיין לבושים מדי בשביל מה שתכננתי.', delay: 1000 },
    { text: '79 שקל.', delay: 600 },
    { text: 'פחות מבקבוק יין בינוני.', delay: 600 },
    { text: 'והרבה יותר השפעה על הערב שלכם.', delay: 0 },
  ],
};

// רגע של חום מוסתר
export const warmthTexts: DrCharifText[] = [
  {
    id: 'warmth_1',
    context: 'warmth',
    lines: [
      { text: 'אירחתי המון זוגות במגדל הזה.', delay: 600 },
      { text: 'יש כאלה שנכנסים ואתה מריח את העייפות.', delay: 800 },
      { text: 'ויש כאלה שנכנסים ואתה רואה -', delay: 600 },
      { text: 'הם עדיין רוצים.', delay: 800 },
      { text: 'רוצים שזה יעבוד.', delay: 600 },
      { text: 'אתם מהסוג השני.', delay: 800 },
      { text: 'אני יודע, כי הסוג הראשון לא מוריד אפליקציות.', delay: 600 },
      { text: 'הוא מוריד עורכי דין.', delay: 0 },
    ],
  },
];
