import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  Easing,
  I18nManager,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Force RTL for Hebrew
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ===== THEME =====
const colors = {
  background: { primary: '#12081C', secondary: '#1E1028' },
  text: { primary: '#F7F3E8', secondary: '#9D8CA1' },
  accent: { gold: '#C9A87C', wine: '#6B2D42', wineLight: '#8B4D62', lavender: '#9D8CA1' },
};

// ===== DR. CHARIF AVATAR =====
const DrCharifAvatar = ({ isSpeaking, size = 80 }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const dotAnims = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, { toValue: 1.03, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breatheAnim, { toValue: 1, duration: 3000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (isSpeaking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.1, duration: 400, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        ])
      ).start();
      Animated.timing(glowAnim, { toValue: 0.8, duration: 300, useNativeDriver: true }).start();

      dotAnims.forEach((anim, i) => {
        setTimeout(() => {
          Animated.loop(
            Animated.sequence([
              Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true }),
              Animated.timing(anim, { toValue: 0.3, duration: 300, useNativeDriver: true }),
            ])
          ).start();
        }, i * 150);
      });
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
      Animated.timing(glowAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }).start();
      dotAnims.forEach(anim => { anim.stopAnimation(); anim.setValue(0.3); });
    }
  }, [isSpeaking]);

  return (
    <View style={[styles.avatarContainer, { width: size * 1.5, height: size * 1.5 }]}>
      <Animated.View style={[styles.avatarGlow, { width: size * 1.4, height: size * 1.4, borderRadius: size * 0.7, opacity: glowAnim, transform: [{ scale: breatheAnim }] }]} />
      <Animated.View style={{ transform: [{ scale: Animated.multiply(pulseAnim, breatheAnim) }] }}>
        <LinearGradient colors={[colors.accent.wine, colors.accent.wineLight, colors.accent.wine]} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={[styles.avatarInner, { borderRadius: size / 2 }]} />
        </LinearGradient>
      </Animated.View>
      {isSpeaking && (
        <View style={styles.speakingDots}>
          {dotAnims.map((anim, i) => (
            <Animated.View key={i} style={[styles.dot, { opacity: anim, transform: [{ scale: anim }] }]} />
          ))}
        </View>
      )}
    </View>
  );
};

// ===== DR. CHARIF TEXT (Line by line, not stacking) =====
const DrCharifText = ({ lines, onComplete, typingSpeed = 35, lineDelay = 800 }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];
    setIsTyping(true);
    setDisplayedText('');

    fadeAnim.setValue(0);
    slideAnim.setValue(15);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText(currentLine.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        if (currentLineIndex < lines.length - 1) {
          setTimeout(() => {
            Animated.parallel([
              Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
              Animated.timing(slideAnim, { toValue: -15, duration: 200, useNativeDriver: true }),
            ]).start(() => setCurrentLineIndex(prev => prev + 1));
          }, lineDelay);
        } else {
          setTimeout(() => onComplete?.(), lineDelay);
        }
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [currentLineIndex]);

  if (currentLineIndex >= lines.length) return null;

  return (
    <View style={styles.textContainer}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Text style={styles.drCharifText}>
          {displayedText}
          {isTyping && <Text style={styles.cursor}>|</Text>}
        </Text>
      </Animated.View>
    </View>
  );
};

// ===== DR. CHARIF EXPERIENCE =====
const DrCharifExperience = ({ lines, onComplete, showAvatar = true }) => {
  const [isSpeaking, setIsSpeaking] = useState(true);

  return (
    <LinearGradient colors={[colors.background.primary, colors.background.secondary, colors.background.primary]} style={styles.experienceContainer}>
      <View style={styles.ambientGlow} />
      {showAvatar && (
        <View style={styles.avatarSection}>
          <DrCharifAvatar isSpeaking={isSpeaking} size={80} />
        </View>
      )}
      <DrCharifText
        lines={lines}
        onComplete={() => { setIsSpeaking(false); onComplete?.(); }}
        typingSpeed={35}
        lineDelay={700}
      />
    </LinearGradient>
  );
};

