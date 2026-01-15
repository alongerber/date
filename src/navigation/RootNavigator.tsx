/**
 * Root Navigator
 *
 * ניווט ראשי של האפליקציה
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Screens
import SplashScreen from '@/screens/Splash/SplashScreen';
import OnboardingScreen from '@/screens/Onboarding/OnboardingScreen';
import GameIntroScreen from '@/screens/Game/GameIntroScreen';
import StageIntroScreen from '@/screens/Game/StageIntroScreen';
import GamePlayScreen from '@/screens/Game/GamePlayScreen';
import StageCompleteScreen from '@/screens/Game/StageCompleteScreen';
import IntensitySelectScreen from '@/screens/Game/IntensitySelectScreen';
import PaywallScreen from '@/screens/Paywall/PaywallScreen';
import QuizSetupScreen from '@/screens/Quiz/QuizSetupScreen';
import QuizWaitingScreen from '@/screens/Quiz/QuizWaitingScreen';
import QuizPlayScreen from '@/screens/Quiz/QuizPlayScreen';
import QuizResultsScreen from '@/screens/Quiz/QuizResultsScreen';
import WheelScreen from '@/screens/Results/WheelScreen';
import ResultsScreen from '@/screens/Results/ResultsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
  animation: 'fade' as const,
  animationDuration: 500,
};

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={screenOptions}
      >
        {/* Splash & Onboarding */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />

        {/* Main Game */}
        <Stack.Screen name="GameIntro" component={GameIntroScreen} />
        <Stack.Screen name="StageIntro" component={StageIntroScreen} />
        <Stack.Screen name="GamePlay" component={GamePlayScreen} />
        <Stack.Screen name="StageComplete" component={StageCompleteScreen} />

        {/* Stage 5 */}
        <Stack.Screen name="IntensitySelect" component={IntensitySelectScreen} />

        {/* Paywall */}
        <Stack.Screen name="Paywall" component={PaywallScreen} />

        {/* Quiz */}
        <Stack.Screen name="QuizSetup" component={QuizSetupScreen} />
        <Stack.Screen name="QuizWaiting" component={QuizWaitingScreen} />
        <Stack.Screen name="QuizPlay" component={QuizPlayScreen} />
        <Stack.Screen name="QuizResults" component={QuizResultsScreen} />

        {/* End */}
        <Stack.Screen name="Wheel" component={WheelScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
