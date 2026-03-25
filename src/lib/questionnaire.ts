export type QuestionnaireOption = {
  id: string;
  order: number;
  label: string;
};

export type QuestionnaireQuestion = {
  id: string;
  title: string;
  options: QuestionnaireOption[];
};

export type QuestionnaireAnswerMap = Record<string, string | null>;

type SupportedLanguage = 'en' | 'zh';

type LocalizedQuestionSeed = {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  options: {
    id: string;
    label: {
      en: string;
      zh: string;
    };
  }[];
};

const QUESTION_SEED: LocalizedQuestionSeed[] = [
  {
    id: 'q1',
    title: {
      en: 'What is your gender?',
      zh: '你的性别是？',
    },
    options: [
      { id: 'male', label: { en: 'Male', zh: '男' } },
      { id: 'female', label: { en: 'Female', zh: '女' } },
    ],
  },
  {
    id: 'q2',
    title: {
      en: 'How old are you?',
      zh: '你的年龄是？',
    },
    options: [
      { id: 'under18', label: { en: 'Under 18', zh: '18 岁以下' } },
      { id: '18to24', label: { en: '18-24', zh: '18-24 岁' } },
      { id: '25plus', label: { en: '25+', zh: '25 岁及以上' } },
    ],
  },
  {
    id: 'q3',
    title: {
      en: 'What is your current goal?',
      zh: '你当前的目标是？',
    },
    options: [
      { id: 'quit', label: { en: 'Quit completely', zh: '彻底戒除' } },
      { id: 'reduce', label: { en: 'Reduce frequency', zh: '降低频率' } },
      { id: 'focus', label: { en: 'Improve focus', zh: '提升专注' } },
    ],
  },
  {
    id: 'q4',
    title: {
      en: 'How many days can you stay consistent now?',
      zh: '你目前最多能坚持几天？',
    },
    options: [
      { id: '1day', label: { en: '1 day', zh: '1 天' } },
      { id: '3days', label: { en: '3 days', zh: '3 天' } },
      { id: '7days', label: { en: '7+ days', zh: '7 天以上' } },
    ],
  },
  {
    id: 'q5',
    title: {
      en: 'What support do you want first?',
      zh: '你最想先获得什么支持？',
    },
    options: [
      { id: 'plan', label: { en: 'Daily plan', zh: '每日计划' } },
      { id: 'urge', label: { en: 'Urge coping tools', zh: '冲动应对工具' } },
      { id: 'stats', label: { en: 'Progress stats', zh: '进度统计' } },
    ],
  },
];

const normalizeLanguage = (language: string): SupportedLanguage => {
  if (!language || language.trim().length === 0) {
    throw new Error('language is required');
  }

  if (language.toLowerCase().startsWith('zh')) {
    return 'zh';
  }

  return 'en';
};

export const getQuestionnaireQuestions = (language: string): QuestionnaireQuestion[] => {
  const normalizedLanguage = normalizeLanguage(language);

  return QUESTION_SEED.map((question) => ({
    id: question.id,
    title: question.title[normalizedLanguage],
    options: question.options.map((option, index) => ({
      id: option.id,
      order: index + 1,
      label: option.label[normalizedLanguage],
    })),
  }));
};

export const buildInitialAnswers = (questions: QuestionnaireQuestion[]): QuestionnaireAnswerMap => {
  return questions.reduce<QuestionnaireAnswerMap>((answerMap, question) => {
    answerMap[question.id] = null;
    return answerMap;
  }, {});
};

export const saveSingleChoice = (
  answers: QuestionnaireAnswerMap,
  questionId: string,
  optionId: string
): QuestionnaireAnswerMap => {
  if (!Object.prototype.hasOwnProperty.call(answers, questionId)) {
    throw new Error('question does not exist');
  }

  return {
    ...answers,
    [questionId]: optionId,
  };
};
