import type { QuestionnaireAnswerMap } from './questionnaire';

import { create } from 'zustand';

import type { KeyValueStorage } from './storage/key-value';
import { createMmkvStorage } from './storage/mmkv';

export type QuestionnaireStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type QuestionnaireEntryState = Readonly<{
  step: QuestionnaireStep;
  currentIndex: number;
  answers: QuestionnaireAnswerMap;
  fields: Readonly<Record<string, string>>;
}>;

export type QuestionnaireEntryActions = Readonly<{
  completeWelcome: () => void;
  setStep: (step: QuestionnaireStep) => void;
  setCurrentIndex: (index: number) => void;
  goBackQuestion: () => void;
  setAnswer: (questionId: string, optionId: string) => void;
  setField: (key: string, value: string) => void;
}>;

export type QuestionnaireEntryStore = QuestionnaireEntryState & QuestionnaireEntryActions;

const STORAGE_KEYS = {
  step: 'questionnaire.step',
  currentIndex: 'questionnaire.currentIndex',
  answers: 'questionnaire.answers',
  fields: 'questionnaire.fields',
} as const;

const safeParseJson = <T>(raw: string | undefined): T | undefined => {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return undefined;
  }
};

const safeParseInt = (raw: string | undefined): number | undefined => {
  if (raw === undefined) return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : undefined;
};

const clampNonNegativeInt = (value: number): number => {
  if (!Number.isInteger(value) || value < 0) return 0;
  return value;
};

const normalizePersistedStep = (raw: number | undefined): QuestionnaireStep => {
  if (raw === 2 || raw === 3 || raw === 4 || raw === 5 || raw === 6 || raw === 7 || raw === 8 || raw === 9) {
    return raw;
  }
  return 1;
};

const readInitialState = (storage: KeyValueStorage): QuestionnaireEntryState => {
  const persistedStep = safeParseInt(storage.getString(STORAGE_KEYS.step));
  const persistedIndex = safeParseInt(storage.getString(STORAGE_KEYS.currentIndex));
  const persistedAnswers = safeParseJson<QuestionnaireAnswerMap>(storage.getString(STORAGE_KEYS.answers));
  const persistedFields = safeParseJson<Record<string, string>>(storage.getString(STORAGE_KEYS.fields));

  const step = normalizePersistedStep(persistedStep);
  const currentIndex = clampNonNegativeInt(persistedIndex ?? 0);

  return {
    step,
    currentIndex,
    answers: persistedAnswers && typeof persistedAnswers === 'object' ? persistedAnswers : {},
    fields: persistedFields && typeof persistedFields === 'object' ? persistedFields : {},
  };
};

let lastPersisted: QuestionnaireEntryState | null = null;

const persistState = (storage: KeyValueStorage, next: QuestionnaireEntryState): void => {
  const last = lastPersisted;

  if (!last || next.step !== last.step) storage.setString(STORAGE_KEYS.step, String(next.step));
  if (!last || next.currentIndex !== last.currentIndex) {
    storage.setString(STORAGE_KEYS.currentIndex, String(next.currentIndex));
  }
  if (!last || next.answers !== last.answers) storage.setString(STORAGE_KEYS.answers, JSON.stringify(next.answers));
  if (!last || next.fields !== last.fields) storage.setString(STORAGE_KEYS.fields, JSON.stringify(next.fields));

  lastPersisted = next;
};

const defaultStorage = (): KeyValueStorage => {
  return createMmkvStorage();
};

const storage = defaultStorage();
const initialState = readInitialState(storage);

export const useQuestionnaireEntryStore = create<QuestionnaireEntryStore>((set, get) => {
  const store = {
    ...initialState,
    completeWelcome: () => {
      set({ step: 2 });
    },
    setStep: (step) => {
      set({ step });
    },
    setCurrentIndex: (index) => {
      set({ currentIndex: clampNonNegativeInt(index) });
    },
    goBackQuestion: () => {
      const { currentIndex } = get();
      set({ currentIndex: currentIndex > 0 ? currentIndex - 1 : 0 });
    },
    setAnswer: (questionId, optionId) => {
      set((prev) => ({
        answers: {
          ...prev.answers,
          [questionId]: optionId,
        },
      }));
    },
    setField: (key, value) => {
      if (key.trim().length === 0) {
        throw new Error('field key must be non-empty');
      }

      set((prev) => ({
        fields: {
          ...prev.fields,
          [key]: value,
        },
      }));
    },
  } satisfies QuestionnaireEntryStore;

  return store;
});

useQuestionnaireEntryStore.subscribe((state) => {
  persistState(storage, state);
});

persistState(storage, useQuestionnaireEntryStore.getState());

export type QuestionnaireEntry = QuestionnaireEntryState;

export const getQuestionnaireEntry = (): QuestionnaireEntry => {
  const { step, currentIndex, answers, fields } = useQuestionnaireEntryStore.getState();
  return { step, currentIndex, answers, fields };
};

export const resetQuestionnaireEntry = (): void => {
  storage.delete(STORAGE_KEYS.step);
  storage.delete(STORAGE_KEYS.currentIndex);
  storage.delete(STORAGE_KEYS.answers);
  storage.delete(STORAGE_KEYS.fields);

  useQuestionnaireEntryStore.setState({
    step: 1,
    currentIndex: 0,
    answers: {},
    fields: {},
  });
};

export const setQuestionnaireAnswers = (answers: QuestionnaireAnswerMap): void => {
  useQuestionnaireEntryStore.setState({ answers });
};

export const setQuestionnaireField = (key: string, value: string): void => {
  useQuestionnaireEntryStore.getState().setField(key, value);
};

export const shouldShowWelcome = (hasStartedQuiz: boolean, currentIndex: number): boolean => {
  if (!Number.isInteger(currentIndex) || currentIndex < 0) {
    throw new Error('current index must be a non-negative integer');
  }

  return !hasStartedQuiz && currentIndex === 0;
};