// ===== DEEP PSYCHOLOGICAL QUESTIONS =====
const questions = [
  { id: 1, stage: 1, difficulty: 1, text: 'אם הייתי פוגש אותך בגיל 16 - הייתי מוצא חן בעיניך?' },
  { id: 2, stage: 1, difficulty: 2, text: 'מה הדבר שחשבת עליי בשבועות הראשונים ולא העזת להגיד עד היום?' },
  { id: 3, stage: 1, difficulty: 2, text: 'אם היינו נפגשים היום בפעם הראשונה - היית מתחיל/ה איתי?' },
  { id: 4, stage: 1, difficulty: 2, text: 'איזה חלק מעצמך מתקופה לפני שהכרת אותי אתה מתגעגע אליו?' },
  { id: 5, stage: 1, difficulty: 3, text: 'מה ויתרת עליו בשבילנו שאתה עדיין לא בטוח שזה היה שווה?' },
  { id: 6, stage: 1, difficulty: 3, text: 'מה שיקרת לי עליו בהתחלה כי רצית שאתרשם?' },
  { id: 7, stage: 2, difficulty: 1, text: 'במה אני יותר טוב ממך ובמה את/ה יותר טוב ממני?' },
  { id: 8, stage: 2, difficulty: 1, text: 'מה לדעתך החברים שלנו אומרים עלינו כשאנחנו לא בחדר?' },
  { id: 9, stage: 2, difficulty: 2, text: 'מה הדבר הכי קטן שאני עושה שמשגע אותך - בטוב?' },
  { id: 10, stage: 2, difficulty: 2, text: 'מה הדבר שאני עושה שמעצבן אותך אבל אתה כבר הפסקת להעיר עליו?' },
  { id: 11, stage: 2, difficulty: 3, text: 'מה לדעתך המשפחה שלי באמת חושבת עליך?' },
  { id: 12, stage: 2, difficulty: 3, text: 'מה הדבר שאני עושה שגורם לך לחשוב "למה התחתנתי עם זה"?' },
];

const tasks = [
  { id: 1, stage: 1, difficulty: 1, text: 'פתח את הגלריה בטלפון, מצא תמונה מלפני שהכרתם, הראה ל{partner} וספר מה עבר לך בראש כשצולמה.', isTask: true },
  { id: 2, stage: 1, difficulty: 2, text: 'תאר ל{partner} את הרגע המדויק שבו הבנת שאתה נופל. לא "מתי התאהבת" - הרגע עצמו.', isTask: true },
  { id: 3, stage: 2, difficulty: 1, text: 'הסתכלו אחד לשנייה בעיניים 60 שניות מלאות. בלי לדבר, בלי לצחוק. מי ששובר קודם - שותה.', isTask: true },
  { id: 4, stage: 2, difficulty: 2, text: 'אמור ל{partner} שלושה דברים שאתה אוהב בו/בה - שלא קשורים למראה או להצלחות.', isTask: true },
  { id: 5, stage: 2, difficulty: 3, text: 'יש לך 30 שניות לומר ל{partner} משהו שאתה תמיד רוצה להגיד אבל תמיד עוצר את עצמך. עכשיו.', isTask: true },
];

// ===== DR. CHARIF TEXTS =====
const drCharifTexts = {
  splash: [
    'טוב.',
    'הגעתם.',
    'לא משנה מה הסיבה.',
    'משהו הביא אתכם.',
    'סקרנות. שעמום. פחד. תקווה.',
    'אולי הכל ביחד.',
    'זוגות שנכנסים לפה - יוצאים אחרת.',
    'לא בטוח יותר טובים.',
    'אבל בטוח יותר אמיתיים.',
    'בואו נתחיל.',
  ],
  gameIntro: [
    'התיישבתם? יש יין?',
    'טוב.',
    'אני חריף.',
    'שלושים שנה אני יושב מול זוגות.',
    'שבאים ואומרים "אנחנו בסדר".',
    'שקר.',
    'אתם פה כי משהו מגרד.',
    'וזה בסדר.',
    'הגירוד הזה שווה זהב.',
    'בואו נגרד.',
  ],
  stageIntros: {
    1: ['שלב ראשון.', 'רגע לפני שנפגשנו.', 'מי הייתם אז?', 'ומה נשאר מזה?'],
    2: ['שלב שני.', 'הרמת כוסית.', 'עכשיו שהתחממנו,', 'בואו נעמיק.'],
  },
  ending: [
    'הגענו לסוף.',
    'ואתם עדיין ביחד על הספה.',
    'לא משנה מה הניקוד.',
    'מה שמשנה זה שבחרתם להיות פה.',
    'עכשיו סגרו את הטלפון.',
    'יש לכם עבודה לעשות.',
    'מהסוג הטוב.',
  ],
};

