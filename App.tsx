/**
 * זוגיט - Zoogit
 *
 * הערב שלא תספרו עליו בקבוצת הורים
 * אפליקציית דייט זוגי דיגיטלית עם מנחה AI ציני ומרגש
 */

import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { RootNavigator } from '@/navigation';
import { colors } from '@/theme/colors';

// Enable RTL for Hebrew
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

// Custom fonts
const customFonts = {
  'Heebo-Light': require('./assets/fonts/Heebo-Light.ttf'),
  'Heebo-Regular': require('./assets/fonts/Heebo-Regular.ttf'),
  'Heebo-Medium': require('./assets/fonts/Heebo-Medium.ttf'),
  'Heebo-Bold': require('./assets/fonts/Heebo-Bold.ttf'),
  'PlayfairDisplay-Regular': require('./assets/fonts/PlayfairDisplay-Regular.ttf'),
  'PlayfairDisplay-Bold': require('./assets/fonts/PlayfairDisplay-Bold.ttf'),
  'PlayfairDisplay-Italic': require('./assets/fonts/PlayfairDisplay-Italic.ttf'),
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await Font.loadAsync(customFonts);

        // Add any other initialization here
        // e.g., load saved state, initialize analytics, etc.
      } catch (e) {
        console.warn('Error loading fonts:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide splash screen once app is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <RootNavigator />
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
