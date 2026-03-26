import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  getDefaultSymptomCategories,
  isValidSymptomSelection,
  toggleSelectedSymptom,
  type SymptomId,
} from '../../../../lib/questionnaire-symptoms';

type QuestionnaireStepSymptomProps = Readonly<{
  onBack?: () => void;
  onContinue?: () => void;
}>;

export const QuestionnaireStepSymptom = ({ onBack, onContinue }: QuestionnaireStepSymptomProps) => {
  const { t } = useTranslation();
  const categories = useMemo(() => getDefaultSymptomCategories(), []);
  const [selected, setSelected] = useState<SymptomId[]>([]);
  const [showError, setShowError] = useState(false);
  const canContinue = isValidSymptomSelection(selected);

  const onPressContinue = (): void => {
    if (!canContinue) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue?.();
  };

  return (
    <LinearGradient colors={['#06123a', '#07113f', '#050b2b']} style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} disabled={!onBack}>
            <Text style={[styles.backButtonText, !onBack && { opacity: 0.4 }]}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('questionnaireSteps.symptom')}</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.infoCard}>
            <Text style={styles.infoCardText}>{t('symptoms.info')}</Text>
          </View>

          <Text style={styles.instructions}>{t('symptoms.instructions')}</Text>

          {categories.map((category) => (
            <View key={category.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{t(category.titleKey)}</Text>

              <View style={styles.options}>
                {category.items.map((item) => {
                  const isSelected = selected.includes(item.id);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                      activeOpacity={0.92}
                      onPress={() => {
                        setSelected((prev) => toggleSelectedSymptom(prev, item.id));
                        setShowError(false);
                      }}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: isSelected }}
                    >
                      <View style={[styles.checkOuter, isSelected && styles.checkOuterSelected]}>
                        {isSelected ? <View style={styles.checkInner} /> : null}
                      </View>
                      <Text style={styles.optionText}>{t(item.labelKey)}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {showError ? <Text style={styles.errorText}>{t('symptoms.validation')}</Text> : null}
        </ScrollView>

        <TouchableOpacity
          style={[styles.primaryButton, !canContinue && { opacity: 0.6 }]}
          onPress={onPressContinue}
          activeOpacity={0.92}
        >
          <Text style={styles.primaryButtonText}>{t('symptoms.cta')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.floatingBackButton}
        onPress={onBack}
        disabled={!onBack}
        activeOpacity={0.92}
      >
        <Text style={[styles.floatingBackText, !onBack && { opacity: 0.4 }]}>{'<'}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 54,
    paddingBottom: 26,
    paddingHorizontal: 22,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
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
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  headerRightSpacer: {
    width: 36,
    height: 36,
  },
  scrollContent: {
    paddingBottom: 18,
    gap: 18,
  },
  infoCard: {
    backgroundColor: '#e0333b',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  infoCardText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  instructions: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
  },
  options: {
    gap: 14,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(51, 64, 127, 0.9)',
    borderRadius: 28,
    backgroundColor: 'rgba(5, 8, 50, 0.75)',
    minHeight: 68,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  optionCardSelected: {
    borderColor: 'rgba(255, 255, 255, 0.38)',
    backgroundColor: 'rgba(10, 16, 70, 0.72)',
  },
  checkOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkOuterSelected: {
    borderColor: '#ffffff',
  },
  checkInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    flex: 1,
  },
  errorText: {
    color: '#ff5d6c',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 4,
  },
  primaryButton: {
    marginTop: 14,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    height: 58,
    borderRadius: 29,
    backgroundColor: '#e0333b',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
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
