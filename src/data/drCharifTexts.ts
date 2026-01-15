/**
 * Dr. Charif Texts - All dialogue and narration
 *
 * ד"ר חריף - פסיכולוג זוגי עם 30 שנה ניסיון
 * מריר, עוקצני, ציני - אבל עם חוכמת חיים מחוספסת
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

// מסך הפתיחה - "הפרוזדור"
export const splashTexts: DrCharifText = {
  id: 'splash',
  context: 'opening',
  lines: [
    { text: 'טוב.', delay: 1000 },
    { text: 'הגעתם.', delay: 1000 },
    { text: 'לא משנה מה הסיבה.', delay: 600 },
    { text: 'לא משנה מה אמרתם לעצמכם בדרך לפה.', delay: 1000 },
    { text: 'משהו הביא אתכם.', delay: 800 },
    { text: 'סקרנות. שעמום. פחד. תקווה.', delay: 600 },
    { text: 'אולי הכל ביחד.', delay: 1500 },
    { text: 'אני לא הולך לספר לכם מה מחכה לכם.', delay: 800 },
    { text: 'אני רק הולך להגיד שזוגות שנכנסים לפה - יוצאים אחרת.', delay: 1200 },
    { text: 'לא בטוח יותר טובים.', delay: 600 },
    { text: 'אבל בטוח יותר אמיתיים.', delay: 1500 },
    { text: 'אז אם אתם מוכנים להסיר קצת שכבות -', delay: 800 },
    { text: 'בואו נתחיל.', delay: 0 },
  ],
};

// הזנת שמות
export const nameEntryTexts = {
  askFirstName: {
    id: 'ask_first_name',
    context: 'onboarding',
    lines: [
      { text: 'קודם כל, איך קוראים לך?', delay: 0 },
    ],
  },
  askSecondName: {
    id: 'ask_second_name',
    context: 'onboarding',
    lines: [
      { text: 'יפה. ומי בא איתך הערב?', delay: 0 },
    ],
  },
  namesConfirm: (name1: string, name2: string): DrCharifText => ({
    id: 'names_confirm',
    context: 'onboarding',
    lines: [
      { text: `${name1} ו${name2}.`, delay: 800 },
      { text: 'נשמע כמו התחלה של משהו.', delay: 600 },
      { text: 'או אמצע.', delay: 800 },
      { text: 'בואו נגלה.', delay: 0 },
    ],
  }),
};

// פתיחת משחק
export const gameIntroText: DrCharifText = {
  id: 'game_intro',
  context: 'game_start',
  lines: [
    { text: 'נו, התיישבתם?', delay: 600 },
    { text: 'יש יין? טוב.', delay: 800 },
    { text: 'אני חריף.', delay: 600 },
    { text: 'שלושים שנה אני יושב מול זוגות שבאים אליי ואומרים "אנחנו בסדר, רק רצינו לחזק את הקשר".', delay: 1200 },
    { text: 'שקר.', delay: 800 },
    { text: 'אף אחד לא בא לחזק משהו שעובד.', delay: 800 },
    { text: 'אתם פה כי משהו מגרד.', delay: 600 },
    { text: 'וזה בסדר גמור.', delay: 800 },
    { text: 'הגירוד הזה שווה זהב.', delay: 600 },
    { text: 'בואו נגרד.', delay: 0 },
  ],
};

// פתיחות שלבים
export const stageIntros: Record<number, DrCharifText> = {
  1: {
    id: 'stage_1_intro',
    context: 'stage_intro',
    lines: [
      { text: 'שלב ראשון.', delay: 800 },
      { text: '"רגע לפני שנפגשנו"', delay: 1000 },
      { text: 'נחזור אחורה.', delay: 600 },
      { text: 'לפני שהכרתם.', delay: 600 },
      { text: 'לפני שהסתבכתם.', delay: 800 },
      { text: 'מי הייתם אז?', delay: 600 },
      { text: 'ומה נשאר מזה?', delay: 0 },
    ],
  },
  2: {
    id: 'stage_2_intro',
    context: 'stage_intro',
    lines: [
      { text: 'שלב שני.', delay: 800 },
      { text: '"הרמת כוסית"', delay: 1000 },
      { text: 'עכשיו נתחמם.', delay: 600 },
      { text: 'משימות קטנות. שאלות קלות.', delay: 600 },
      { text: 'כלום שיכול לפגוע.', delay: 800 },
      { text: 'עדיין.', delay: 0 },
    ],
  },
  3: {
    id: 'stage_3_intro',
    context: 'stage_intro',
    lines: [
      { text: 'שלב שלישי.', delay: 800 },
      { text: '"דברים שלא אומרים בקול"', delay: 1000 },
      { text: 'פה מתחילים לגעת במקומות הרכים.', delay: 800 },
      { text: 'הדברים שאתם חושבים ולא אומרים.', delay: 600 },
      { text: 'הדברים שאתם מרגישים ומעדיפים להתעלם.', delay: 800 },
      { text: 'הערב? אומרים אותם.', delay: 0 },
    ],
  },
  4: {
    id: 'stage_4_intro',
    context: 'stage_intro',
    lines: [
      { text: 'שלב רביעי.', delay: 800 },
      { text: '"מלחמת הגירסאות"', delay: 1000 },
      { text: 'כל סיפור יש לו שתי גירסאות.', delay: 600 },
      { text: 'שלך ושלה.', delay: 600 },
      { text: 'או שלך ושלו.', delay: 600 },
      { text: 'עכשיו נבדוק כמה הן רחוקות זו מזו.', delay: 0 },
    ],
  },
  5: {
    id: 'stage_5_intro',
    context: 'stage_intro',
    lines: [
      { text: 'שלב חמישי.', delay: 800 },
      { text: '"טמפרטורה עולה"', delay: 1000 },
      { text: 'עכשיו נכנסים לטריטוריה אחרת.', delay: 800 },
      { text: 'יש זוגות שהסקס שלהם נגמר לא כי הם לא רוצים אחד את השנייה.', delay: 800 },
      { text: 'הוא נגמר כי שניהם מחכים שהשני יתחיל.', delay: 600 },
      { text: 'שנים של "למה אני תמיד צריך להיות זה ש..."', delay: 800 },
      { text: 'עד שאף אחד לא מתחיל כלום.', delay: 800 },
      { text: 'הערב? אני מתחיל בשבילכם.', delay: 600 },
      { text: 'על מה תמשיכו - זה עליכם.', delay: 0 },
    ],
  },
};

// בחירת רמת עוצמה לשלב 5
export const intensitySelectionText: DrCharifText = {
  id: 'intensity_selection',
  context: 'stage_5',
  lines: [
    { text: 'לפני שנתחיל, צריך להחליט ביחד.', delay: 600 },
    { text: 'כמה רחוק אתם מוכנים ללכת הערב?', delay: 800 },
    { text: 'שלוש רמות:', delay: 600 },
    { text: 'רכה - נגיעות, לחישות, נשיקות.', delay: 600 },
    { text: 'בינונית - דברים יותר אינטימיים, אבל לא הכל.', delay: 800 },
    { text: 'חריפה - הכל על השולחן.', delay: 800 },
    { text: 'אין תשובה נכונה.', delay: 600 },
    { text: 'יש רק תשובה שלכם.', delay: 0 },
  ],
};

export const intensityChoiceTexts: Record<string, DrCharifText> = {
  soft: {
    id: 'intensity_soft',
    context: 'stage_5',
    lines: [
      { text: 'רמה רכה.', delay: 600 },
      { text: 'יש לי סטטיסטיקה מעניינת -', delay: 600 },
      { text: '80% מהזוגות מתחילים שם.', delay: 600 },
      { text: '60% מתחרטים באמצע הערב.', delay: 800 },
      { text: 'אבל אתם לא סטטיסטיקה.', delay: 600 },
      { text: 'אתם שני בני אדם עם הרגלים ופחדים ותקוות משלכם.', delay: 800 },
      { text: 'אז קחו את הרכה הזו ותהפכו אותה למשהו שלכם.', delay: 0 },
    ],
  },
  medium: {
    id: 'intensity_medium',
    context: 'stage_5',
    lines: [
      { text: 'רמה בינונית.', delay: 600 },
      { text: 'בחירה של אנשים שיודעים מה הם רוצים.', delay: 600 },
      { text: 'אבל גם יודעים מה הם לא מוכנים לעשות.', delay: 800 },
      { text: 'זה בסדר.', delay: 600 },
      { text: 'גבולות הם לא חולשה.', delay: 600 },
      { text: 'הם סימן שאתם מכירים את עצמכם.', delay: 0 },
    ],
  },
  spicy: {
    id: 'intensity_spicy',
    context: 'stage_5',
    lines: [
      { text: 'רמה חריפה.', delay: 600 },
      { text: 'וואו.', delay: 800 },
      { text: 'אוקיי.', delay: 600 },
      { text: 'אתם לא מפחדים, אה?', delay: 800 },
      { text: 'טוב. אני אוהב כאלה.', delay: 600 },
      { text: 'רק תזכרו -', delay: 600 },
      { text: '"לא" תמיד אופציה. גם באמצע.', delay: 600 },
      { text: 'עכשיו בואו נראה מה אתם עשויים.', delay: 0 },
    ],
  },
};

// טקסטים לפני שאלות
export const beforeQuestionTexts: DrCharifText[] = [
  {
    id: 'before_q_1',
    context: 'before_question',
    lines: [
      { text: 'השאלה הזו הולכת לשבת באוויר כמה שניות אחרי שתקראו אותה.', delay: 800 },
      { text: 'תרגישו דחף לענות מהר כדי לסיים את האי-נוחות.', delay: 600 },
      { text: 'אל.', delay: 800 },
      { text: 'האי-נוחות הזו?', delay: 600 },
      { text: 'זה המקום שבו הזוגיות גדלה.', delay: 600 },
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

// טקסטים אחרי תשובה כנה
export const afterHonestAnswerTexts: DrCharifText[] = [
  {
    id: 'after_honest_1',
    context: 'after_answer',
    lines: [
      { text: 'רגע.', delay: 600 },
      { text: 'עצרו.', delay: 600 },
      { text: 'מה שנאמר עכשיו?', delay: 600 },
      { text: 'זה לא טריוויה.', delay: 600 },
      { text: 'זה לא משחק.', delay: 800 },
      { text: 'מישהו פה עכשיו אמר משהו שעלה לו.', delay: 800 },
      { text: 'תסתכלו אחד על השנייה.', delay: 600 },
      { text: 'רואים?', delay: 600 },
      { text: 'זה הפנים של בן אדם שהוריד שריון.', delay: 800 },
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
      { text: 'שמעו, אני לא שופט.', delay: 600 },
      { text: 'יש דברים שהגוף פשוט אומר "לא היום".', delay: 800 },
      { text: 'הבעיה מתחילה כש"לא היום" הופך ל"לא אף פעם"', delay: 600 },
      { text: 'בלי שאף אחד שם לב למעבר.', delay: 800 },
      { text: 'אז רק תזכרו שהייתה פה שאלה.', delay: 600 },
      { text: 'היא לא הולכת לשום מקום.', delay: 0 },
    ],
  },
];

// מעברים בין שלבים
export const transitionTexts: DrCharifText[] = [
  {
    id: 'transition_1',
    context: 'transition',
    lines: [
      { text: 'אתם יודעים מה ההבדל בין זוגות שנשארים לזוגות שנפרדים?', delay: 800 },
      { text: 'לא אהבה.', delay: 600 },
      { text: 'לא סקס.', delay: 600 },
      { text: 'לא כסף.', delay: 800 },
      { text: 'סקרנות.', delay: 1000 },
      { text: 'הזוגות שנשארים עדיין סקרנים לגבי מה שהולך בראש של השני.', delay: 800 },
      { text: 'אלה שנפרדים?', delay: 600 },
      { text: 'הם בטוחים שהם כבר יודעים.', delay: 800 },
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
      { text: 'אתם יודעים מה מצחיק?', delay: 600 },
      { text: 'זוגות באים אליי אחרי עשר שנים ואומרים "הוא השתנה".', delay: 800 },
      { text: 'לא.', delay: 800 },
      { text: 'הוא תמיד היה ככה.', delay: 600 },
      { text: 'פשוט בהתחלה קראתם לזה "ספונטני"', delay: 600 },
      { text: 'ועכשיו אתם קוראים לזה "חסר אחריות".', delay: 800 },
      { text: 'המציאות לא השתנתה.', delay: 600 },
      { text: 'המילים שלכם השתנו.', delay: 0 },
    ],
  },
];

// פתיחת חידון
export const quizIntroText: DrCharifText = {
  id: 'quiz_intro',
  context: 'quiz',
  lines: [
    { text: 'עכשיו נגלה מי מכיר את מי.', delay: 800 },
    { text: 'טיפ -', delay: 600 },
    { text: 'זה לא מבחן.', delay: 600 },
    { text: 'אין ציון עובר.', delay: 600 },
    { text: 'יש רק מראה.', delay: 800 },
    { text: 'ומראות לא משקרות,', delay: 600 },
    { text: 'אבל הן גם לא מספרות את כל הסיפור.', delay: 800 },
    { text: 'מה שלא תדעו?', delay: 600 },
    { text: 'זו לא בושה.', delay: 600 },
    { text: 'זו הזמנה.', delay: 0 },
  ],
};

// חיבור מכשירים
export const deviceConnectionText: DrCharifText = {
  id: 'device_connection',
  context: 'quiz',
  lines: [
    { text: 'תרימו כל אחד את הטלפון שלו.', delay: 800 },
    { text: 'אחד מכם יקבל קוד.', delay: 600 },
    { text: 'השני יקליד אותו.', delay: 600 },
    { text: 'ארבע ספרות.', delay: 800 },
    { text: 'אם אתם לא מסוגלים לזכור ארבע ספרות ביחד אחרי כל השנים האלה,', delay: 600 },
    { text: 'יש לנו בעיות יותר גדולות מחידון.', delay: 0 },
  ],
};

// גלגל המזל
export const wheelIntroText: DrCharifText = {
  id: 'wheel_intro',
  context: 'wheel',
  lines: [
    { text: 'חמש עשרה אפשרויות.', delay: 800 },
    { text: 'לא אגיד לכם מה.', delay: 600 },
    { text: 'רק שחלק מהן נגמרות הלילה,', delay: 600 },
    { text: 'וחלק?', delay: 800 },
    { text: 'חלק ילוו אתכם עוד הרבה אחרי שתסגרו את האפליקציה.', delay: 800 },
    { text: 'גלגלו.', delay: 600 },
    { text: 'ושיהיה לכם מזל.', delay: 600 },
    { text: 'או שלא.', delay: 600 },
    { text: 'תלוי איזה צד של הגלגל אתם מעדיפים.', delay: 0 },
  ],
};

// סיום
export const endingText = (winnerName: string): DrCharifText => ({
  id: 'ending',
  context: 'ending',
  lines: [
    { text: 'הגענו לסוף ואתם עדיין ביחד על הספה.', delay: 800 },
    { text: 'אתם יודעים כמה זוגות לא מסיימים את הערב הזה על אותה ספה?', delay: 800 },
    { text: 'לא משנה מה הניקוד.', delay: 600 },
    { text: 'לא משנה מי ניצח.', delay: 600 },
    { text: `אבל אם זה חשוב לכם - ${winnerName} ניצח.`, delay: 800 },
    { text: 'מה שמשנה זה שבחרתם להיות פה.', delay: 600 },
    { text: 'אחד עם השנייה.', delay: 600 },
    { text: 'בערב שיכולתם לבזבז על נטפליקס.', delay: 800 },
    { text: 'הלכתם על משהו יותר קשה.', delay: 600 },
    { text: 'יותר לא נוח.', delay: 600 },
    { text: 'יותר אמיתי.', delay: 1000 },
    { text: 'עכשיו סגרו את הטלפון.', delay: 800 },
    { text: 'יש לכם עבודה לעשות.', delay: 600 },
    { text: 'מהסוג הטוב.', delay: 0 },
  ],
});

export const tieEndingText: DrCharifText = {
  id: 'tie_ending',
  context: 'ending',
  lines: [
    { text: 'הגענו לסוף.', delay: 800 },
    { text: 'תיקו.', delay: 600 },
    { text: 'מתאים.', delay: 800 },
    { text: 'בזוגיות טובה אף אחד לא באמת מנצח.', delay: 600 },
    { text: 'ואף אחד לא באמת מפסיד.', delay: 800 },
    { text: 'אתם פשוט ממשיכים.', delay: 600 },
    { text: 'ביחד.', delay: 1000 },
    { text: 'עכשיו סגרו את הטלפון.', delay: 800 },
    { text: 'יש לכם עבודה לעשות.', delay: 600 },
    { text: 'מהסוג הטוב.', delay: 0 },
  ],
};

// Paywall
export const paywallText: DrCharifText = {
  id: 'paywall',
  context: 'paywall',
  lines: [
    { text: 'אז זהו, פה נגמר הטעימה.', delay: 800 },
    { text: 'מה שמחכה לכם בפנים?', delay: 600 },
    { text: 'בואו נגיד שאתם עדיין לבושים מדי בשביל מה שתכננתי.', delay: 1000 },
    { text: '79 שקל.', delay: 600 },
    { text: 'פחות מבקבוק יין בינוני.', delay: 600 },
    { text: 'ויותר השפעה על הערב שלכם.', delay: 0 },
  ],
};

// רגע של חום מוסתר
export const warmthTexts: DrCharifText[] = [
  {
    id: 'warmth_1',
    context: 'warmth',
    lines: [
      { text: 'ראיתי המון זוגות.', delay: 600 },
      { text: 'יש כאלה שנכנסים לחדר ואתה מריח את העייפות.', delay: 800 },
      { text: 'ויש כאלה שנכנסים ואתה רואה -', delay: 600 },
      { text: 'הם עדיין רוצים.', delay: 800 },
      { text: 'רוצים שזה יעבוד.', delay: 600 },
      { text: 'אתם מהסוג השני.', delay: 800 },
      { text: 'אני יודע כי הסוג הראשון לא מוריד אפליקציות.', delay: 600 },
      { text: 'הוא מוריד עורכי דין.', delay: 0 },
    ],
  },
];
