import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  off,
  update,
  remove,
} from 'firebase/database';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export interface QuizRoom {
  hostId: string;
  hostName: string;
  guestId?: string;
  guestName?: string;
  status: 'waiting' | 'playing' | 'finished';
  currentQuestion: number;
  questions: string[];
  answers: {
    [index: number]: {
      host?: { self: number; partner: number };
      guest?: { self: number; partner: number };
    };
  };
  createdAt: number;
}

export const createQuizRoom = async (
  roomCode: string,
  hostName: string,
  questionIds: string[]
): Promise<void> => {
  const roomRef = ref(database, `rooms/${roomCode}`);
  await set(roomRef, {
    hostId: `host_${Date.now()}`,
    hostName,
    status: 'waiting',
    currentQuestion: 0,
    questions: questionIds,
    answers: {},
    createdAt: Date.now(),
  });
};

export const joinQuizRoom = async (
  roomCode: string,
  guestName: string
): Promise<QuizRoom | null> => {
  const roomRef = ref(database, `rooms/${roomCode}`);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) return null;

  await update(roomRef, {
    guestId: `guest_${Date.now()}`,
    guestName,
    status: 'playing',
  });

  return snapshot.val();
};

export const submitQuizAnswer = async (
  roomCode: string,
  questionIndex: number,
  isHost: boolean,
  selfAnswer: number,
  partnerAnswer: number
): Promise<void> => {
  const path = `rooms/${roomCode}/answers/${questionIndex}/${isHost ? 'host' : 'guest'}`;
  await set(ref(database, path), { self: selfAnswer, partner: partnerAnswer });
};

export const subscribeToRoom = (
  roomCode: string,
  callback: (room: QuizRoom | null) => void
): (() => void) => {
  const roomRef = ref(database, `rooms/${roomCode}`);
  onValue(roomRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null);
  });
  return () => off(roomRef);
};

export const deleteQuizRoom = async (roomCode: string): Promise<void> => {
  const roomRef = ref(database, `rooms/${roomCode}`);
  await remove(roomRef);
};

export const updateQuizRoom = async (
  roomCode: string,
  updates: Partial<QuizRoom>
): Promise<void> => {
  const roomRef = ref(database, `rooms/${roomCode}`);
  await update(roomRef, updates);
};

export { database };
