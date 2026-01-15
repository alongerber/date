/**
 * Quiz Waiting Screen
 *
 * המתנה להתחברות בן/בת הזוג
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';

import { ScreenContainer, Button, Card } from '@/components/common';
import { useQuizStore } from '@/store/quizStore';
import { useGameStore } from '@/store/gameStore';
import { getQuizQuestionsForGame } from '@/data/quizQuestions';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/fonts';
import { spacing, borderRadius } from '@/theme/spacing';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'QuizWaiting'>;
type RouteType = RouteProp<RootStackParamList, 'QuizWaiting'>;

export const QuizWaitingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteType>();
  const { roomCode, isHost } = route.params;

  const { partnerConnected, setPartnerConnected, setQuestions } = useQuizStore();
  const { player1, player2 } = useGameStore();

  // Simulate partner connection (in production, use Firebase)
  useEffect(() => {
    if (!isHost) {
      // If joining, notify host that partner connected
      // Simulate immediate connection for MVP
      setTimeout(() => {
        setPartnerConnected(true);
      }, 1000);
    }
  }, [isHost, setPartnerConnected]);

  // Simulate receiving partner connection notification for host
  useEffect(() => {
    if (isHost && !partnerConnected) {
      // In production, listen for Firebase event
      // For MVP, simulate connection after some time
      const timeout = setTimeout(() => {
        setPartnerConnected(true);
      }, 5000); // Simulate 5 second wait

      return () => clearTimeout(timeout);
    }
  }, [isHost, partnerConnected, setPartnerConnected]);

  const handleStartQuiz = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Generate quiz questions
    const questions = getQuizQuestionsForGame();
    setQuestions(questions);

    navigation.navigate('QuizPlay');
  };

  const partnerName = isHost ? player2.name : player1.name;

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.content}>
          {isHost ? (
            // Host view - show code
            <>
              <Text style={styles.title}>הקוד שלכם:</Text>
              <View style={styles.codeContainer}>
                {roomCode.split('').map((digit, index) => (
                  <View key={index} style={styles.codeDigit}>
                    <Text style={styles.codeText}>{digit}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.instruction}>
                תנו ל{player2.name} להקליד את הקוד בטלפון שלו/ה
              </Text>
            </>
          ) : (
            // Guest view - show connecting
            <Text style={styles.title}>מתחברים...</Text>
          )}

          {/* Connection status */}
          <Card variant="glass" style={styles.statusCard}>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, styles.connected]} />
              <Text style={styles.statusName}>{player1.name}</Text>
            </View>
            <View style={styles.statusDivider} />
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  partnerConnected ? styles.connected : styles.waiting,
                ]}
              />
              <Text style={styles.statusName}>{player2.name}</Text>
              {!partnerConnected && (
                <ActivityIndicator
                  size="small"
                  color={colors.accent.gold}
                  style={styles.loader}
                />
              )}
            </View>
          </Card>

          {/* Start button when both connected */}
          {partnerConnected && (
            <View style={styles.buttonContainer}>
              <Text style={styles.connectedText}>
                {partnerName} מחובר/ת!
              </Text>
              <Button
                title="התחילו חידון"
                onPress={handleStartQuiz}
                variant="primary"
                size="large"
                fullWidth
              />
            </View>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  codeDigit: {
    width: 60,
    height: 80,
    backgroundColor: colors.background.secondary,
    borderWidth: 2,
    borderColor: colors.accent.gold,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.xs,
  },
  codeText: {
    ...typography.h1,
    color: colors.text.primary,
    fontSize: 36,
  },
  instruction: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  statusCard: {
    width: '100%',
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  statusRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: spacing.md,
  },
  connected: {
    backgroundColor: colors.state.success,
  },
  waiting: {
    backgroundColor: colors.text.muted,
  },
  statusName: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'right',
  },
  statusDivider: {
    height: 1,
    backgroundColor: colors.alpha[10],
    marginVertical: spacing.xs,
  },
  loader: {
    marginRight: spacing.md,
  },
  buttonContainer: {
    width: '100%',
    marginTop: spacing['3xl'],
    alignItems: 'center',
  },
  connectedText: {
    ...typography.body,
    color: colors.state.success,
    marginBottom: spacing.md,
  },
});

export default QuizWaitingScreen;
