import {
  buildInitialAnswers,
  getQuestionnaireQuestions,
  saveSingleChoice,
} from '../../lib/questionnaire';

describe('getQuestionnaireQuestions', () => {
  it('returns localized questions for zh variants', () => {
    const questions = getQuestionnaireQuestions('zh-CN');
    expect(questions.length).toBeGreaterThan(0);
    expect(questions[0]?.title).toContain('你的');
    expect(questions[0]?.options[0]?.order).toBe(1);
  });

  it('throws when language is empty', () => {
    expect(() => getQuestionnaireQuestions('   ')).toThrow('language is required');
  });
});

describe('buildInitialAnswers', () => {
  it('builds null answers for each question id', () => {
    const questions = getQuestionnaireQuestions('en');
    const answers = buildInitialAnswers(questions);
    expect(Object.keys(answers)).toHaveLength(questions.length);
    expect(answers[questions[0]!.id]).toBeNull();
  });

  it('returns empty map as a boundary case', () => {
    expect(buildInitialAnswers([])).toEqual({});
  });
});

describe('saveSingleChoice', () => {
  it('saves selected option for existing question', () => {
    const questions = getQuestionnaireQuestions('en');
    const answers = buildInitialAnswers(questions);
    const questionId = questions[0]!.id;
    const next = saveSingleChoice(answers, questionId, 'any-option');
    expect(next[questionId]).toBe('any-option');
    expect(answers[questionId]).toBeNull();
  });

  it('throws when question id does not exist', () => {
    expect(() => saveSingleChoice({ q1: null }, 'q999', 'x')).toThrow('question does not exist');
  });
});