// ===== BUTTON =====
const Button = ({ title, onPress, variant = 'primary', disabled = false }) => (
  <TouchableOpacity
    style={[styles.button, variant === 'primary' && styles.buttonPrimary, variant === 'outline' && styles.buttonOutline, disabled && styles.buttonDisabled]}
    onPress={() => { Vibration.vibrate(10); onPress(); }}
    disabled={disabled}
  >
    <Text style={[styles.buttonText, variant === 'outline' && styles.buttonTextOutline]}>{title}</Text>
  </TouchableOpacity>
);

// ===== SCREENS =====
const SplashScreen = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  return (
    <View style={styles.screen}>
      <DrCharifExperience lines={drCharifTexts.splash} onComplete={() => setShowButton(true)} />
      {showButton && (
        <View style={styles.buttonContainer}>
          <Button title="להיכנס" onPress={onComplete} />
        </View>
      )}
    </View>
  );
};

const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const getLines = () => {
    if (step === 0) return ['קודם כל,', 'איך קוראים לך?'];
    if (step === 1) return ['יפה.', 'ומי בא איתך הערב?'];
    return [`${name1} ו${name2}.`, 'נשמע כמו התחלה של משהו.', 'או אמצע.', 'בואו נגלה.'];
  };

  const handleNext = () => {
    if (step === 0 && name1) { setStep(1); setShowInput(false); }
    else if (step === 1 && name2) { setStep(2); setShowInput(false); }
    else if (step === 2) onComplete({ name1, name2 });
  };

  return (
    <View style={styles.screen}>
      <DrCharifExperience key={step} lines={getLines()} onComplete={() => step < 2 ? setShowInput(true) : setShowButton(true)} />
      {showInput && (
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder={step === 0 ? "השם שלך" : "השם של בן/בת הזוג"}
            placeholderTextColor={colors.text.secondary}
            value={step === 0 ? name1 : name2}
            onChangeText={step === 0 ? setName1 : setName2}
            autoFocus
          />
          <Button title="המשך" onPress={handleNext} disabled={step === 0 ? !name1 : !name2} />
        </View>
      )}
      {showButton && step === 2 && (
        <View style={styles.buttonContainer}>
          <Button title="בואו נתחיל" onPress={handleNext} />
        </View>
      )}
    </View>
  );
};

const GameIntroScreen = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  return (
    <View style={styles.screen}>
      <DrCharifExperience lines={drCharifTexts.gameIntro} onComplete={() => setShowButton(true)} />
      {showButton && <View style={styles.buttonContainer}><Button title="מוכנים" onPress={onComplete} /></View>}
    </View>
  );
};

