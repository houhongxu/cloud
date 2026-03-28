import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { isLastQuestionIndex } from '../../../../lib/questionnaire-progress';
import type { QuestionnaireQuestion } from '../../../../lib/questionnaire';
import { color, gradient, shadow } from '../../../../theme/design-tokens';
import { font } from '../../../../theme/typography';

export type QuestionnaireStepQuestionProps = Readonly<{
  question: QuestionnaireQuestion;
  questionIndex: number;
  totalQuestions: number;
  progress: number;
  onBack?: () => void;
  onOpenLanguage?: () => void;
  languageLabel: string;
  onSelectOption: (optionId: string) => void;
  onSkip: () => void;
  onComplete: () => void;
}>;

export const QuestionnaireStepQuestion = ({
  question,
  questionIndex,
  totalQuestions,
  progress,
  onBack,
  onOpenLanguage,
  languageLabel,
  onSelectOption,
  onSkip,
  onComplete,
}: QuestionnaireStepQuestionProps) => {
  const { t } = useTranslation();

  return (
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.contentWrapper}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} disabled={!onBack}>
            <Text style={[styles.backButtonText, !onBack && { opacity: 0.4 }]}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { flex: progress }]} />
            <View style={{ flex: 1 - progress }} />
          </View>
          <TouchableOpacity style={styles.langButton} onPress={onOpenLanguage} activeOpacity={0.9}>
            <Text style={styles.langButtonText}>{languageLabel}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.questionSection}>
          <Text style={styles.questionIndex}>{t('questionnaire.questionIndex', { index: questionIndex + 1 })}</Text>
          <Text style={styles.questionTitle}>{question.title}</Text>
        </View>

        <View style={styles.optionsWrapper}>
          {question.options.map((option) => (
            <TouchableOpacity key={option.id} style={styles.optionCard} onPress={() => onSelectOption(option.id)}>
              <View style={styles.optionOrderBubble}>
                <Text style={styles.optionOrderText}>{option.order}</Text>
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          {isLastQuestionIndex(questionIndex, totalQuestions) ? (
            <TouchableOpacity style={styles.completeButton} onPress={onComplete} activeOpacity={0.92}>
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
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.soft,
  },
  backButtonText: {
    color: color.text,
    fontSize: 22,
    marginTop: -2,
    fontFamily: font.headingBold,
  },
  progressTrack: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.overlay,
    borderRadius: 8,
    height: 8,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: color.primary,
  },
  langButton: {
    height: 34,
    minWidth: 64,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: color.surface,
    ...shadow.soft,
  },
  langButtonText: {
    color: color.text,
    fontSize: 14,
    fontFamily: font.bodySemi,
  },
  questionSection: {
    gap: 18,
    marginTop: 18,
  },
  questionIndex: {
    color: color.text,
    fontSize: 36,
    lineHeight: 44,
    textDecorationLine: 'underline',
    textDecorationColor: color.primary,
    textDecorationStyle: 'solid',
    fontFamily: font.headingBold,
    textAlign: 'center',
  },
  questionTitle: {
    color: color.text,
    fontSize: 28,
    lineHeight: 34,
    fontFamily: font.body,
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
    borderColor: color.border,
    borderRadius: 28,
    backgroundColor: color.surface,
    minHeight: 78,
    paddingHorizontal: 16,
    ...shadow.card,
  },
  optionOrderBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: color.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionOrderText: {
    color: color.primaryDark,
    fontSize: 18,
    fontFamily: font.bodyBold,
  },
  optionLabel: {
    color: color.text,
    fontSize: 26,
    lineHeight: 32,
    fontFamily: font.bodyMedium,
    flex: 1,
  },
  footer: {
    alignItems: 'center',
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  skipText: {
    color: color.primary,
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    fontFamily: font.bodyMedium,
  },
  completeButton: {
    width: '100%',
    maxWidth: 420,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.cta,
    ...shadow.lifted,
  },
  completeButtonText: {
    color: color.ctaText,
    fontSize: 20,
    lineHeight: 24,
    fontFamily: font.bodyBold,
  },
});
