import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
  I18nManager,
} from 'react-native';

// Force RTL for Hebrew
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// ===== THEME =====
const colors = {
  background: { primary: '#12081C', secondary: '#1E1028' },
  text: { primary: '#F7F3E8', secondary: '#9D8CA1' },
  accent: { gold: '#C9A87C', wine: '#6B2D42', lavender: '#9D8CA1' },
};

// ===== DR. CHARIF TEXTS =====
const drCharifTexts = {
  splash: [
    'טוב.',
    'הגעתם.',
    'לא משנה מה הסיבה.',
    'לא משנה מה אמרתם לעצמכם בדרך לפה.',
    'משהו הביא אתכם.',
    'סקרנות. שעמום. פחד. תקווה.',
    'אולי הכל ביחד.',
    'אני לא הולך לספר לכם מה מחכה לכם.',
    'אני רק הולך להגיד שזוגות שנכנסים לפה - יוצאים אחרת.',
    'לא בטוח יותר טובים.',
    'אבל בטוח יותר אמיתיים.',
    'אז אם אתם מוכנים להסיר קצת שכבות -',
    'בואו נתחיל.',
  ],
  askName1: 'קודם כל, איך קוראים לך?',
  askName2: 'יפה. ומי בא איתך הערב?',
  afterNames: (n1, n2) => [`${n1} ו${n2}.`, 'נשמע כמו התחלה של משהו.', 'או אמצע.', 'בואו נגלה.'],
  gameIntro: [
    'נו, התיישבתם? יש יין? טוב.',
    'אני חריף.',
    'שלושים שנה אני יושב מול זוגות שבאים אליי ואומרים "אנחנו בסדר, רק רצינו לחזק את הקשר".',
    'שקר.',
    'אף אחד לא בא לחזק משהו שעובד.',
    'אתם פה כי משהו מגרד.',
    'וזה בסדר גמור.',
    'הגירוד הזה שווה זהב.',
    'בואו נגרד.',
  ],
  stageIntros: {
    1: ['שלב ראשון.', 'רגע לפני שנפגשנו.', 'נחזור אחורה.', 'לפני שהכרתם.', 'לפני שהסתבכתם.', 'מי הייתם אז?', 'ומה נשאר מזה?'],
    2: ['שלב שני.', 'הרמת כוסית.', 'עכשיו שהתחממנו קצת,', 'בואו נשחק.', 'כוסות למעלה.'],
  },
  beforeQuestion: [
    'השאלה הזו הולכת לשבת באוויר כמה שניות.',
    'תרגישו דחף לענות מהר כדי לסיים את האי-נוחות.',
    'אל.',
    'האי-נוחות הזו? זה המקום שבו הזוגיות גדלה.',
  ],
  afterVeto: [
    'וטו.',
    'שמעו, אני לא שופט.',
    'יש דברים שהגוף פשוט אומר "לא היום".',
    'רק תזכרו שהייתה פה שאלה.',
    'היא לא הולכת לשום מקום.',
  ],
};

