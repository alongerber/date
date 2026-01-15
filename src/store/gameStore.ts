/**
 * Game Store - Zustand
 *
 * ניהול מצב המשחק כולל:
 * - פרטי שחקנים
 * - שלבים ותורות
 * - ניקוד וטו
 * - מצב משחק
 */

import { create } from 'zustand';
import { Gender } from '@/components/common/GenderSelector';

// Types
export interface Player {
  id: 'player1' | 'player2';
  name: string;
  gender: Gender | null;
  score: number;
  vetosUsed: number;
  vetosRemaining: number;
}

export interface Turn {
  playerId: 'player1' | 'player2';
  itemId: string;
  type: 'question' | 'task';
  difficultyChosen: 1 | 2 | 3;
  pointsAvailable: number;
  vetoed: boolean;
  completed: boolean;
  answer?: string;
  partnerConfirmed?: boolean;
}

export interface StageProgress {
  stageId: number;
  stageName: string;
  currentItemIndex: number;
  totalItems: number;
  completed: boolean;
  turns: Turn[];
}

export type GamePhase =
  | 'splash'
  | 'onboarding'
  | 'intro'
  | 'playing'
  | 'paywall'
  | 'quiz_setup'
  | 'quiz_playing'
  | 'quiz_results'
  | 'wheel'
  | 'results';

export type IntensityLevel = 'soft' | 'medium' | 'spicy';

// Constants
export const MAX_VETOS_PER_PLAYER = 3;

export const POINTS = {
  difficulty: {
    1: 10,  // קל
    2: 20,  // בינוני
    3: 35,  // אמיץ
  },
  veto: -15,
  quizCorrect: 5,
} as const;

export const STAGES = [
  { id: 1, name: 'רגע לפני שנפגשנו', items: 8, questionRatio: 0.7 },
  { id: 2, name: 'הרמת כוסית', items: 8, questionRatio: 0.4 },
  { id: 3, name: 'דברים שלא אומרים בקול', items: 8, questionRatio: 0.5 },
  { id: 4, name: 'מלחמת הגירסאות', items: 8, questionRatio: 0.8 },
  { id: 5, name: 'טמפרטורה עולה', items: 8, questionRatio: 0.3 },
  { id: 6, name: 'החידון הזוגי', items: 24, questionRatio: 1.0 },
  { id: 7, name: 'הסיום', items: 0, questionRatio: 0 },
] as const;

// Store State
interface GameState {
  // Players
  player1: Player;
  player2: Player;

  // Game state
  phase: GamePhase;
  currentStage: number;
  currentTurn: 'player1' | 'player2';
  stageProgress: StageProgress[];

  // Stage 5 intensity
  intensityLevel: IntensityLevel | null;

  // Premium
  isPremium: boolean;

  // Sound
  soundEnabled: boolean;

  // Quiz specific
  quizRoomCode: string | null;
  quizConnected: boolean;

  // Actions
  setPlayerName: (playerId: 'player1' | 'player2', name: string) => void;
  setPlayerGender: (playerId: 'player1' | 'player2', gender: Gender) => void;
  setPhase: (phase: GamePhase) => void;
  startGame: () => void;
  nextStage: () => void;
  nextTurn: () => void;
  selectDifficulty: (difficulty: 1 | 2 | 3) => void;
  completeQuestion: (answer: string) => void;
  completeTask: (partnerConfirmed: boolean) => void;
  useVeto: () => void;
  setIntensityLevel: (level: IntensityLevel) => void;
  setPremium: (isPremium: boolean) => void;
  toggleSound: () => void;
  setQuizRoomCode: (code: string | null) => void;
  setQuizConnected: (connected: boolean) => void;
  resetGame: () => void;
  getCurrentPlayer: () => Player;
  getPartner: () => Player;
  getWinner: () => Player | null;
}