const StageIntroScreen = ({ stage, onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const stageNames = { 1: 'רגע לפני שנפגשנו', 2: 'הרמת כוסית' };

  return (
    <View style={styles.screen}>
      <View style={styles.stageHeader}>
        <View style={styles.stageNumber}><Text style={styles.stageNumberText}>{stage}</Text></View>
        <Text style={styles.stageName}>{stageNames[stage]}</Text>
      </View>
      <DrCharifExperience lines={drCharifTexts.stageIntros[stage]} onComplete={() => setShowButton(true)} showAvatar={false} />
      {showButton && <View style={styles.buttonContainer}><Button title="יאללה" onPress={onComplete} /></View>}
    </View>
  );
};

const QuestionCard = ({ item, isTask, player, partnerName, onAnswer, onVeto, vetosLeft }) => {
  const [answer, setAnswer] = useState('');
  const difficultyPoints = { 1: 10, 2: 20, 3: 35 };
  const difficultyLabels = { 1: 'קל', 2: 'בינוני', 3: 'אמיץ' };
  const text = item.text.replace(/{partner}/g, partnerName);

  return (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <Text style={styles.playerName}>התור של {player}</Text>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{difficultyLabels[item.difficulty]} • {difficultyPoints[item.difficulty]} נק׳</Text>
        </View>
      </View>
      <Text style={styles.questionText}>{text}</Text>
      {!isTask ? (
        <View style={styles.answerSection}>
          <TextInput style={styles.answerInput} placeholder="התשובה שלך..." placeholderTextColor={colors.text.secondary} value={answer} onChangeText={setAnswer} multiline />
          <View style={styles.questionButtons}>
            <Button title="אישור" onPress={() => onAnswer(answer)} disabled={!answer.trim()} />
            {vetosLeft > 0 && <Button title={`וטו (${vetosLeft})`} onPress={onVeto} variant="outline" />}
          </View>
        </View>
      ) : (
        <View style={styles.taskSection}>
          <Text style={styles.taskInstruction}>בצעו את המשימה ובן/בת הזוג יאשר</Text>
          <View style={styles.questionButtons}>
            <Button title="בוצע!" onPress={() => onAnswer('completed')} />
            {vetosLeft > 0 && <Button title={`וטו (${vetosLeft})`} onPress={onVeto} variant="outline" />}
          </View>
        </View>
      )}
    </View>
  );
};

const GamePlayScreen = ({ stage, players, onStageComplete }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [vetos, setVetos] = useState({ player1: 3, player2: 3 });

  const stageQuestions = questions.filter(q => q.stage === stage);
  const stageTasks = tasks.filter(t => t.stage === stage);
  const allItems = [...stageQuestions.map(q => ({ ...q, isTask: false })), ...stageTasks.map(t => ({ ...t, isTask: true }))];

  const currentPlayer = currentTurn % 2 === 0 ? 'player1' : 'player2';
  const currentPlayerName = currentPlayer === 'player1' ? players.name1 : players.name2;
  const partnerName = currentPlayer === 'player1' ? players.name2 : players.name1;

  if (currentItemIndex >= allItems.length) {
    return (
      <View style={styles.screen}>
        <View style={styles.stageCompleteContent}>
          <Text style={styles.stageCompleteTitle}>סיום שלב {stage}!</Text>
          <View style={styles.scoresContainer}>
            <Text style={styles.scoreText}>{players.name1}: {scores.player1} נק׳</Text>
            <Text style={styles.scoreText}>{players.name2}: {scores.player2} נק׳</Text>
          </View>
          <Button title="לשלב הבא" onPress={() => onStageComplete(scores)} />
        </View>
      </View>
    );
  }

  const currentItem = allItems[currentItemIndex];
  const difficultyPoints = { 1: 10, 2: 20, 3: 35 };

  const handleAnswer = () => {
    setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + difficultyPoints[currentItem.difficulty] }));
    setCurrentItemIndex(prev => prev + 1);
    setCurrentTurn(prev => prev + 1);
  };

  const handleVeto = () => {
    setVetos(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] - 1 }));
    setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] - 15 }));
    setCurrentItemIndex(prev => prev + 1);
    setCurrentTurn(prev => prev + 1);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.gameHeader}>
        <Text style={styles.scoreSmall}>{players.name1}: {scores.player1}</Text>
        <Text style={styles.stageIndicator}>שלב {stage}</Text>
        <Text style={styles.scoreSmall}>{players.name2}: {scores.player2}</Text>
      </View>
      <View style={styles.gameContent}>
        <QuestionCard item={currentItem} isTask={currentItem.isTask} player={currentPlayerName} partnerName={partnerName} onAnswer={handleAnswer} onVeto={handleVeto} vetosLeft={vetos[currentPlayer]} />
      </View>
      <Text style={styles.progressText}>{currentItemIndex + 1} / {allItems.length}</Text>
    </View>
  );
};

