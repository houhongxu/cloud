const SUPPORTED_LANGUAGES = ['en', 'zh'] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

type WelcomeCopy = {
  title: string;
  subtitle: string;
};

const COPY_MAP: Record<SupportedLanguage, WelcomeCopy> = {
  en: {
    title: 'Embrace this pause.',
    subtitle: 'Reflect before you relapse.',
  },
  zh: {
    title: '拥抱这段停顿。',
    subtitle: '在失控之前，先回到觉察。',
  },
};

export const getWelcomeCopy = (language: string): WelcomeCopy => {
  if (!language || language.trim().length === 0) {
    throw new Error('language is required');
  }

  const normalizedLanguage = language.toLowerCase() as SupportedLanguage;

  if (!SUPPORTED_LANGUAGES.includes(normalizedLanguage)) {
    return COPY_MAP.en;
  }

  return COPY_MAP[normalizedLanguage];
};
