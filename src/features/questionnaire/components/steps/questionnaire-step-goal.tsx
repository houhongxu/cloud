import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  getDefaultGoalItems,
  isValidGoalSelection,
  toggleSingleGoal,
  type GoalId,
} from '../../../../lib/questionnaire-goals';

type QuestionnaireStepGoalProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepGoal = ({ onContinue }: QuestionnaireStepGoalProps) => {
  const { t } = useTranslation();
  const items = useMemo(() => getDefaultGoalItems(), []);
  const [selected, setSelected] = useState<GoalId | null>(null);
  const [showError, setShowError] = useState(false);

  const canContinue = isValidGoalSelection(selected);

  const onPressContinue = (): void => {
    if (!canContinue) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue?.();
  };

  return (
    <LinearGradient colors={['#020617', '#07112a', '#020617']} style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeftSpacer} />
          <Text style={styles.headerTitle}>{t('goals.title')}</Text>
          <View style={styles.headerRightSpacer} />
        </View>

        <Text style={styles.subtitle}>{t('goals.subtitle')}</Text>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {items.map((item) => {
            const isSelected = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.goalCard, { backgroundColor: item.background[0] }]}
                activeOpacity={0.92}
                onPress={() => {
                  setSelected((prev) => toggleSingleGoal(prev, item.id));
                  setShowError(false);
                }}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View style={[styles.iconCircle, { borderColor: item.accent }]}>
                  <Text style={styles.iconText}>{item.iconText}</Text>
                </View>

                <Text style={styles.goalText}>{t(item.labelKey)}</Text>

                <View style={[styles.radioOuter, { borderColor: item.accent }]}>
                  {isSelected ? <View style={[styles.radioInner, { backgroundColor: item.accent }]} /> : null}
                </View>
              </TouchableOpacity>
            );
          })}

          {showError ? <Text style={styles.errorText}>{t('goals.validation')}</Text> : null}
        </ScrollView>

        <TouchableOpacity
          style={[styles.primaryButton, !canContinue && { opacity: 0.65 }]}
          onPress={onPressContinue}
          activeOpacity={0.92}
        >
          <Text style={styles.primaryButtonText}>{t('goals.cta')}</Text>
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
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerLeftSpacer: {
    width: 44,
    height: 44,
  },
  headerRightSpacer: {
    width: 44,
    height: 44,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 22,
  },
  scrollContent: {
    paddingBottom: 110,
    gap: 14,
  },
  goalCard: {
    minHeight: 72,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  goalText: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#ffb4b4',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  primaryButton: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 22,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#0b1220',
    fontSize: 16,
    fontWeight: '900',
  },
});
