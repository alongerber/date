/**
 * Paywall Screen
 *
 * מסך תשלום אחרי שלב 2
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { DrCharifMessage } from '@/components/drCharif';
import { useGameStore } from '@/store/gameStore';
import { paywallText } from '@/data/drCharifTexts';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius, shadows } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Paywall'>;

const FEATURES = [
  'שלבים 3-5 עם תוכן מתקדם',
  'החידון הזוגי המלא',
  'גלגל המזל עם 15 פרסים',
  'גישה לכל הקטגוריות',
];

export const PaywallScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setPremium } = useGameStore();
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTypingComplete = () => {
    setShowContent(true);
  };

  const handlePurchase = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsLoading(true);

    // Simulate purchase (in production, use RevenueCat)
    setTimeout(() => {
      setPremium(true);
      setIsLoading(false);
      navigation.navigate('StageIntro', { stageId: 3 });
    }, 1500);
  };

  const handleRestore = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Simulate restore
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Dr. Charif message */}
        <View style={styles.messageContainer}>
          <DrCharifMessage
            lines={paywallText.lines}
            onComplete={handleTypingComplete}
            variant="minimal"
          />
        </View>

        {showContent && (
          <>
            {/* Price card */}
            <LinearGradient
              colors={colors.gradients.wine as unknown as string[]}
              style={styles.priceCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.priceLabel}>הערב המלא</Text>
              <View style={styles.priceRow}>
                <Text style={styles.currency}>₪</Text>
                <Text style={styles.price}>79</Text>
              </View>
              <Text style={styles.priceSubtext}>קניה חד פעמית</Text>
            </LinearGradient>

            {/* Features list */}
            <Card variant="glass" style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>מה מחכה לכם בפנים:</Text>
              {FEATURES.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </Card>

            {/* Purchase buttons */}
            <View style={styles.buttonsContainer}>
              <Button
                title="לפתוח את הערב"
                onPress={handlePurchase}
                variant="primary"
                size="large"
                fullWidth
                loading={isLoading}
              />
              <TouchableOpacity
                style={styles.restoreButton}
                onPress={handleRestore}
                activeOpacity={0.7}
              >
                <Text style={styles.restoreText}>שחזור רכישה</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing['2xl'],
  },
  messageContainer: {
    paddingVertical: spacing.xl,
  },
  priceCard: {
    marginHorizontal: spacing.xl,
    padding: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.lg,
  },
  priceLabel: {
    ...typography.label,
    color: colors.text.primary,
    opacity: 0.8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: spacing.sm,
  },
  currency: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  price: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.text.primary,
    lineHeight: 72,
  },
  priceSubtext: {
    ...typography.bodySmall,
    color: colors.text.primary,
    opacity: 0.7,
  },
  featuresCard: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    padding: spacing.lg,
  },
  featuresTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'right',
  },
  featureRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  featureCheck: {
    color: colors.accent.gold,
    fontSize: 16,
    marginLeft: spacing.sm,
  },
  featureText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  buttonsContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['3xl'],
    marginTop: 'auto',
  },
  restoreButton: {
    alignSelf: 'center',
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
  },
  restoreText: {
    ...typography.bodySmall,
    color: colors.text.muted,
    textDecorationLine: 'underline',
  },
});

export default PaywallScreen;
