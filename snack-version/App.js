/**
 * זוגיט - Zoogit Couples Dating App
 * SUPER PREMIUM VERSION - "Wine Bar at 1AM"
 *
 * ⚠️ IMPORTANT: If you see dependency errors,
 * Click "Add dependency" button at the bottom of the screen!
 *
 * @author Zoogit Team
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// ===== DR. CHARIF IMAGES FROM GITHUB =====
const DR_CHARIF_IMAGES = {
  listening: 'https://raw.githubusercontent.com/alongerber/date/main/assets/images/charif_listening.png',
  speaking: 'https://raw.githubusercontent.com/alongerber/date/main/assets/images/charif_speaking.png',
  skeptical: 'https://raw.githubusercontent.com/alongerber/date/main/assets/images/charif_skeptical.png',
  approving: 'https://raw.githubusercontent.com/alongerber/date/main/assets/images/charif_approving.png',
};

// Force RTL for Hebrew
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ===== PREMIUM THEME - "VELVET LOUNGE" =====
const colors = {
  background: {
    primary: '#0A0510',
    secondary: '#150D1E',
    tertiary: '#1F1428',
  },
  glass: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.12)',
    highlight: 'rgba(255, 255, 255, 0.25)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.85)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.35)',
    gold: '#D4A574',
  },
  accent: {
    gold: '#D4A574',
    goldLight: '#E8D5B5',
    goldDark: '#B8956A',
    wine: '#722F37',
    wineLight: '#8B3D47',
    wineGlow: 'rgba(114, 47, 55, 0.4)',
    rose: '#C97B84',
    candleOrange: '#FF9D5C',
    candleYellow: '#FFD93D',
  },
  particles: {
    gold1: 'rgba(212, 165, 116, 0.6)',
    gold2: 'rgba(232, 213, 181, 0.4)',
    gold3: 'rgba(255, 215, 0, 0.3)',
  },
};

// ===== FLOATING PARTICLE (Gold Dust) =====
const FloatingParticle = ({ index }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT + 50)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  const startX = useMemo(() => Math.random() * SCREEN_WIDTH, []);
  const size = useMemo(() => 2 + Math.random() * 4, []);
  const duration = useMemo(() => 8000 + Math.random() * 6000, []);
  const delay = useMemo(() => index * 400 + Math.random() * 2000, []);

  useEffect(() => {
    const animate = () => {
      translateY.setValue(SCREEN_HEIGHT + 50);
      translateX.setValue(0);
      opacity.setValue(0);
      scale.setValue(0.5 + Math.random() * 0.5);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -50,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.8, duration: 1000, useNativeDriver: true }),
          Animated.delay(duration - 2000),
          Animated.timing(opacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
        ]),
        Animated.loop(
          Animated.sequence([
            Animated.timing(translateX, { toValue: 20, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
            Animated.timing(translateX, { toValue: -20, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          ])
        ),
      ]).start(() => animate());
    };

    const timeout = setTimeout(animate, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: startX,
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
          transform: [{ translateY }, { translateX }, { scale }],
        },
      ]}
    />
  );
};

// ===== PARTICLE SYSTEM =====
const ParticleSystem = () => {
  const particles = useMemo(() => Array.from({ length: 25 }, (_, i) => i), []);
  return (
    <View style={styles.particleContainer} pointerEvents="none">
      {particles.map((i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </View>
  );
};

// ===== CANDLE LIGHT EFFECT =====
const CandleLight = ({ position = 'left' }) => {
  const flicker1 = useRef(new Animated.Value(0.3)).current;
  const flicker2 = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const flickerAnimation = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(flicker1, { toValue: 0.2 + Math.random() * 0.3, duration: 100 + Math.random() * 200, useNativeDriver: true }),
          Animated.timing(flicker1, { toValue: 0.3 + Math.random() * 0.2, duration: 100 + Math.random() * 200, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(flicker2, { toValue: 0.4 + Math.random() * 0.3, duration: 150 + Math.random() * 150, useNativeDriver: true }),
          Animated.timing(flicker2, { toValue: 0.5 + Math.random() * 0.2, duration: 150 + Math.random() * 150, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(scale, { toValue: 0.95 + Math.random() * 0.1, duration: 100 + Math.random() * 100, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1 + Math.random() * 0.05, duration: 100 + Math.random() * 100, useNativeDriver: true }),
        ]),
      ]).start(() => flickerAnimation());
    };
    flickerAnimation();
  }, []);

  const leftPos = position === 'left' ? 20 : undefined;
  const rightPos = position === 'right' ? 20 : undefined;

  return (
    <View style={[styles.candleContainer, { left: leftPos, right: rightPos }]}>
      {/* Outer glow */}
      <Animated.View style={[styles.candleGlowOuter, { opacity: flicker1, transform: [{ scale }] }]} />
      {/* Inner glow */}
      <Animated.View style={[styles.candleGlowInner, { opacity: flicker2, transform: [{ scale }] }]} />
      {/* Flame core */}
      <Animated.View style={[styles.candleFlame, { transform: [{ scale }] }]} />
    </View>
  );
};

