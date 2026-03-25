import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  buildInitialAnswers,
  getQuestionnaireQuestions,
  type QuestionnaireAnswerMap,
} from '../../../lib/questionnaire';
import { useQuestionnaireEntryStore } from '../../../lib/questionnaire-entry';
import { WelcomeSequence } from './welcome-sequence';

export const QuestionnaireFlow = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const questions = useMemo(() => getQuestionnaireQuestions(language), [language]);
  const step = useQuestionnaireEntryStore((s) => s.step);
  const currentIndex = useQuestionnaireEntryStore((s) => s.currentIndex);
  const setCurrentIndex = useQuestionnaireEntryStore((s) => s.setCurrentIndex);
  const goBackQuestion = useQuestionnaireEntryStore((s) => s.goBackQuestion);
  const completeWelcome = useQuestionnaireEntryStore((s) => s.completeWelcome);
  const setAnswer = useQuestionnaireEntryStore((s) => s.setAnswer);
  const persistedAnswers = useQuestionnaireEntryStore((s) => s.answers);

  useEffect(() => {
    if (questions.length === 0) return;
    const nextIndex = Math.min(currentIndex, questions.length - 1);
    if (nextIndex !== currentIndex) {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, questions, setCurrentIndex]);

  if (questions.length === 0) {
    return null;
  }

  const safeIndex = Math.min(currentIndex, questions.length - 1);
  const currentQuestion = questions[safeIndex];
  if (!currentQuestion) {
    return null;
  }

  const progress = (safeIndex + 1) / questions.length;

  const answers: QuestionnaireAnswerMap = useMemo(() => {
    return {
      ...buildInitialAnswers(questions),
      ...persistedAnswers,
    };
  }, [questions, persistedAnswers]);

  const onToggleLanguage = (): void => {
    const nextLanguage = i18n.language.startsWith('zh') ? 'en' : 'zh';
    void i18n.changeLanguage(nextLanguage);
  };

  const onSelectOption = (optionId: string): void => {
    setAnswer(currentQuestion.id, optionId);
    const isLastQuestion = safeIndex >= questions.length - 1;
    if (!isLastQuestion) {
      setCurrentIndex(safeIndex + 1);
    } else {
      console.log('[questionnaire-entry]', { step, currentIndex: safeIndex, answers });
    }
  };

  const onSkip = (): void => {
    const isLastQuestion = safeIndex >= questions.length - 1;
    if (!isLastQuestion) {
      setCurrentIndex(safeIndex + 1);
    } else {
      console.log('[questionnaire-entry]', { step, currentIndex: safeIndex, answers });
    }
  };

  if (step === 1) {
    return (
      <>
        <StatusBar style="light" />
        <WelcomeSequence onComplete={completeWelcome} />
      </>
    );
  }

  return (
    <LinearGradient colors={['#06123a', '#07113f', '#050b2b']} style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.contentWrapper}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={goBackQuestion}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { flex: progress }]} />
            <View style={{ flex: 1 - progress }} />
          </View>
          <TouchableOpacity style={styles.langButton} onPress={onToggleLanguage}>
            <Text style={styles.langButtonText}>{language.startsWith('zh') ? '中文' : 'EN'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.questionSection}>
          <Text style={styles.questionIndex}>
            {t('questionnaire.questionIndex', { index: safeIndex + 1 })}
          </Text>
          <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
        </View>

        <View style={styles.optionsWrapper}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionCard}
              onPress={() => onSelectOption(option.id)}
            >
              <View style={styles.optionOrderBubble}>
                <Text style={styles.optionOrderText}>{option.order}</Text>
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
            <Text style={styles.skipText}>{t('questionnaire.skip')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 54,
    paddingBottom: 26,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 22,
    marginTop: -2,
  },
  progressTrack: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    height: 8,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: '#3fd7ff',
  },
  langButton: {
    height: 34,
    minWidth: 64,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(11, 24, 75, 0.62)',
  },
  langButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  questionSection: {
    gap: 18,
    marginTop: 18,
  },
  questionIndex: {
    color: '#ffffff',
    fontSize: 36,
    lineHeight: 44,
    textDecorationLine: 'underline',
    textDecorationColor: '#ffffff',
    textDecorationStyle: 'solid',
    fontWeight: '800',
    textAlign: 'center',
  },
  questionTitle: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionsWrapper: {
    gap: 18,
    marginTop: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(51, 64, 127, 0.9)',
    borderRadius: 28,
    backgroundColor: 'rgba(5, 8, 50, 0.75)',
    minHeight: 78,
    paddingHorizontal: 16,
  },
  optionOrderBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4ed9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionOrderText: {
    color: '#0d1b5b',
    fontSize: 18,
    fontWeight: '800',
  },
  optionLabel: {
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  skipText: {
    color: '#e4ecff',
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    fontWeight: '500',
  },
});
