import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { normalizeLanguage, setStoredLanguage, type SupportedLanguage } from '../../../lib/i18n-language';
import {
  buildInitialAnswers,
  getQuestionnaireQuestions,
  type QuestionnaireAnswerMap,
} from '../../../lib/questionnaire';
import { isLastQuestionIndex } from '../../../lib/questionnaire-progress';
import { useQuestionnaireEntryStore } from '../../../lib/questionnaire-entry';
import { CalculatingScreen } from './calculating-screen';
import { LanguagePickerModal } from './language-picker-modal';
import { WelcomeSequence } from './welcome-sequence';

export const QuestionnaireFlow = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const selectedLanguage = normalizeLanguage(language);
  const questions = useMemo(() => getQuestionnaireQuestions(language), [language]);
  const step = useQuestionnaireEntryStore((s) => s.step);
  const currentIndex = useQuestionnaireEntryStore((s) => s.currentIndex);
  const setCurrentIndex = useQuestionnaireEntryStore((s) => s.setCurrentIndex);
  const goBackQuestion = useQuestionnaireEntryStore((s) => s.goBackQuestion);
  const completeWelcome = useQuestionnaireEntryStore((s) => s.completeWelcome);
  const setAnswer = useQuestionnaireEntryStore((s) => s.setAnswer);
  const persistedAnswers = useQuestionnaireEntryStore((s) => s.answers);

  const safeIndex = Math.min(currentIndex, Math.max(questions.length - 1, 0));
  const currentQuestion = questions[safeIndex];
  const progress = questions.length === 0 ? 0 : (safeIndex + 1) / questions.length;
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [isCalculating, setCalculating] = useState(false);

  const answers: QuestionnaireAnswerMap = useMemo(() => {
    return {
      ...buildInitialAnswers(questions),
      ...persistedAnswers,
    };
  }, [questions, persistedAnswers]);

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

  if (!currentQuestion) {
    return null;
  }

  const onOpenLanguageModal = (): void => {
    setLanguageModalVisible(true);
  };

  const onSelectLanguage = (nextLanguage: SupportedLanguage): void => {
    setStoredLanguage(nextLanguage);
    void i18n.changeLanguage(nextLanguage);
    setLanguageModalVisible(false);
  };

  const onSelectOption = (optionId: string): void => {
    setAnswer(currentQuestion.id, optionId);
    const isLastQuestion = isLastQuestionIndex(safeIndex, questions.length);
    if (!isLastQuestion) {
      setCurrentIndex(safeIndex + 1);
    } else {
      console.log('[questionnaire-entry]', { step, currentIndex: safeIndex, answers });
    }
  };

  const onSkip = (): void => {
    setCurrentIndex(safeIndex + 1);
  };

  const onCompleteQuiz = (): void => {
    setCalculating(true);
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
      <LanguagePickerModal
        visible={isLanguageModalVisible}
        selected={selectedLanguage}
        onClose={() => setLanguageModalVisible(false)}
        onSelect={onSelectLanguage}
      />
      <CalculatingScreen
        visible={isCalculating}
        onDone={() => {
          console.log('[questionnaire-complete]', { step, currentIndex: safeIndex, answers });
        }}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={goBackQuestion}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { flex: progress }]} />
            <View style={{ flex: 1 - progress }} />
          </View>
          <TouchableOpacity style={styles.langButton} onPress={onOpenLanguageModal} activeOpacity={0.9}>
            <Text style={styles.langButtonText}>
              {selectedLanguage === 'zh' ? '🇨🇳 中文' : '🇺🇸 EN'}
            </Text>
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
          {isLastQuestionIndex(safeIndex, questions.length) ? (
            <TouchableOpacity style={styles.completeButton} onPress={onCompleteQuiz} activeOpacity={0.92}>
              <Text style={styles.completeButtonText}>Complete Quiz</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
              <Text style={styles.skipText}>{t('questionnaire.skip')}</Text>
            </TouchableOpacity>
          )}
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
  completeButton: {
    width: '100%',
    maxWidth: 420,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  completeButtonText: {
    color: '#0b1b4d',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '800',
  },
});