// ===== SHIMMER EFFECT =====
const ShimmerEffect = () => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    const animate = () => {
      shimmerAnim.setValue(-1);
      Animated.timing(shimmerAnim, {
        toValue: 2,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => setTimeout(animate, 2000));
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={[
        styles.shimmer,
        {
          transform: [
            {
              translateX: shimmerAnim.interpolate({
                inputRange: [-1, 2],
                outputRange: [-200, SCREEN_WIDTH + 200],
              }),
            },
          ],
        },
      ]}
    />
  );
};

// ===== PREMIUM BACKGROUND =====
const PremiumBackground = ({ children }) => (
  <View style={styles.premiumBg}>
    <LinearGradient
      colors={[colors.background.primary, colors.background.secondary, colors.background.tertiary, colors.background.primary]}
      locations={[0, 0.3, 0.7, 1]}
      style={StyleSheet.absoluteFill}
    />

    {/* Ambient wine glow - top */}
    <View style={styles.ambientGlowTop} />

    {/* Ambient wine glow - bottom */}
    <View style={styles.ambientGlowBottom} />

    {/* Vignette effect */}
    <LinearGradient
      colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', 'rgba(0,0,0,0.6)']}
      locations={[0, 0.2, 0.8, 1]}
      style={StyleSheet.absoluteFill}
    />

    {/* Candle lights */}
    <CandleLight position="left" />
    <CandleLight position="right" />

    {/* Floating particles */}
    <ParticleSystem />

    {/* Decorative lines */}
    <View style={styles.decorativeLineTop} />
    <View style={styles.decorativeLineBottom} />

    {children}
  </View>
);

