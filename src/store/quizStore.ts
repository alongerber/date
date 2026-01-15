/**
 * Quiz Store - Zustand
 *
 * ניהול מצב החידון הזוגי כולל:
 * - סנכרון בין מכשירים
 * - תשובות ותוצאות
 */

import { create } from 'zustand';

export interface QuizQuestion {
  id: string;
  category: 'past' | 'daily' | 'dreams' | 'intimacy' | 'dilemmas' | 'us';
  text: string;
  options: string[];
}

export interface QuizAnswer {
  questionId: string;
  selfAnswer: number; // index of chosen option for self
  partnerAnswer: number; // index of chosen option for partner
}

export interface QuizResult {
  questionId: string;
  player1SelfAnswer: number;
  player1PartnerAnswer: number;
  player2SelfAnswer: number;
  player2PartnerAnswer: number;
  player1Correct: boolean; // player1 guessed player2's answer correctly
  player2Correct: boolean; // player2 guessed player1's answer correctly
}

interface QuizState {
  // Room state
  roomCode: string | null;
  isHost: boolean;
  partnerConnected: boolean;

  // Quiz progress
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  totalQuestions: number;

  // Answers
  myAnswers: QuizAnswer[];
  partnerAnswers: QuizAnswer[];
  results: QuizResult[];

  // Current question state
  currentSelfAnswer: number | null;
  currentPartnerAnswer: number | null;
  partnerHasAnswered: boolean;

  // Scores
  player1Score: number;
  player2Score: number;

  // Actions
  createRoom: () => string;
  joinRoom: (code: string) => void;
  setPartnerConnected: (connected: boolean) => void;
  setQuestions: (questions: QuizQuestion[]) => void;
  setCurrentSelfAnswer: (index: number) => void;
  setCurrentPartnerAnswer: (index: number) => void;
  submitAnswer: () => void;
  setPartnerAnswer: (answer: QuizAnswer) => void;
  nextQuestion: () => void;
  calculateResults: () => void;
  resetQuiz: () => void;
}

// Generate 4-digit room code
const generateRoomCode = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  roomCode: null,
  isHost: false,
  partnerConnected: false,
  questions: [],
  currentQuestionIndex: 0,
  totalQuestions: 24,
  myAnswers: [],
  partnerAnswers: [],
  results: [],
  currentSelfAnswer: null,
  currentPartnerAnswer: null,
  partnerHasAnswered: false,
  player1Score: 0,
  player2Score: 0,

  // Actions
  createRoom: () => {
    const code = generateRoomCode();
    set({
      roomCode: code,
      isHost: true,
      partnerConnected: false,
    });
    return code;
  },

  joinRoom: (code) => {
    set({
      roomCode: code,
      isHost: false,
      partnerConnected: true,
    });
  },

  setPartnerConnected: (connected) => {
    set({ partnerConnected: connected });
  },

  setQuestions: (questions) => {
    set({
      questions,
      totalQuestions: questions.length,
      currentQuestionIndex: 0,
    });
  },

  setCurrentSelfAnswer: (index) => {
    set({ currentSelfAnswer: index });
  },

  setCurrentPartnerAnswer: (index) => {
    set({ currentPartnerAnswer: index });
  },

  submitAnswer: () => {
    const { currentSelfAnswer, currentPartnerAnswer, questions, currentQuestionIndex, myAnswers } = get();

    if (currentSelfAnswer === null || currentPartnerAnswer === null) {
      return;
    }

    const answer: QuizAnswer = {
      questionId: questions[currentQuestionIndex].id,
      selfAnswer: currentSelfAnswer,
      partnerAnswer: currentPartnerAnswer,
    };

    set({
      myAnswers: [...myAnswers, answer],
    });
  },

  setPartnerAnswer: (answer) => {
    set((state) => ({
      partnerAnswers: [...state.partnerAnswers, answer],
      partnerHasAnswered: true,
    }));
  },

  nextQuestion: () => {
    const { currentQuestionIndex, totalQuestions } = get();

    if (currentQuestionIndex < totalQuestions - 1) {
      set({
        currentQuestionIndex: currentQuestionIndex + 1,
        currentSelfAnswer: null,
        currentPartnerAnswer: null,
        partnerHasAnswered: false,
      });
    }
  },

  calculateResults: () => {
    const { myAnswers, partnerAnswers, isHost } = get();

    const results: QuizResult[] = myAnswers.map((myAnswer, index) => {
      const partnerAnswer = partnerAnswers[index];

      if (!partnerAnswer) {
        return {
          questionId: myAnswer.questionId,
          player1SelfAnswer: isHost ? myAnswer.selfAnswer : partnerAnswer?.selfAnswer || 0,
          player1PartnerAnswer: isHost ? myAnswer.partnerAnswer : partnerAnswer?.partnerAnswer || 0,
          player2SelfAnswer: isHost ? partnerAnswer?.selfAnswer || 0 : myAnswer.selfAnswer,
          player2PartnerAnswer: isHost ? partnerAnswer?.partnerAnswer || 0 : myAnswer.partnerAnswer,
          player1Correct: false,
          player2Correct: false,
        };
      }

      const player1SelfAnswer = isHost ? myAnswer.selfAnswer : partnerAnswer.selfAnswer;
      const player1PartnerAnswer = isHost ? myAnswer.partnerAnswer : partnerAnswer.partnerAnswer;
      const player2SelfAnswer = isHost ? partnerAnswer.selfAnswer : myAnswer.selfAnswer;
      const player2PartnerAnswer = isHost ? partnerAnswer.partnerAnswer : myAnswer.partnerAnswer;

      // Player 1 is correct if they guessed Player 2's self-answer
      const player1Correct = player1PartnerAnswer === player2SelfAnswer;
      // Player 2 is correct if they guessed Player 1's self-answer
      const player2Correct = player2PartnerAnswer === player1SelfAnswer;

      return {
        questionId: myAnswer.questionId,
        player1SelfAnswer,
        player1PartnerAnswer,
        player2SelfAnswer,
        player2PartnerAnswer,
        player1Correct,
        player2Correct,
      };
    });

    const player1Score = results.filter((r) => r.player1Correct).length * 5;
    const player2Score = results.filter((r) => r.player2Correct).length * 5;

    set({
      results,
      player1Score,
      player2Score,
    });
  },

  resetQuiz: () => {
    set({
      roomCode: null,
      isHost: false,
      partnerConnected: false,
      questions: [],
      currentQuestionIndex: 0,
      myAnswers: [],
      partnerAnswers: [],
      results: [],
      currentSelfAnswer: null,
      currentPartnerAnswer: null,
      partnerHasAnswered: false,
      player1Score: 0,
      player2Score: 0,
    });
  },
}));

export default useQuizStore;
