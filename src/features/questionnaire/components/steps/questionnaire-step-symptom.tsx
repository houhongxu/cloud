import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  getDefaultSymptomCategories,
  isValidSymptomSelection,
  toggleSelectedSymptom,
  type SymptomId,
} from '../../../../lib/questionnaire-symptoms';
import { color, gradient, radius, shadow } from '../../../../theme/design-tokens';
import { font } from '../../../../theme/typography';

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
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />

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
  headerTitle: {
    color: color.text,
    fontSize: 22,
    lineHeight: 28,
    fontFamily: font.headingBold,
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
    backgroundColor: color.dangerSurface,
    borderRadius: radius.lg,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: color.dangerBorder,
    ...shadow.card,
  },
  infoCardText: {
    color: color.dangerMuted,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: font.bodySemi,
  },
  instructions: {
    color: color.text,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: font.bodySemi,
    marginTop: 4,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: color.textSecondary,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: font.headingSemi,
  },
  options: {
    gap: 14,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.border,
    borderRadius: 28,
    backgroundColor: color.surface,
    minHeight: 68,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...shadow.soft,
  },
  optionCardSelected: {
    borderColor: color.primary,
    backgroundColor: color.surfaceMuted,
  },
  checkOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: color.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  checkOuterSelected: {
    borderColor: color.primary,
  },
  checkInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.primary,
  },
  optionText: {
    color: color.text,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: font.bodySemi,
    flex: 1,
  },
  errorText: {
    color: color.danger,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: font.bodyBold,
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
    backgroundColor: color.cta,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lifted,
  },
  primaryButtonText: {
    color: color.ctaText,
    fontSize: 18,
    fontFamily: font.bodyBold,
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
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    ...shadow.card,
  },
  floatingBackText: {
    color: color.text,
    fontSize: 22,
    marginTop: -2,
    fontFamily: font.headingBold,
  },
});