// ===== QUESTIONS DATA =====
const questions = [
  { id: 1, stage: 1, difficulty: 1, text: 'מה הדבר הראשון שחשבת כשראית אותי בפעם הראשונה? האמת.' },
  { id: 2, stage: 1, difficulty: 2, text: 'איזה חלק בגוף שלי הכי משך אותך בהתחלה?' },
  { id: 3, stage: 1, difficulty: 1, text: 'מה עשית בדיוק לפני שהכרנו? איך נראה היום ההוא?' },
  { id: 4, stage: 1, difficulty: 3, text: 'באיזה שלב ידעת שאתה רוצה להיות איתי? ולמה דווקא אז?' },
  { id: 5, stage: 1, difficulty: 2, text: 'מה היה הרגע שבו אמרת לעצמך "וואו, זה רציני"?' },
  { id: 6, stage: 1, difficulty: 1, text: 'איזה שיר היה ברקע בתקופה שהכרנו?' },
  { id: 7, stage: 1, difficulty: 3, text: 'מה כמעט גרם לך לוותר עליי בהתחלה?' },
  { id: 8, stage: 1, difficulty: 2, text: 'איך תיארת אותי לחברים שלך אחרי הפגישה הראשונה?' },
  { id: 9, stage: 2, difficulty: 1, text: 'מה הדבר הכי קטן שאני עושה שמשגע אותך?' },
  { id: 10, stage: 2, difficulty: 2, text: 'אם היית יכול לשנות דבר אחד בשגרה שלנו, מה זה היה?' },
  { id: 11, stage: 2, difficulty: 1, text: 'מתי בפעם האחרונה שיקרתי לך? על מה?' },
  { id: 12, stage: 2, difficulty: 3, text: 'מה אתה באמת חושב על ההורים שלי?' },
  { id: 13, stage: 2, difficulty: 2, text: 'איזה הרגל שלי הכי מעצבן אותך אבל אתה לא אומר?' },
  { id: 14, stage: 2, difficulty: 1, text: 'מה הדבר האחרון שעשיתי שגרם לך להתגאות בי?' },
  { id: 15, stage: 2, difficulty: 3, text: 'אם היינו נפרדים מחר, מה היית מתגעגע אליו הכי הרבה?' },
  { id: 16, stage: 2, difficulty: 2, text: 'מה הסוד הכי קטן ששמרת ממני השבוע?' },
];

const tasks = [
  { id: 1, stage: 1, difficulty: 1, text: 'תסתכלו אחד לשנייה בעיניים 30 שניות בלי לדבר.' },
  { id: 2, stage: 1, difficulty: 2, text: 'ספר/י לבן/בת הזוג משהו שמעולם לא סיפרת.' },
  { id: 3, stage: 2, difficulty: 1, text: 'הרימו כוסית ואמרו למה אתם שותים.' },
  { id: 4, stage: 2, difficulty: 2, text: 'תנו לבן/בת הזוג מסאז\' של דקה במקום שהוא/היא בוחר/ת.' },
  { id: 5, stage: 2, difficulty: 3, text: 'שלחו הודעה לחבר/ה ותספרו משהו מביך על עצמכם.' },
];

// ===== TYPEWRITER COMPONENT =====
const TypewriterText = ({ lines, onComplete, speed = 50, lineDelay = 800 }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete?.();
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (charIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setCurrentText(prev => prev + currentLine[charIndex]);
        setCharIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, currentText]);
        setCurrentText('');
        setCharIndex(0);
        setCurrentLineIndex(prev => prev + 1);
      }, lineDelay);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, charIndex, lines, speed, lineDelay]);

  return (
    <View style={styles.typewriterContainer}>
      {displayedLines.map((line, index) => (
        <Text key={index} style={styles.drCharifText}>{line}</Text>
      ))}
      {currentText && <Text style={styles.drCharifText}>{currentText}<Text style={styles.cursor}>|</Text></Text>}
    </View>
  );
};

// ===== BUTTON COMPONENT =====
const Button = ({ title, onPress, variant = 'primary', disabled = false }) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'primary' && styles.buttonPrimary,
      variant === 'secondary' && styles.buttonSecondary,
      variant === 'outline' && styles.buttonOutline,
      disabled && styles.buttonDisabled,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.buttonText, variant === 'outline' && styles.buttonTextOutline]}>
      {title}
    </Text>
  </TouchableOpacity>
);

// ===== SCREENS =====

// Splash Screen
const SplashScreen = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <TypewriterText
          lines={drCharifTexts.splash}
          onComplete={() => setShowButton(true)}
          speed={40}
          lineDelay={600}
        />
      </View>
      {showButton && (
        <View style={styles.buttonContainer}>
          <Button title="להיכנס" onPress={onComplete} />
        </View>
      )}
    </View>
  );
};

