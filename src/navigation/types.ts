/**
 * Navigation Types
 */

export type RootStackParamList = {
  // Splash & Onboarding
  Splash: undefined;
  Onboarding: undefined;

  // Main Game
  GameIntro: undefined;
  StageIntro: { stageId: number };
  GamePlay: { stageId: number };
  StageComplete: { stageId: number };

  // Stage 5 specific
  IntensitySelect: undefined;

  // Paywall
  Paywall: undefined;

  // Quiz
  QuizSetup: undefined;
  QuizWaiting: { roomCode: string; isHost: boolean };
  QuizPlay: undefined;
  QuizResults: undefined;

  // End
  Wheel: undefined;
  Results: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
