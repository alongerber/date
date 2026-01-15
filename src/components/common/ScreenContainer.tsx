/**
 * ScreenContainer Component
 *
 * מיכל בסיסי למסכים עם רקע גרדיאנט ו-SafeArea
 */

import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
  noPadding?: boolean;
  safeArea?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
  scrollable = false,
  keyboardAvoiding = false,
  noPadding = false,
  safeArea = true,
}) => {
  const contentStyle: ViewStyle[] = [
    styles.content,
    !noPadding && styles.padding,
    style,
  ];

  let content = <View style={contentStyle}>{children}</View>;

  if (scrollable) {
    content = (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, !noPadding && styles.padding, style]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  if (keyboardAvoiding) {
    content = (
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  const Container = safeArea ? SafeAreaView : View;

  return (
    <LinearGradient
      colors={colors.gradients.primary as unknown as string[]}
      style={styles.gradient}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <Container style={styles.safeArea}>
        {content}
      </Container>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: spacing.xl,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
});

export default ScreenContainer;