// Onboarding Screen
const OnboardingScreen = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleNext = () => {
    if (step === 0 && name1) {
      setStep(1);
      setShowInput(false);
      setShowButton(false);
    } else if (step === 1 && name2) {
      setStep(2);
      setShowInput(false);
      setShowButton(false);
    } else if (step === 2) {
      onComplete({ name1, name2 });
    }
  };

  const getLines = () => {
    if (step === 0) return [drCharifTexts.askName1];
    if (step === 1) return [drCharifTexts.askName2];
    return drCharifTexts.afterNames(name1, name2);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <TypewriterText
          key={step}
          lines={getLines()}
          onComplete={() => {
            if (step < 2) setShowInput(true);
            else setShowButton(true);
          }}
        />
        {showInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={step === 0 ? "השם שלך" : "השם של בן/בת הזוג"}
              placeholderTextColor={colors.text.secondary}
              value={step === 0 ? name1 : name2}
              onChangeText={step === 0 ? setName1 : setName2}
              autoFocus
            />
            <Button
              title="המשך"
              onPress={handleNext}
              disabled={step === 0 ? !name1 : !name2}
            />
          </View>
        )}
        {showButton && step === 2 && (
          <View style={styles.buttonContainer}>
            <Button title="בואו נתחיל" onPress={handleNext} />
          </View>
        )}
      </View>
    </View>
  );
};

// Game Intro Screen
const GameIntroScreen = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <TypewriterText
          lines={drCharifTexts.gameIntro}
          onComplete={() => setShowButton(true)}
        />
      </View>
      {showButton && (
        <View style={styles.buttonContainer}>
          <Button title="מוכנים" onPress={onComplete} />
        </View>
      )}
    </View>
  );
};