const PaywallScreen = ({ onPurchase, onBack }) => (
  <View style={styles.screen}>
    <DrCharifExperience
      lines={['אז זהו, פה נגמרת הטעימה.', 'מה שמחכה לכם בפנים?', 'בואו נגיד שאתם עדיין לבושים מדי.', 'שלבים 3-7 כוללים:', 'דברים שלא אומרים בקול.', 'טמפרטורה עולה.', 'החידון הזוגי.', 'גלגל המזל.']}
      onComplete={() => {}}
    />
    <View style={styles.paywallContent}>
      <View style={styles.priceCard}>
        <Text style={styles.priceAmount}>79 ₪</Text>
        <Text style={styles.priceDescription}>קנייה חד פעמית • גישה מלאה</Text>
      </View>
      <Button title="לפתוח הכל" onPress={onPurchase} />
      <TouchableOpacity onPress={onBack} style={styles.backLink}>
        <Text style={styles.backLinkText}>אולי אחר כך</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ResultsScreen = ({ players, scores, onRestart }) => {
  const [showContent, setShowContent] = useState(false);
  const winner = scores.player1 > scores.player2 ? players.name1 : scores.player2 > scores.player1 ? players.name2 : 'תיקו!';

  return (
    <View style={styles.screen}>
      <DrCharifExperience lines={drCharifTexts.ending} onComplete={() => setShowContent(true)} />
      {showContent && (
        <View style={styles.resultsContent}>
          <Text style={styles.resultsTitle}>{winner === 'תיקו!' ? 'תיקו!' : `${winner} ניצח/ה!`}</Text>
          <View style={styles.finalScores}>
            <Text style={styles.finalScoreText}>{players.name1}: {scores.player1} נק׳</Text>
            <Text style={styles.finalScoreText}>{players.name2}: {scores.player2} נק׳</Text>
          </View>
          <Button title="משחק חדש" onPress={onRestart} variant="outline" />
        </View>
      )}
    </View>
  );
};

// ===== MAIN APP =====
export default function App() {
  const [screen, setScreen] = useState('splash');
  const [players, setPlayers] = useState({ name1: '', name2: '' });
  const [currentStage, setCurrentStage] = useState(1);
  const [totalScores, setTotalScores] = useState({ player1: 0, player2: 0 });
  const [isPremium, setIsPremium] = useState(false);

  const handleStageComplete = (stageScores) => {
    setTotalScores(prev => ({ player1: prev.player1 + stageScores.player1, player2: prev.player2 + stageScores.player2 }));
    if (currentStage === 2 && !isPremium) setScreen('paywall');
    else if (currentStage < 2) { setCurrentStage(prev => prev + 1); setScreen('stageIntro'); }
    else setScreen('results');
  };

  const handleRestart = () => {
    setScreen('splash');
    setPlayers({ name1: '', name2: '' });
    setCurrentStage(1);
    setTotalScores({ player1: 0, player2: 0 });
  };

  return (
    <View style={styles.container}>
      {screen === 'splash' && <SplashScreen onComplete={() => setScreen('onboarding')} />}
      {screen === 'onboarding' && <OnboardingScreen onComplete={(p) => { setPlayers(p); setScreen('gameIntro'); }} />}
      {screen === 'gameIntro' && <GameIntroScreen onComplete={() => setScreen('stageIntro')} />}
      {screen === 'stageIntro' && <StageIntroScreen stage={currentStage} onComplete={() => setScreen('gameplay')} />}
      {screen === 'gameplay' && <GamePlayScreen stage={currentStage} players={players} onStageComplete={handleStageComplete} />}
      {screen === 'paywall' && <PaywallScreen onPurchase={() => { setIsPremium(true); setCurrentStage(3); setScreen('stageIntro'); }} onBack={() => setScreen('results')} />}
      {screen === 'results' && <ResultsScreen players={players} scores={totalScores} onRestart={handleRestart} />}
    </View>
  );
}

// ===== STYLES =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  screen: { flex: 1 },
  experienceContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ambientGlow: { position: 'absolute', top: SCREEN_HEIGHT * 0.25, width: 250, height: 250, borderRadius: 125, backgroundColor: colors.accent.wine, opacity: 0.1 },

  // Avatar
  avatarContainer: { alignItems: 'center', justifyContent: 'center' },
  avatarGlow: { position: 'absolute', backgroundColor: colors.accent.wine },
  avatar: { alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.accent.gold },
  avatarInner: { position: 'absolute', top: '20%', left: '20%', right: '20%', bottom: '20%', backgroundColor: 'rgba(255,255,255,0.1)' },
  avatarSection: { marginBottom: 40 },
  speakingDots: { position: 'absolute', bottom: -20, flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent.gold },

  // Text
  textContainer: { minHeight: 80, justifyContent: 'center', paddingHorizontal: 32 },
  drCharifText: { fontSize: 22, lineHeight: 36, color: colors.text.primary, textAlign: 'center', fontStyle: 'italic' },
  cursor: { color: colors.accent.gold, fontWeight: '100' },

  // Button
  buttonContainer: { position: 'absolute', bottom: 60, left: 40, right: 40 },
  button: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30, alignItems: 'center', marginVertical: 8 },
  buttonPrimary: { backgroundColor: colors.accent.gold },
  buttonOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.accent.gold },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: colors.background.primary, fontSize: 18, fontWeight: '600' },
  buttonTextOutline: { color: colors.accent.gold },

  // Input
  inputSection: { position: 'absolute', bottom: 60, left: 40, right: 40 },
  input: { backgroundColor: colors.background.secondary, borderRadius: 12, padding: 16, color: colors.text.primary, fontSize: 18, textAlign: 'right', marginBottom: 16, borderWidth: 1, borderColor: colors.accent.lavender + '40' },

  // Stage
  stageHeader: { alignItems: 'center', paddingTop: 80, paddingBottom: 20 },
  stageNumber: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.accent.wine, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  stageNumberText: { color: colors.text.primary, fontSize: 24, fontWeight: 'bold' },
  stageName: { color: colors.accent.gold, fontSize: 22, fontWeight: '600' },

  // Game
  gameHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: colors.accent.lavender + '30' },
  scoreSmall: { color: colors.text.secondary, fontSize: 14 },
  stageIndicator: { color: colors.accent.gold, fontSize: 16, fontWeight: '600' },
  gameContent: { flex: 1, justifyContent: 'center', padding: 20 },
  progressText: { color: colors.text.secondary, textAlign: 'center', paddingBottom: 40 },

  // Question Card
  questionCard: { backgroundColor: colors.background.secondary, borderRadius: 20, padding: 24, borderWidth: 1, borderColor: colors.accent.lavender + '30' },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  playerName: { color: colors.accent.gold, fontSize: 16, fontWeight: '600' },
  difficultyBadge: { backgroundColor: colors.accent.wine + '60', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  difficultyText: { color: colors.text.primary, fontSize: 12 },
  questionText: { color: colors.text.primary, fontSize: 20, lineHeight: 30, textAlign: 'right', marginBottom: 24 },
  answerSection: { marginTop: 8 },
  answerInput: { backgroundColor: colors.background.primary, borderRadius: 12, padding: 16, color: colors.text.primary, fontSize: 16, textAlign: 'right', minHeight: 80, marginBottom: 16, textAlignVertical: 'top' },
  questionButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  taskSection: { alignItems: 'center' },
  taskInstruction: { color: colors.text.secondary, fontSize: 14, marginBottom: 20, textAlign: 'center' },

  // Stage Complete
  stageCompleteContent: { flex: 1, justifyContent: 'center', padding: 40 },
  stageCompleteTitle: { color: colors.accent.gold, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  scoresContainer: { backgroundColor: colors.background.secondary, borderRadius: 16, padding: 24, marginBottom: 24 },
  scoreText: { color: colors.text.primary, fontSize: 20, textAlign: 'center', marginVertical: 8 },

  // Paywall
  paywallContent: { position: 'absolute', bottom: 40, left: 20, right: 20 },
  priceCard: { backgroundColor: colors.background.secondary, borderRadius: 20, padding: 24, alignItems: 'center', marginBottom: 20, borderWidth: 2, borderColor: colors.accent.gold },
  priceAmount: { color: colors.accent.gold, fontSize: 40, fontWeight: 'bold' },
  priceDescription: { color: colors.text.secondary, fontSize: 14, marginTop: 8 },
  backLink: { marginTop: 16, alignItems: 'center' },
  backLinkText: { color: colors.text.secondary, fontSize: 16, textDecorationLine: 'underline' },

  // Results
  resultsContent: { position: 'absolute', bottom: 60, left: 40, right: 40, alignItems: 'center' },
  resultsTitle: { color: colors.accent.gold, fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  finalScores: { backgroundColor: colors.background.secondary, borderRadius: 16, padding: 20, width: '100%', marginBottom: 20 },
  finalScoreText: { color: colors.text.primary, fontSize: 18, textAlign: 'center', marginVertical: 4 },
});
