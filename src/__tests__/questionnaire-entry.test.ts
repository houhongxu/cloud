import {
  getQuestionnaireEntry,
  resetQuestionnaireEntry,
  setQuestionnaireField,
  useQuestionnaireEntryStore,
  shouldShowWelcome,
} from '../lib/questionnaire-entry';

describe('shouldShowWelcome', () => {
  it('returns true at start before quiz begins', () => {
    expect(shouldShowWelcome(false, 0)).toBe(true);
  });

  it('throws when current index is invalid', () => {
    expect(() => shouldShowWelcome(false, -1)).toThrow(
      'current index must be a non-negative integer',
    );
  });

  it('throws when current index is not an integer', () => {
    expect(() => shouldShowWelcome(false, 1.2)).toThrow(
      'current index must be a non-negative integer',
    );
  });

  it('returns false as a boundary case after quiz started', () => {
    expect(shouldShowWelcome(true, 0)).toBe(false);
  });
});

describe('questionnaire entry store', () => {
  beforeEach(() => {
    resetQuestionnaireEntry();
  });

  it('starts empty and allows setting fields', () => {
    expect(getQuestionnaireEntry()).toEqual({ step: 1, currentIndex: 0, answers: {}, fields: {} });
    setQuestionnaireField('motivation', 'stay present');
    expect(getQuestionnaireEntry().fields.motivation).toBe('stay present');
  });

  it('throws when field key is empty', () => {
    expect(() => setQuestionnaireField('   ', 'x')).toThrow('field key must be non-empty');
  });

  it('resets to initial state as a boundary case', () => {
    setQuestionnaireField('motivation', 'x');
    resetQuestionnaireEntry();
    expect(getQuestionnaireEntry()).toEqual({ step: 1, currentIndex: 0, answers: {}, fields: {} });
  });

  it('moves to step 2 when welcome completed', () => {
    expect(getQuestionnaireEntry().step).toBe(1);
    useQuestionnaireEntryStore.getState().completeWelcome();
    expect(getQuestionnaireEntry().step).toBe(2);
  });

  it('clamps current index and supports back navigation', () => {
    useQuestionnaireEntryStore.getState().setCurrentIndex(3);
    expect(getQuestionnaireEntry().currentIndex).toBe(3);
    useQuestionnaireEntryStore.getState().goBackQuestion();
    expect(getQuestionnaireEntry().currentIndex).toBe(2);

    useQuestionnaireEntryStore.getState().setCurrentIndex(-10);
    expect(getQuestionnaireEntry().currentIndex).toBe(0);
    useQuestionnaireEntryStore.getState().goBackQuestion();
    expect(getQuestionnaireEntry().currentIndex).toBe(0);
  });

  it('stores answers and supports setting step directly', () => {
    useQuestionnaireEntryStore.getState().setAnswer('q1', 'a1');
    expect(getQuestionnaireEntry().answers.q1).toBe('a1');

    useQuestionnaireEntryStore.getState().setStep(2);
    expect(getQuestionnaireEntry().step).toBe(2);
  });

  it('supports analysis step 3', () => {
    useQuestionnaireEntryStore.getState().setStep(3);
    expect(getQuestionnaireEntry().step).toBe(3);
  });

  it('supports steps 4-9 as boundary cases', () => {
    useQuestionnaireEntryStore.getState().setStep(4);
    expect(getQuestionnaireEntry().step).toBe(4);
    useQuestionnaireEntryStore.getState().setStep(5);
    expect(getQuestionnaireEntry().step).toBe(5);
    useQuestionnaireEntryStore.getState().setStep(6);
    expect(getQuestionnaireEntry().step).toBe(6);
    useQuestionnaireEntryStore.getState().setStep(7);
    expect(getQuestionnaireEntry().step).toBe(7);
    useQuestionnaireEntryStore.getState().setStep(8);
    expect(getQuestionnaireEntry().step).toBe(8);
    useQuestionnaireEntryStore.getState().setStep(9);
    expect(getQuestionnaireEntry().step).toBe(9);
  });
});