// Stage Intro Screen
const StageIntroScreen = ({ stage, onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const stageNames = { 1: 'רגע לפני שנפגשנו', 2: 'הרמת כוסית' };

  return (
    <View style={styles.screen}>
      <View style={styles.stageHeader}>
        <View style={styles.stageNumber}>
          <Text style={styles.stageNumberText}>{stage}</Text>
        </View>
        <Text style={styles.stageName}>{stageNames[stage]}</Text>
      </View>
      <View style={styles.content}>
        <TypewriterText
          lines={drCharifTexts.stageIntros[stage]}
          onComplete={() => setShowButton(true)}
        />
      </View>
      {showButton && (
        <View style={styles.buttonContainer}>
          <Button title="יאללה" onPress={onComplete} />
        </View>
      )}
    </View>
  );
};

// Question Card
const QuestionCard = ({ item, isTask, player, onAnswer, onVeto, vetosLeft }) => {
  const [answer, setAnswer] = useState('');
  const difficultyPoints = { 1: 10, 2: 20, 3: 35 };
  const difficultyLabels = { 1: 'קל', 2: 'בינוני', 3: 'אמיץ' };

  return (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <Text style={styles.playerName}>התור של {player}</Text>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>
            {difficultyLabels[item.difficulty]} • {difficultyPoints[item.difficulty]} נק׳
          </Text>
        </View>
      </View>

      <Text style={styles.questionText}>{item.text}</Text>

      {!isTask ? (
        <View style={styles.answerSection}>
          <TextInput
            style={styles.answerInput}
            placeholder="התשובה שלך..."
            placeholderTextColor={colors.text.secondary}
            value={answer}
            onChangeText={setAnswer}
            multiline
          />
          <View style={styles.questionButtons}>
            <Button
              title="אישור"
              onPress={() => onAnswer(answer)}
              disabled={!answer.trim()}
            />
            {vetosLeft > 0 && (
              <Button
                title={`וטו (${vetosLeft})`}
                onPress={onVeto}
                variant="outline"
              />
            )}
          </View>
        </View>
      ) : (
        <View style={styles.taskSection}>
          <Text style={styles.taskInstruction}>בצעו את המשימה ובן/בת הזוג יאשר</Text>
          <View style={styles.questionButtons}>
            <Button title="בוצע!" onPress={() => onAnswer('completed')} />
            {vetosLeft > 0 && (
              <Button
                title={`וטו (${vetosLeft})`}
                onPress={onVeto}
                variant="outline"
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

// Game Play Screen
const GamePlayScreen = ({ stage, players, onStageComplete }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [vetos, setVetos] = useState({ player1: 3, player2: 3 });

  const stageQuestions = questions.filter(q => q.stage === stage);
  const stageTasks = tasks.filter(t => t.stage === stage);
  const allItems = [...stageQuestions.map(q => ({ ...q, isTask: false })),
                    ...stageTasks.map(t => ({ ...t, isTask: true }))];

  const currentPlayer = currentTurn % 2 === 0 ? 'player1' : 'player2';
  const currentPlayerName = currentPlayer === 'player1' ? players.name1 : players.name2;

  if (currentItemIndex >= allItems.length) {
    return (
      <View style={styles.screen}>
        <View style={styles.content}>
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

  const handleAnswer = (answer) => {
    setScores(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + difficultyPoints[currentItem.difficulty]
    }));
    setCurrentItemIndex(prev => prev + 1);
    setCurrentTurn(prev => prev + 1);
  };

  const handleVeto = () => {
    setVetos(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] - 1
    }));
    setScores(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] - 15
    }));
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
      <View style={styles.content}>
        <QuestionCard
          item={currentItem}
          isTask={currentItem.isTask}
          player={currentPlayerName}
          onAnswer={handleAnswer}
          onVeto={handleVeto}
          vetosLeft={vetos[currentPlayer]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentItemIndex + 1} / {allItems.length}
      </Text>
    </View>
  );
};

// Paywall Screen
const PaywallScreen = ({ onPurchase, onBack }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <TypewriterText
          lines={[
            'אז זהו, פה נגמרת הטעימה.',
            'מה שמחכה לכם בפנים?',
            'בואו נגיד שאתם עדיין לבושים מדי בשביל מה שתכננתי.',
            'שלבים 3-7 כוללים:',
            '• דברים שלא אומרים בקול',
            '• מלחמת הגירסאות',
            '• טמפרטורה עולה 🔥',
            '• החידון הזוגי',
            '• גלגל המזל עם פרסים',
          ]}
          onComplete={() => {}}
        />
        <View style={styles.priceCard}>
          <Text style={styles.priceAmount}>79 ₪</Text>
          <Text style={styles.priceDescription}>קנייה חד פעמית • גישה מלאה לנצח</Text>
        </View>
        <Button title="לפתוח הכל" onPress={onPurchase} />
        <TouchableOpacity onPress={onBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>אולי אחר כך</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Results Screen
const ResultsScreen = ({ players, scores, onRestart }) => {
  const winner = scores.player1 > scores.player2 ? players.name1 :
                 scores.player2 > scores.player1 ? players.name2 : 'תיקו!';

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.resultsTitle}>🏆 תוצאות סופיות 🏆</Text>
        <View style={styles.resultsCard}>
          <Text style={styles.winnerText}>
            {winner === 'תיקו!' ? 'תיקו!' : `${winner} ניצח/ה!`}
          </Text>
          <View style={styles.finalScores}>
            <Text style={styles.finalScoreText}>{players.name1}: {scores.player1} נק׳</Text>
            <Text style={styles.finalScoreText}>{players.name2}: {scores.player2} נק׳</Text>
          </View>
        </View>
        <TypewriterText
          lines={[
            'הגענו לסוף ואתם עדיין ביחד על הספה.',
            'לא משנה מה הניקוד.',
            'מה שמשנה זה שבחרתם להיות פה.',
            'אחד עם השנייה.',
            'עכשיו סגרו את הטלפון.',
            'יש לכם עבודה לעשות.',
            'מהסוג הטוב.',
          ]}
          onComplete={() => {}}
        />
        <Button title="משחק חדש" onPress={onRestart} variant="secondary" />
      </View>
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

  const handleOnboardingComplete = (playerData) => {
    setPlayers(playerData);
    setScreen('gameIntro');
  };

  const handleStageComplete = (stageScores) => {
    setTotalScores(prev => ({
      player1: prev.player1 + stageScores.player1,
      player2: prev.player2 + stageScores.player2,
    }));

    if (currentStage === 2 && !isPremium) {
      setScreen('paywall');
    } else if (currentStage < 2) {
      setCurrentStage(prev => prev + 1);
      setScreen('stageIntro');
    } else {
      setScreen('results');
    }
  };

  const handlePurchase = () => {
    setIsPremium(true);
    setCurrentStage(3);
    setScreen('stageIntro');
  };

  const handleRestart = () => {
    setScreen('splash');
    setPlayers({ name1: '', name2: '' });
    setCurrentStage(1);
    setTotalScores({ player1: 0, player2: 0 });
  };

  return (
    <View style={styles.container}>
      {screen === 'splash' && (
        <SplashScreen onComplete={() => setScreen('onboarding')} />
      )}
      {screen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {screen === 'gameIntro' && (
        <GameIntroScreen onComplete={() => setScreen('stageIntro')} />
      )}
      {screen === 'stageIntro' && (
        <StageIntroScreen
          stage={currentStage}
          onComplete={() => setScreen('gameplay')}
        />
      )}
      {screen === 'gameplay' && (
        <GamePlayScreen
          stage={currentStage}
          players={players}
          onStageComplete={handleStageComplete}
        />
      )}
      {screen === 'paywall' && (
        <PaywallScreen
          onPurchase={handlePurchase}
          onBack={() => setScreen('results')}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          players={players}
          scores={totalScores}
          onRestart={handleRestart}
        />
      )}
    </View>
  );
}

// ===== STYLES =====
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  screen: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },

  // Typewriter
  typewriterContainer: {
    paddingHorizontal: 8,
  },
  drCharifText: {
    color: colors.text.primary,
    fontSize: 20,
    lineHeight: 32,
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  cursor: {
    color: colors.accent.gold,
    fontWeight: 'bold',
  },

  // Buttons
  buttonContainer: {
    paddingVertical: 24,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonPrimary: {
    backgroundColor: colors.accent.gold,
  },
  buttonSecondary: {
    backgroundColor: colors.accent.wine,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent.gold,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.background.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextOutline: {
    color: colors.accent.gold,
  },

  // Input
  inputContainer: {
    marginTop: 32,
  },
  input: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    color: colors.text.primary,
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.accent.lavender + '40',
  },

  // Stage Header
  stageHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stageNumber: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.accent.wine,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stageNumberText: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  stageName: {
    color: colors.accent.gold,
    fontSize: 22,
    fontWeight: '600',
  },

  // Game Header
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.accent.lavender + '30',
  },
  scoreSmall: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  stageIndicator: {
    color: colors.accent.gold,
    fontSize: 16,
    fontWeight: '600',
  },

  // Question Card
  questionCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.accent.lavender + '30',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerName: {
    color: colors.accent.gold,
    fontSize: 16,
    fontWeight: '600',
  },
  difficultyBadge: {
    backgroundColor: colors.accent.wine + '60',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    color: colors.text.primary,
    fontSize: 12,
  },
  questionText: {
    color: colors.text.primary,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'right',
    marginBottom: 24,
  },
  answerSection: {
    marginTop: 8,
  },
  answerInput: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: 16,
    color: colors.text.primary,
    fontSize: 16,
    textAlign: 'right',
    minHeight: 80,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  questionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  taskSection: {
    alignItems: 'center',
  },
  taskInstruction: {
    color: colors.text.secondary,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  progressText: {
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: 16,
  },

  // Stage Complete
  stageCompleteTitle: {
    color: colors.accent.gold,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoresContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  scoreText: {
    color: colors.text.primary,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 8,
  },

  // Paywall
  priceCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginVertical: 32,
    borderWidth: 2,
    borderColor: colors.accent.gold,
  },
  priceAmount: {
    color: colors.accent.gold,
    fontSize: 48,
    fontWeight: 'bold',
  },
  priceDescription: {
    color: colors.text.secondary,
    fontSize: 14,
    marginTop: 8,
  },
  backLink: {
    marginTop: 24,
    alignItems: 'center',
  },
  backLinkText: {
    color: colors.text.secondary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },

  // Results
  resultsTitle: {
    color: colors.accent.gold,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  resultsCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
  },
  winnerText: {
    color: colors.accent.gold,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  finalScores: {
    width: '100%',
  },
  finalScoreText: {
    color: colors.text.primary,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 4,
  },
});
