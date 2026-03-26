import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { normalizeLanguage, setStoredLanguage, type SupportedLanguage } from '../../../lib/i18n-language';
import {
  buildInitialAnswers,
  getQuestionnaireQuestions,
  type QuestionnaireAnswerMap,
} from '../../../lib/questionnaire';
import { isLastQuestionIndex } from '../../../lib/questionnaire-progress';
import { useQuestionnaireEntryStore } from '../../../lib/questionnaire-entry';
import { LanguagePickerModal } from './language-picker-modal';
import { QuestionnaireStepAnalysis } from './steps/questionnaire-step-analysis';
import { QuestionnaireStepBenefit } from './steps/questionnaire-step-benefit';
import { QuestionnaireStepCommitment } from './steps/questionnaire-step-commitment';
import { QuestionnaireStepGoal } from './steps/questionnaire-step-goal';
import { QuestionnaireStepHarm } from './steps/questionnaire-step-harm';
import { QuestionnaireStepPlan } from './steps/questionnaire-step-plan';
import { QuestionnaireStepQuestion } from './steps/questionnaire-step-question';
import { QuestionnaireStepSymptom } from './steps/questionnaire-step-symptom';
import { QuestionnaireStepWelcome } from './steps/questionnaire-step-welcome';

export const QuestionnaireFlow = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const selectedLanguage = normalizeLanguage(language);
  const questions = useMemo(() => getQuestionnaireQuestions(language), [language]);
  const step = useQuestionnaireEntryStore((s) => s.step);
  const currentIndex = useQuestionnaireEntryStore((s) => s.currentIndex);
  const setCurrentIndex = useQuestionnaireEntryStore((s) => s.setCurrentIndex);
  const goBackQuestion = useQuestionnaireEntryStore((s) => s.goBackQuestion);
  const completeWelcome = useQuestionnaireEntryStore((s) => s.completeWelcome);
  const setAnswer = useQuestionnaireEntryStore((s) => s.setAnswer);
  const setStep = useQuestionnaireEntryStore((s) => s.setStep);
  const persistedAnswers = useQuestionnaireEntryStore((s) => s.answers);

  const safeIndex = Math.min(currentIndex, Math.max(questions.length - 1, 0));
  const currentQuestion = questions[safeIndex];
  const progress = questions.length === 0 ? 0 : (safeIndex + 1) / questions.length;
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

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

  const onOpenLanguageModal = (): void => {
    setLanguageModalVisible(true);
  };

  const onSelectLanguage = (nextLanguage: SupportedLanguage): void => {
    setStoredLanguage(nextLanguage);
    void i18n.changeLanguage(nextLanguage);
    setLanguageModalVisible(false);
  };

  const onSelectOption = (optionId: string): void => {
    if (!currentQuestion) return;
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
    setStep(3);
  };

  const languageLabel = selectedLanguage === 'zh' ? '🇨🇳 中文' : '🇺🇸 EN';
  const shouldShowFloatingBack = step >= 3;

  const onFloatingBack = (): void => {
    if (step === 9) return setStep(8);
    if (step === 8) return setStep(7);
    if (step === 7) return setStep(6);
    if (step === 6) return setStep(5);
    if (step === 5) return setStep(4);
    if (step === 4) return setStep(3);
    if (step === 3) return setStep(2);
  };

  if (questions.length === 0) {
    return null;
  }

  if (step === 3) {
    return (
      <View style={styles.root}>
        <QuestionnaireStepAnalysis onCheckSymptoms={() => setStep(4)} />
        {shouldShowFloatingBack ? (
          <TouchableOpacity style={styles.floatingBackButton} onPress={onFloatingBack} activeOpacity={0.92}>
            <Text style={styles.floatingBackText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (step === 4) {
    return (
      <View style={styles.root}>
        <QuestionnaireStepSymptom onBack={() => setStep(3)} onContinue={() => setStep(5)} />
        {shouldShowFloatingBack ? (
          <TouchableOpacity style={styles.floatingBackButton} onPress={onFloatingBack} activeOpacity={0.92}>
            <Text style={styles.floatingBackText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (step === 5) {
    return (
      <View style={styles.root}>
        <QuestionnaireStepHarm onContinue={() => setStep(6)} />
        {shouldShowFloatingBack ? (
          <TouchableOpacity style={styles.floatingBackButton} onPress={onFloatingBack} activeOpacity={0.92}>
            <Text style={styles.floatingBackText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (step === 6) {
    return (
      <View style={styles.root}>
        <QuestionnaireStepBenefit onBack={() => setStep(5)} onContinue={() => setStep(7)} />
        {shouldShowFloatingBack ? (
          <TouchableOpacity style={styles.floatingBackButton} onPress={onFloatingBack} activeOpacity={0.92}>
            <Text style={styles.floatingBackText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (step === 7) {
    return (
      <View style={styles.root}>
        <QuestionnaireStepGoal
          onContinue={() => setStep(8)}
        />
        {shouldShowFloatingBack ? (
          <TouchableOpacity style={styles.floatingBackButton} onPress={onFloatingBack} activeOpacity={0.92}>
            <Text style={styles.floatingBackText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (step === 8) {
    return (
      <View style={styles.root}>
        <QuestionnaireStepCommitment
          onContinue={() => setStep(9)}
        />
        {shouldShowFloatingBack ? (
          <TouchableOpacity style={styles.floatingBackButton} onPress={onFloatingBack} activeOpacity={0.92}>
            <Text style={styles.floatingBackText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (step === 9) {
    return (
      <View style={styles.root}>
        <QuestionnaireStepPlan
          onContinue={() => {
            console.log('[questionnaire-plan-continue]', { step, currentIndex: safeIndex, answers });
          }}
        />
        {shouldShowFloatingBack ? (
          <TouchableOpacity style={styles.floatingBackButton} onPress={onFloatingBack} activeOpacity={0.92}>
            <Text style={styles.floatingBackText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  if (step === 1) {
    return <QuestionnaireStepWelcome onComplete={completeWelcome} />;
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <>
      <LanguagePickerModal
        visible={isLanguageModalVisible}
        selected={selectedLanguage}
        onClose={() => setLanguageModalVisible(false)}
        onSelect={onSelectLanguage}
      />
      <QuestionnaireStepQuestion
        question={currentQuestion}
        questionIndex={safeIndex}
        totalQuestions={questions.length}
        progress={progress}
        onBack={goBackQuestion}
        onOpenLanguage={onOpenLanguageModal}
        languageLabel={languageLabel}
        onSelectOption={onSelectOption}
        onSkip={onSkip}
        onComplete={onCompleteQuiz}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  floatingBackButton: {
    position: 'absolute',
    left: 18,
    bottom: 18,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 24, 75, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  floatingBackText: {
    color: '#ffffff',
    fontSize: 22,
    marginTop: -2,
    fontWeight: '900',
  },
});