// ===== PREMIUM GLASS CARD =====
const GlassCard = ({ children, style, intensity = 'medium', withShimmer = false }) => {
  const opacityMap = { light: 0.04, medium: 0.07, strong: 0.1 };
  const borderOpacity = { light: 0.08, medium: 0.12, strong: 0.18 };

  return (
    <View style={[styles.glassCard, style]}>
      <LinearGradient
        colors={[
          `rgba(255, 255, 255, ${opacityMap[intensity]})`,
          `rgba(255, 255, 255, ${opacityMap[intensity] * 0.3})`,
        ]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      {/* Top highlight */}
      <LinearGradient
        colors={[`rgba(255, 255, 255, ${borderOpacity[intensity]})`, 'transparent']}
        style={styles.glassTopHighlight}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <View style={[styles.glassCardBorder, { borderColor: `rgba(255, 255, 255, ${borderOpacity[intensity]})` }]} />
      {withShimmer && <ShimmerEffect />}
      {children}
    </View>
  );
};

// ===== DR. CHARIF AVATAR WITH REAL IMAGE =====
const DrCharifAvatar = ({ isSpeaking, size = 100, expression = 'listening' }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const ringRotation = useRef(new Animated.Value(0)).current;
  const dotAnims = [
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
    useRef(new Animated.Value(0.3)).current,
  ];

  // Continuous breathing animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.03,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Ring rotation
    Animated.loop(
      Animated.timing(ringRotation, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Speaking animation
  useEffect(() => {
    if (isSpeaking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.06, duration: 400, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        ])
      ).start();
      Animated.timing(glowAnim, { toValue: 0.9, duration: 300, useNativeDriver: true }).start();

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
      Animated.timing(glowAnim, { toValue: 0.4, duration: 500, useNativeDriver: true }).start();
      dotAnims.forEach((anim) => {
        anim.stopAnimation();
        anim.setValue(0.3);
      });
    }
  }, [isSpeaking]);

  const imageUrl = DR_CHARIF_IMAGES[expression] || DR_CHARIF_IMAGES.listening;
  const spin = ringRotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={[styles.avatarContainer, { width: size * 1.6, height: size * 1.6 }]}>
      {/* Multi-layer glow */}
      <Animated.View
        style={[
          styles.avatarGlowOuter,
          {
            width: size * 1.8,
            height: size * 1.8,
            borderRadius: size * 0.9,
            opacity: Animated.multiply(glowAnim, 0.3),
            transform: [{ scale: breatheAnim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.avatarGlow,
          {
            width: size * 1.5,
            height: size * 1.5,
            borderRadius: size * 0.75,
            opacity: glowAnim,
            transform: [{ scale: breatheAnim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.avatarGlowInner,
          {
            width: size * 1.2,
            height: size * 1.2,
            borderRadius: size * 0.6,
            opacity: Animated.multiply(glowAnim, 0.8),
            transform: [{ scale: breatheAnim }],
          },
        ]}
      />

      {/* Main avatar */}
      <Animated.View style={{ transform: [{ scale: Animated.multiply(pulseAnim, breatheAnim) }] }}>
        {/* Rotating decorative ring */}
        <Animated.View
          style={[
            styles.decorativeRing,
            { width: size + 16, height: size + 16, borderRadius: (size + 16) / 2, transform: [{ rotate: spin }] },
          ]}
        />
        {/* Gold ring */}
        <View style={[styles.avatarRing, { width: size + 6, height: size + 6, borderRadius: (size + 6) / 2 }]} />
        {/* Character image */}
        <Image
          source={{ uri: imageUrl }}
          style={[styles.avatarImage, { width: size, height: size, borderRadius: size / 2 }]}
          resizeMode="cover"
        />
      </Animated.View>

      {/* Speaking dots */}
      {isSpeaking && (
        <View style={styles.speakingDots}>
          {dotAnims.map((anim, i) => (
            <Animated.View
              key={i}
              style={[styles.dot, { opacity: anim, transform: [{ scale: anim }] }]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

// ===== DR. CHARIF TEXT (Line by line replacement) =====
const DrCharifText = ({ lines, onComplete, typingSpeed = 35, lineDelay = 800 }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

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
    glowAnim.setValue(0);

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(glowAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
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
            ]).start(() => setCurrentLineIndex((prev) => prev + 1));
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

// ===== GLASS SPEECH BOX (Fixed Height 160px) =====
const GlassSpeechBox = ({ children }) => (
  <GlassCard style={styles.speechBox} intensity="medium" withShimmer>
    <Text style={styles.drCharifLabel}>ד״ר חריף:</Text>
    <View style={styles.speechContent}>
      {children}
    </View>
  </GlassCard>
);

// ===== DR. CHARIF EXPERIENCE (Full Scene) =====
const DrCharifExperience = ({ lines, onComplete, showAvatar = true }) => {
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [expression, setExpression] = useState('speaking');

  return (
    <PremiumBackground>
      <View style={styles.experienceContainer}>
        {showAvatar && (
          <View style={styles.avatarSection}>
            <DrCharifAvatar isSpeaking={isSpeaking} size={95} expression={expression} />
          </View>
        )}

        <GlassSpeechBox>
          <DrCharifText
            lines={lines}
            onComplete={() => {
              setIsSpeaking(false);
              setExpression('approving');
              onComplete?.();
            }}
            typingSpeed={35}
            lineDelay={700}
          />
        </GlassSpeechBox>
      </View>
    </PremiumBackground>
  );
};

// ===== DEEP PSYCHOLOGICAL QUESTIONS =====
const questions = [
  { id: 1, stage: 1, difficulty: 1, text: 'אם הייתי פוגש אותך בגיל 16 - הייתי מוצא חן בעיניך?', category: 'time_machine' },
  { id: 2, stage: 1, difficulty: 2, text: 'מה הדבר שחשבת עליי בשבועות הראשונים ולא העזת להגיד עד היום?', category: 'first_impression' },
  { id: 3, stage: 1, difficulty: 2, text: 'אם היינו נפגשים היום בפעם הראשונה - היית מתחיל/ה איתי?', category: 'parallel_worlds' },
  { id: 4, stage: 1, difficulty: 2, text: 'איזה חלק מעצמך מתקופה לפני שהכרת אותי אתה מתגעגע אליו?', category: 'identity' },
  { id: 5, stage: 1, difficulty: 3, text: 'מה ויתרת עליו בשבילנו שאתה עדיין לא בטוח שזה היה שווה?', category: 'sacrifice' },
  { id: 6, stage: 1, difficulty: 3, text: 'מה שיקרת לי עליו בהתחלה כי רצית שאתרשם?', category: 'truth' },
  { id: 7, stage: 2, difficulty: 1, text: 'במה אני יותר טוב ממך ובמה את/ה יותר טוב ממני?', category: 'comparison' },
  { id: 8, stage: 2, difficulty: 1, text: 'מה לדעתך החברים שלנו אומרים עלינו כשאנחנו לא בחדר?', category: 'perception' },
  { id: 9, stage: 2, difficulty: 2, text: 'מה הדבר הכי קטן שאני עושה שמשגע אותך - בטוב?', category: 'little_things' },
  { id: 10, stage: 2, difficulty: 2, text: 'מה הדבר שאני עושה שמעצבן אותך אבל אתה כבר הפסקת להעיר עליו?', category: 'compromise' },
  { id: 11, stage: 2, difficulty: 3, text: 'מה לדעתך המשפחה שלי באמת חושבת עליך?', category: 'family' },
  { id: 12, stage: 2, difficulty: 3, text: 'מה הדבר שאני עושה שגורם לך לחשוב "למה התחתנתי עם זה"?', category: 'doubt' },
];

// ===== MEANINGFUL TASKS =====
const tasks = [
  { id: 1, stage: 1, difficulty: 1, text: 'פתח את הגלריה בטלפון, מצא תמונה מלפני שהכרתם, הראה ל{partner} וספר מה עבר לך בראש כשצולמה.', isTask: true },
  { id: 2, stage: 1, difficulty: 2, text: 'תאר ל{partner} את הרגע המדויק שבו הבנת שאתה נופל. לא "מתי התאהבת" - הרגע עצמו.', isTask: true },
  { id: 3, stage: 2, difficulty: 1, text: 'הסתכלו אחד לשנייה בעיניים 60 שניות מלאות. בלי לדבר, בלי לצחוק. מי ששובר קודם - מספר סוד.', isTask: true },
  { id: 4, stage: 2, difficulty: 2, text: 'אמור ל{partner} שלושה דברים שאתה אוהב בו/בה - שלא קשורים למראה או להצלחות.', isTask: true },
  { id: 5, stage: 2, difficulty: 3, text: 'יש לך 30 שניות לומר ל{partner} משהו שאתה תמיד רוצה להגיד אבל תמיד עוצר את עצמך. עכשיו.', isTask: true },
];

// ===== DR. CHARIF TEXTS =====
const drCharifTexts = {
  splash: [
    'טוב.',
    'הגעתם.',
    'לא משנה מה הסיבה.',
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

// ===== GOLD BUTTON =====
const GoldButton = ({ title, onPress, variant = 'primary', disabled = false, size = 'medium' }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const sizeStyles = {
    small: { paddingVertical: 10, paddingHorizontal: 20 },
    medium: { paddingVertical: 14, paddingHorizontal: 28 },
    large: { paddingVertical: 18, paddingHorizontal: 40 },
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={() => { Vibration.vibrate(10); onPress(); }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={1}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <LinearGradient
            colors={disabled ? ['#666', '#555'] : [colors.accent.goldLight, colors.accent.gold, colors.accent.goldDark]}
            style={[styles.goldButton, sizeStyles[size], disabled && styles.buttonDisabled]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.goldButtonText}>{title}</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => { Vibration.vibrate(10); onPress(); }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={1}
    >
      <Animated.View style={[styles.outlineButton, sizeStyles[size], disabled && styles.buttonDisabled, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.outlineButtonText}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// ===== PLAYER SCORE CARD =====
const PlayerScoreCard = ({ name, score, isActive = false, position = 'left' }) => (
  <GlassCard style={[styles.playerCard, isActive && styles.playerCardActive]} intensity={isActive ? 'strong' : 'light'}>
    <View style={[styles.playerCardContent, position === 'right' && styles.playerCardContentRight]}>
      <View style={[styles.playerAvatar, isActive && styles.playerAvatarActive]}>
        <Text style={styles.playerInitial}>{name.charAt(0)}</Text>
      </View>
      <View style={[styles.playerInfo, position === 'right' && styles.playerInfoRight]}>
        <Text style={styles.playerName} numberOfLines={1}>{name}</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>ניקוד</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
      </View>
    </View>
    {isActive && <View style={styles.activeIndicator} />}
  </GlassCard>
);

// ===== SCREENS =====
const SplashScreen = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showButton) {
      Animated.timing(buttonOpacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }
  }, [showButton]);

  return (
    <View style={styles.screen}>
      <DrCharifExperience lines={drCharifTexts.splash} onComplete={() => setShowButton(true)} />
      {showButton && (
        <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
          <GoldButton title="להיכנס" onPress={onComplete} size="large" />
        </Animated.View>
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
    else if (step === 2) { onComplete({ name1, name2 }); }
  };

  return (
    <View style={styles.screen}>
      <DrCharifExperience
        key={step}
        lines={getLines()}
        onComplete={() => (step < 2 ? setShowInput(true) : setShowButton(true))}
      />
      {showInput && (
        <View style={styles.inputSection}>
          <GlassCard style={styles.inputCard} intensity="light">
            <TextInput
              style={styles.input}
              placeholder={step === 0 ? 'השם שלך' : 'השם של בן/בת הזוג'}
              placeholderTextColor={colors.text.muted}
              value={step === 0 ? name1 : name2}
              onChangeText={step === 0 ? setName1 : setName2}
              autoFocus
            />
          </GlassCard>
          <GoldButton title="המשך" onPress={handleNext} disabled={step === 0 ? !name1 : !name2} />
        </View>
      )}
      {showButton && step === 2 && (
        <View style={styles.buttonContainer}>
          <GoldButton title="בואו נתחיל" onPress={handleNext} size="large" />
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
      {showButton && (
        <View style={styles.buttonContainer}>
          <GoldButton title="מוכנים" onPress={onComplete} size="large" />
        </View>
      )}
    </View>
  );
};

const StageIntroScreen = ({ stage, onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const stageNames = { 1: 'רגע לפני שנפגשנו', 2: 'הרמת כוסית' };

  return (
    <View style={styles.screen}>
      <PremiumBackground>
        <View style={styles.stageIntroContainer}>
          <View style={styles.stageHeader}>
            <LinearGradient colors={[colors.accent.wine, colors.accent.wineLight]} style={styles.stageNumber}>
              <Text style={styles.stageNumberText}>{stage}</Text>
            </LinearGradient>
            <Text style={styles.stageName}>{stageNames[stage]}</Text>
            <View style={styles.stageUnderline} />
          </View>
          <View style={styles.stageTextArea}>
            <DrCharifText
              lines={drCharifTexts.stageIntros[stage]}
              onComplete={() => setShowButton(true)}
            />
          </View>
        </View>
      </PremiumBackground>
      {showButton && (
        <View style={styles.buttonContainer}>
          <GoldButton title="יאללה" onPress={onComplete} size="large" />
        </View>
      )}
    </View>
  );
};

const QuestionCard = ({ item, isTask, player, partnerName, onAnswer, onVeto, vetosLeft }) => {
  const [answer, setAnswer] = useState('');
  const difficultyPoints = { 1: 10, 2: 20, 3: 35 };
  const difficultyLabels = { 1: 'קל', 2: 'בינוני', 3: 'אמיץ' };
  const difficultyColors = { 1: '#4A7C59', 2: '#9E7B4F', 3: '#8B3D48' };
  const text = item.text.replace(/{partner}/g, partnerName);

  return (
    <GlassCard style={styles.questionCard} intensity="medium" withShimmer>
      <View style={styles.questionHeader}>
        <Text style={styles.currentPlayerName}>התור של {player}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: difficultyColors[item.difficulty] + '80' }]}>
          <Text style={styles.difficultyText}>{difficultyLabels[item.difficulty]} • {difficultyPoints[item.difficulty]} נק׳</Text>
        </View>
      </View>

      <Text style={styles.questionText}>{text}</Text>

      {!isTask ? (
        <View style={styles.answerSection}>
          <TextInput
            style={styles.answerInput}
            placeholder="התשובה שלך..."
            placeholderTextColor={colors.text.muted}
            value={answer}
            onChangeText={setAnswer}
            multiline
          />
          <View style={styles.questionButtons}>
            <GoldButton title="אישור" onPress={() => onAnswer(answer)} disabled={!answer.trim()} />
            {vetosLeft > 0 && <GoldButton title={`וטו (${vetosLeft})`} onPress={onVeto} variant="outline" />}
          </View>
        </View>
      ) : (
        <View style={styles.taskSection}>
          <Text style={styles.taskInstruction}>בצעו את המשימה ובן/בת הזוג יאשר</Text>
          <View style={styles.questionButtons}>
            <GoldButton title="בוצע!" onPress={() => onAnswer('completed')} />
            {vetosLeft > 0 && <GoldButton title={`וטו (${vetosLeft})`} onPress={onVeto} variant="outline" />}
          </View>
        </View>
      )}
    </GlassCard>
  );
};

const GamePlayScreen = ({ stage, players, onStageComplete }) => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [vetos, setVetos] = useState({ player1: 3, player2: 3 });

  const stageQuestions = questions.filter((q) => q.stage === stage);
  const stageTasks = tasks.filter((t) => t.stage === stage);
  const allItems = [...stageQuestions.map((q) => ({ ...q, isTask: false })), ...stageTasks.map((t) => ({ ...t, isTask: true }))];

  const currentPlayer = currentTurn % 2 === 0 ? 'player1' : 'player2';
  const currentPlayerName = currentPlayer === 'player1' ? players.name1 : players.name2;
  const partnerName = currentPlayer === 'player1' ? players.name2 : players.name1;

  if (currentItemIndex >= allItems.length) {
    return (
      <View style={styles.screen}>
        <PremiumBackground>
          <View style={styles.stageCompleteContainer}>
            <Text style={styles.stageCompleteTitle}>סיום שלב {stage}!</Text>
            <GlassCard style={styles.scoresCard} intensity="strong">
              <Text style={styles.finalScoreText}>{players.name1}: {scores.player1} נק׳</Text>
              <Text style={styles.finalScoreText}>{players.name2}: {scores.player2} נק׳</Text>
            </GlassCard>
            <GoldButton title="לשלב הבא" onPress={() => onStageComplete(scores)} size="large" />
          </View>
        </PremiumBackground>
      </View>
    );
  }

  const currentItem = allItems[currentItemIndex];
  const difficultyPoints = { 1: 10, 2: 20, 3: 35 };

  const handleAnswer = () => {
    setScores((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] + difficultyPoints[currentItem.difficulty] }));
    setCurrentItemIndex((prev) => prev + 1);
    setCurrentTurn((prev) => prev + 1);
  };

  const handleVeto = () => {
    setVetos((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] - 1 }));
    setScores((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] - 15 }));
    setCurrentItemIndex((prev) => prev + 1);
    setCurrentTurn((prev) => prev + 1);
  };

  return (
    <View style={styles.screen}>
      <PremiumBackground>
        <View style={styles.gamePlayContainer}>
          <View style={styles.playersHeader}>
            <PlayerScoreCard name={players.name1} score={scores.player1} isActive={currentPlayer === 'player1'} position="left" />
            <View style={styles.stageIndicatorContainer}>
              <Text style={styles.stageIndicatorLabel}>שלב</Text>
              <Text style={styles.stageIndicatorNumber}>{stage}</Text>
            </View>
            <PlayerScoreCard name={players.name2} score={scores.player2} isActive={currentPlayer === 'player2'} position="right" />
          </View>

          <View style={styles.gameContent}>
            <QuestionCard
              item={currentItem}
              isTask={currentItem.isTask}
              player={currentPlayerName}
              partnerName={partnerName}
              onAnswer={handleAnswer}
              onVeto={handleVeto}
              vetosLeft={vetos[currentPlayer]}
            />
          </View>

          <Text style={styles.progressText}>{currentItemIndex + 1} / {allItems.length}</Text>
        </View>
      </PremiumBackground>
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
      <GlassCard style={styles.priceCard} intensity="strong" withShimmer>
        <Text style={styles.priceAmount}>79 ₪</Text>
        <Text style={styles.priceDescription}>קנייה חד פעמית • גישה מלאה</Text>
      </GlassCard>
      <GoldButton title="לפתוח הכל" onPress={onPurchase} size="large" />
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
          <GlassCard style={styles.finalScoresCard} intensity="strong">
            <Text style={styles.finalScoreText}>{players.name1}: {scores.player1} נק׳</Text>
            <Text style={styles.finalScoreText}>{players.name2}: {scores.player2} נק׳</Text>
          </GlassCard>
          <GoldButton title="משחק חדש" onPress={onRestart} variant="outline" size="large" />
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
    setTotalScores((prev) => ({
      player1: prev.player1 + stageScores.player1,
      player2: prev.player2 + stageScores.player2,
    }));

    if (currentStage === 2 && !isPremium) { setScreen('paywall'); }
    else if (currentStage < 2) { setCurrentStage((prev) => prev + 1); setScreen('stageIntro'); }
    else { setScreen('results'); }
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

// ===== PREMIUM STYLES =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  screen: { flex: 1 },

  // Premium Background
  premiumBg: { flex: 1, backgroundColor: colors.background.primary },
  ambientGlowTop: {
    position: 'absolute',
    top: -100,
    left: '50%',
    marginLeft: -200,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: colors.accent.wineGlow,
  },
  ambientGlowBottom: {
    position: 'absolute',
    bottom: -150,
    left: '50%',
    marginLeft: -250,
    width: 500,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(212, 165, 116, 0.08)',
  },
  decorativeLineTop: {
    position: 'absolute',
    top: 50,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(212, 165, 116, 0.15)',
  },
  decorativeLineBottom: {
    position: 'absolute',
    bottom: 50,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(212, 165, 116, 0.15)',
  },

  // Particles
  particleContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  particle: { position: 'absolute', backgroundColor: colors.particles.gold1 },

  // Candle Light
  candleContainer: { position: 'absolute', top: 80, width: 60, height: 100, alignItems: 'center' },
  candleGlowOuter: {
    position: 'absolute',
    top: 0,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.accent.candleOrange,
  },
  candleGlowInner: {
    position: 'absolute',
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent.candleYellow,
  },
  candleFlame: {
    position: 'absolute',
    top: 30,
    width: 8,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },

  // Glass Card
  glassCard: { borderRadius: 24, overflow: 'hidden', backgroundColor: colors.glass.background },
  glassCardBorder: { ...StyleSheet.absoluteFillObject, borderRadius: 24, borderWidth: 1, borderColor: colors.glass.border },
  glassTopHighlight: { position: 'absolute', top: 0, left: 0, right: 0, height: 1 },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: [{ skewX: '-20deg' }],
  },

  // Speech Box - FIXED HEIGHT 160px
  speechBox: { marginHorizontal: 24, padding: 24, height: 160 },
  speechContent: { flex: 1, justifyContent: 'center' },
  drCharifLabel: {
    fontSize: 13,
    color: colors.accent.gold,
    letterSpacing: 2,
    marginBottom: 12,
    textAlign: 'right',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  // Experience Container
  experienceContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  avatarSection: { marginBottom: 40 },

  // Avatar
  avatarContainer: { alignItems: 'center', justifyContent: 'center' },
  avatarGlowOuter: { position: 'absolute', backgroundColor: colors.accent.wine },
  avatarGlow: {
    position: 'absolute',
    backgroundColor: colors.accent.wine,
    shadowColor: colors.accent.wine,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 40,
    elevation: 15,
  },
  avatarGlowInner: {
    position: 'absolute',
    backgroundColor: colors.accent.gold,
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 25,
    elevation: 10,
  },
  decorativeRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(212, 165, 116, 0.3)',
    borderStyle: 'dashed',
  },
  avatarRing: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: colors.accent.gold,
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  avatarImage: { backgroundColor: colors.background.secondary },
  speakingDots: { position: 'absolute', bottom: -25, flexDirection: 'row', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accent.gold },

  // Text
  textContainer: { minHeight: 60, justifyContent: 'center' },
  drCharifText: {
    fontSize: 22,
    lineHeight: 34,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(212, 165, 116, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cursor: { color: colors.accent.gold, fontWeight: '100' },

  // Buttons
  goldButton: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  goldButtonText: { color: colors.background.primary, fontSize: 18, fontWeight: '700', letterSpacing: 1 },
  outlineButton: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent.gold,
    backgroundColor: 'transparent',
  },
  outlineButtonText: { color: colors.accent.gold, fontSize: 16, fontWeight: '600' },
  buttonDisabled: { opacity: 0.4 },
  buttonContainer: { position: 'absolute', bottom: 60, left: 32, right: 32 },

  // Input
  inputSection: { position: 'absolute', bottom: 60, left: 32, right: 32 },
  inputCard: { marginBottom: 16, padding: 4 },
  input: {
    padding: 16,
    color: colors.text.primary,
    fontSize: 18,
    textAlign: 'right',
  },

  // Stage Intro
  stageIntroContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  stageHeader: { alignItems: 'center', marginBottom: 40 },
  stageNumber: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: colors.accent.wine,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8,
  },
  stageNumberText: { color: colors.text.primary, fontSize: 32, fontWeight: 'bold' },
  stageName: { color: colors.accent.gold, fontSize: 24, fontWeight: '600', letterSpacing: 2 },
  stageUnderline: { width: 60, height: 2, backgroundColor: colors.accent.gold, marginTop: 12, borderRadius: 1 },
  stageTextArea: { paddingHorizontal: 40 },

  // Players Header
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 55,
    paddingBottom: 16,
  },
  playerCard: { flex: 1, maxWidth: 140, padding: 12 },
  playerCardActive: { borderColor: colors.accent.gold, borderWidth: 1.5 },
  playerCardContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  playerCardContentRight: { flexDirection: 'row-reverse' },
  playerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accent.wine,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.glass.border,
  },
  playerAvatarActive: { borderColor: colors.accent.gold },
  playerInitial: { color: colors.text.primary, fontSize: 17, fontWeight: '700' },
  playerInfo: { flex: 1 },
  playerInfoRight: { alignItems: 'flex-end' },
  playerName: { color: colors.text.primary, fontSize: 13, fontWeight: '600', marginBottom: 2 },
  scoreRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  scoreLabel: { color: colors.text.muted, fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 },
  scoreValue: { color: colors.accent.gold, fontSize: 20, fontWeight: 'bold' },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: colors.accent.gold,
    borderRadius: 2,
  },
  stageIndicatorContainer: { alignItems: 'center', paddingHorizontal: 8 },
  stageIndicatorLabel: { color: colors.text.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
  stageIndicatorNumber: { color: colors.accent.gold, fontSize: 22, fontWeight: 'bold' },

  // Game Play
  gamePlayContainer: { flex: 1 },
  gameContent: { flex: 1, justifyContent: 'center', padding: 16 },
  progressText: { color: colors.text.muted, textAlign: 'center', paddingBottom: 32, fontSize: 14, letterSpacing: 2 },

  // Question Card
  questionCard: { padding: 24 },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  currentPlayerName: { color: colors.accent.gold, fontSize: 16, fontWeight: '700' },
  difficultyBadge: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 16 },
  difficultyText: { color: colors.text.primary, fontSize: 12, fontWeight: '600' },
  questionText: { color: colors.text.primary, fontSize: 20, lineHeight: 32, textAlign: 'right', marginBottom: 24, fontWeight: '300' },
  answerSection: { marginTop: 8 },
  answerInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 16,
    color: colors.text.primary,
    fontSize: 16,
    textAlign: 'right',
    minHeight: 80,
    marginBottom: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  questionButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  taskSection: { alignItems: 'center' },
  taskInstruction: { color: colors.text.tertiary, fontSize: 14, marginBottom: 20, textAlign: 'center' },

  // Stage Complete
  stageCompleteContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  stageCompleteTitle: { color: colors.accent.gold, fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 },
  scoresCard: { width: '100%', padding: 28, marginBottom: 32 },

  // Paywall
  paywallContent: { position: 'absolute', bottom: 40, left: 24, right: 24 },
  priceCard: { alignItems: 'center', padding: 32, marginBottom: 20 },
  priceAmount: { color: colors.accent.gold, fontSize: 52, fontWeight: 'bold' },
  priceDescription: { color: colors.text.tertiary, fontSize: 14, marginTop: 8 },
  backLink: { marginTop: 20, alignItems: 'center' },
  backLinkText: { color: colors.text.muted, fontSize: 16, textDecorationLine: 'underline' },

  // Results
  resultsContent: { position: 'absolute', bottom: 60, left: 32, right: 32, alignItems: 'center' },
  resultsTitle: { color: colors.accent.gold, fontSize: 36, fontWeight: 'bold', marginBottom: 24 },
  finalScoresCard: { width: '100%', padding: 28, marginBottom: 24, alignItems: 'center' },
  finalScoreText: { color: colors.text.primary, fontSize: 20, textAlign: 'center', marginVertical: 8, fontWeight: '300' },
});
