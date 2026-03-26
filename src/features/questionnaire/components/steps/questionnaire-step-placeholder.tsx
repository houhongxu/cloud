import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type QuestionnaireStepPlaceholderProps = Readonly<{
  titleKey:
    | 'questionnaireSteps.symptom'
    | 'questionnaireSteps.harm'
    | 'questionnaireSteps.benefit'
    | 'questionnaireSteps.goal'
    | 'questionnaireSteps.commitment';
  descriptionKey:
    | 'questionnaireSteps.todoSymptom'
    | 'questionnaireSteps.todoHarm'
    | 'questionnaireSteps.todoBenefit'
    | 'questionnaireSteps.todoGoal'
    | 'questionnaireSteps.todoCommitment';
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
    <LinearGradient colors={['#06123a', '#07113f', '#050b2b']} style={styles.container}>
      <StatusBar style="light" />
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
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 420,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1f8fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
});