const initialPlayer = (id: 'player1' | 'player2'): Player => ({
  id,
  name: '',
  gender: null,
  score: 0,
  vetosUsed: 0,
  vetosRemaining: MAX_VETOS_PER_PLAYER,
});

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  player1: initialPlayer('player1'),
  player2: initialPlayer('player2'),
  phase: 'splash',
  currentStage: 0,
  currentTurn: 'player1',
  stageProgress: [],
  intensityLevel: null,
  isPremium: false,
  soundEnabled: true,
  quizRoomCode: null,
  quizConnected: false,

  // Actions
  setPlayerName: (playerId, name) => {
    set((state) => ({
      [playerId]: { ...state[playerId], name },
    }));
  },

  setPlayerGender: (playerId, gender) => {
    set((state) => ({
      [playerId]: { ...state[playerId], gender },
    }));
  },

  setPhase: (phase) => {
    set({ phase });
  },

  startGame: () => {
    const stageProgress: StageProgress[] = STAGES.slice(0, 5).map((stage) => ({
      stageId: stage.id,
      stageName: stage.name,
      currentItemIndex: 0,
      totalItems: stage.items,
      completed: false,
      turns: [],
    }));

    set({
      phase: 'playing',
      currentStage: 1,
      currentTurn: 'player1',
      stageProgress,
    });
  },

  nextStage: () => {
    const { currentStage, isPremium } = get();
    const nextStageNum = currentStage + 1;

    // Check for paywall after stage 2
    if (nextStageNum === 3 && !isPremium) {
      set({ phase: 'paywall' });
      return;
    }

    // Check if moving to quiz (stage 6)
    if (nextStageNum === 6) {
      set({
        currentStage: 6,
        phase: 'quiz_setup',
      });
      return;
    }

    // Check if game complete
    if (nextStageNum > 7) {
      set({ phase: 'results' });
      return;
    }

    // Mark current stage as complete
    set((state) => {
      const newProgress = [...state.stageProgress];
      const currentProgress = newProgress.find((p) => p.stageId === currentStage);
      if (currentProgress) {
        currentProgress.completed = true;
      }
      return {
        stageProgress: newProgress,
        currentStage: nextStageNum,
        currentTurn: 'player1',
      };
    });
  },

  nextTurn: () => {
    set((state) => ({
      currentTurn: state.currentTurn === 'player1' ? 'player2' : 'player1',
    }));
  },

  selectDifficulty: (difficulty) => {
    const { currentStage, currentTurn, stageProgress } = get();
    const points = POINTS.difficulty[difficulty];

    set((state) => {
      const newProgress = [...state.stageProgress];
      const currentProgress = newProgress.find((p) => p.stageId === currentStage);

      if (currentProgress) {
        const turn: Turn = {
          playerId: currentTurn,
          itemId: `${currentStage}_${currentProgress.currentItemIndex}`,
          type: Math.random() < STAGES[currentStage - 1].questionRatio ? 'question' : 'task',
          difficultyChosen: difficulty,
          pointsAvailable: points,
          vetoed: false,
          completed: false,
        };
        currentProgress.turns.push(turn);
      }

      return { stageProgress: newProgress };
    });
  },

  completeQuestion: (answer) => {
    const { currentStage, currentTurn, stageProgress } = get();

    set((state) => {
      const newProgress = [...state.stageProgress];
      const currentProgress = newProgress.find((p) => p.stageId === currentStage);

      if (currentProgress && currentProgress.turns.length > 0) {
        const lastTurn = currentProgress.turns[currentProgress.turns.length - 1];
        lastTurn.completed = true;
        lastTurn.answer = answer;

        // Add points
        const player = state[currentTurn];
        const newScore = player.score + lastTurn.pointsAvailable;

        // Move to next item
        currentProgress.currentItemIndex++;

        return {
          stageProgress: newProgress,
          [currentTurn]: { ...player, score: newScore },
        };
      }

      return { stageProgress: newProgress };
    });
  },

  completeTask: (partnerConfirmed) => {
    const { currentStage, currentTurn, stageProgress } = get();

    set((state) => {
      const newProgress = [...state.stageProgress];
      const currentProgress = newProgress.find((p) => p.stageId === currentStage);

      if (currentProgress && currentProgress.turns.length > 0) {
        const lastTurn = currentProgress.turns[currentProgress.turns.length - 1];
        lastTurn.completed = true;
        lastTurn.partnerConfirmed = partnerConfirmed;

        const player = state[currentTurn];
        let newScore = player.score;
        let newVetosUsed = player.vetosUsed;
        let newVetosRemaining = player.vetosRemaining;

        if (partnerConfirmed) {
          // Task completed successfully
          newScore += lastTurn.pointsAvailable;
        } else {
          // Auto veto
          lastTurn.vetoed = true;
          newScore += POINTS.veto;
          newVetosUsed++;
          newVetosRemaining--;
        }

        // Move to next item
        currentProgress.currentItemIndex++;

        return {
          stageProgress: newProgress,
          [currentTurn]: {
            ...player,
            score: newScore,
            vetosUsed: newVetosUsed,
            vetosRemaining: newVetosRemaining,
          },
        };
      }

      return { stageProgress: newProgress };
    });
  },

  useVeto: () => {
    const { currentStage, currentTurn, stageProgress } = get();

    set((state) => {
      const player = state[currentTurn];

      if (player.vetosRemaining <= 0) {
        return state;
      }

      const newProgress = [...state.stageProgress];
      const currentProgress = newProgress.find((p) => p.stageId === currentStage);

      if (currentProgress && currentProgress.turns.length > 0) {
        const lastTurn = currentProgress.turns[currentProgress.turns.length - 1];
        lastTurn.vetoed = true;
        lastTurn.completed = true;

        // Move to next item
        currentProgress.currentItemIndex++;

        return {
          stageProgress: newProgress,
          [currentTurn]: {
            ...player,
            score: player.score + POINTS.veto,
            vetosUsed: player.vetosUsed + 1,
            vetosRemaining: player.vetosRemaining - 1,
          },
        };
      }

      return state;
    });
  },

  setIntensityLevel: (level) => {
    set({ intensityLevel: level });
  },

  setPremium: (isPremium) => {
    set({ isPremium });
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },

  setQuizRoomCode: (code) => {
    set({ quizRoomCode: code });
  },

  setQuizConnected: (connected) => {
    set({ quizConnected: connected });
  },

  resetGame: () => {
    set({
      player1: { ...initialPlayer('player1'), name: get().player1.name, gender: get().player1.gender },
      player2: { ...initialPlayer('player2'), name: get().player2.name, gender: get().player2.gender },
      phase: 'splash',
      currentStage: 0,
      currentTurn: 'player1',
      stageProgress: [],
      intensityLevel: null,
      quizRoomCode: null,
      quizConnected: false,
    });
  },

  getCurrentPlayer: () => {
    const { currentTurn, player1, player2 } = get();
    return currentTurn === 'player1' ? player1 : player2;
  },

  getPartner: () => {
    const { currentTurn, player1, player2 } = get();
    return currentTurn === 'player1' ? player2 : player1;
  },

  getWinner: () => {
    const { player1, player2 } = get();
    if (player1.score > player2.score) return player1;
    if (player2.score > player1.score) return player2;
    return null; // Tie
  },
}));

export default useGameStore;
