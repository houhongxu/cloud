import {
  buildInitialAnswers,
  getQuestionnaireQuestions,
  saveSingleChoice,
} from '../lib/questionnaire';

describe('questionnaire flow helpers', () => {
  it('builds localized questionnaire and saves selected option', () => {
    const questions = getQuestionnaireQuestions('zh-CN');
    const firstQuestion = questions[0];
    if (!firstQuestion) {
      throw new Error('expected first question');
    }
    const answers = buildInitialAnswers(questions);
    const firstOption = firstQuestion.options[0];
    if (!firstOption) {
      throw new Error('expected first option');
    }
    const updatedAnswers = saveSingleChoice(answers, firstQuestion.id, firstOption.id);

    expect(firstQuestion.title).toBe('你的性别是？');
    expect(updatedAnswers[firstQuestion.id]).toBe(firstOption.id);
  });

  it('throws when language is empty', () => {
    expect(() => getQuestionnaireQuestions('')).toThrow('language is required');
  });

  it('throws when saving answer to unknown question', () => {
    const questions = getQuestionnaireQuestions('en');
    const answers = buildInitialAnswers(questions);

    expect(() => saveSingleChoice(answers, 'q999', 'mock')).toThrow('question does not exist');
  });

  it('falls back to English and keeps null answers as boundary case', () => {
    const questions = getQuestionnaireQuestions('fr');
    const firstQuestion = questions[0];
    if (!firstQuestion) {
      throw new Error('expected first question');
    }
    const answers = buildInitialAnswers(questions);

    expect(firstQuestion.title).toBe('What is your gender?');
    expect(Object.values(answers).every((value) => value === null)).toBe(true);
  });
});
