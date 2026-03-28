import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { color, gradient, shadow } from '../../../../theme/design-tokens';
import { font } from '../../../../theme/typography';

type QuestionnaireStepPlaceholderProps = Readonly<{
  titleKey:
    | 'questionnaireSteps.symptom'
    | 'questionnaireSteps.harm'
    | 'questionnaireSteps.benefit'
    | 'questionnaireSteps.goal'
    | 'questionnaireSteps.commitment'
    | 'questionnaireSteps.plan';
  descriptionKey:
    | 'questionnaireSteps.todoSymptom'
    | 'questionnaireSteps.todoHarm'
    | 'questionnaireSteps.todoBenefit'
    | 'questionnaireSteps.todoGoal'
    | 'questionnaireSteps.todoCommitment'
    | 'questionnaireSteps.todoPlan';
  primaryCtaKey: 'questionnaireSteps.ctaContinue';
  onPrimaryPress?: () => void;
}>;

export const QuestionnaireStepPlaceholder = ({
  titleKey,
  descriptionKey,
  primaryCtaKey,
  onPrimaryPress,
}: QuestionnaireStepPlaceholderProps) => {
  const { t } = useTranslation();

  return (
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>{t(titleKey)}</Text>
        <Text style={styles.description}>{t(descriptionKey)}</Text>

        <TouchableOpacity style={styles.primaryButton} onPress={onPrimaryPress} activeOpacity={0.92}>
          <Text style={styles.primaryButtonText}>{t(primaryCtaKey)}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 64,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    color: color.text,
    fontSize: 26,
    lineHeight: 32,
    fontFamily: font.headingBold,
    textAlign: 'center',
  },
  description: {
    color: color.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: font.bodySemi,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 420,
    height: 58,
    borderRadius: 29,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lifted,
  },
  primaryButtonText: {
    color: color.textOnPrimary,
    fontSize: 18,
    fontFamily: font.bodyBold,
  },
});
