import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getDefaultPlanSections } from '../../../../lib/questionnaire-plan';

type QuestionnaireStepPlanProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepPlan = ({ onContinue }: QuestionnaireStepPlanProps) => {
  const { t } = useTranslation();
  const sections = useMemo(() => getDefaultPlanSections(), []);

  return (
    <LinearGradient colors={['#020617', '#07112a', '#020617']} style={styles.container}>
      <StatusBar style="light" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{t('plan.greeting')}</Text>
          <Text style={styles.subtitle}>{t('plan.subtitle')}</Text>
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>{t('plan.date')}</Text>
          </View>
        </View>

        <View style={styles.centerBlock}>
          <View style={styles.starsRow} accessibilityLabel={t('plan.ratingA11y')}>
            <Text style={styles.stars}>{'★★★★★'}</Text>
          </View>
          <Text style={styles.heroTitle}>{t('plan.heroTitle')}</Text>
          <Text style={styles.heroSubtitle}>{t('plan.heroSubtitle')}</Text>

          <View style={styles.tagRow}>
            <View style={[styles.tagPill, styles.tagPillPrimary]}>
              <Text style={[styles.tagText, styles.tagTextPrimary]}>{t('plan.tags.strong')}</Text>
            </View>
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>{t('plan.tags.healthier')}</Text>
            </View>
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>{t('plan.tags.happier')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sections}>
          {sections.map((section) => (
            <View key={section.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{t(section.titleKey)}</Text>

              <View style={styles.bullets}>
                {section.bullets.map((b) => (
                  <View key={b.id} style={styles.bulletRow}>
                    <View style={[styles.bulletDot, { backgroundColor: b.dotColor }]} />
                    <Text style={styles.bulletText}>{t(b.textKey)}</Text>
                  </View>
                ))}
              </View>

              {section.noteKey ? (
                <View style={styles.noteCard}>
                  <Text style={styles.noteText}>{t(section.noteKey)}</Text>
                </View>
              ) : null}

              {section.illustrationKey ? (
                <View style={styles.illustrationWrap} accessibilityLabel={t(section.illustrationKey)}>
                  <View style={styles.illustrationBlob} />
                  <Text style={styles.illustrationText}>{t(section.illustrationKey)}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>

        <View style={styles.discountCard}>
          <Text style={styles.discountTitle}>{t('plan.discount.title')}</Text>
          <Text style={styles.discountSubtitle}>{t('plan.discount.subtitle')}</Text>
          <View style={styles.couponPill}>
            <Text style={styles.couponText}>{t('plan.discount.coupon')}</Text>
          </View>
          <TouchableOpacity style={styles.claimButton} activeOpacity={0.92} onPress={() => {}}>
            <Text style={styles.claimButtonText}>{t('plan.discount.claim')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <TouchableOpacity style={styles.primaryButton} onPress={onContinue} activeOpacity={0.92}>
        <Text style={styles.primaryButtonText}>{t('plan.ctaPrimary')}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 54,
    paddingHorizontal: 18,
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
  },
  greeting: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  subtitle: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.62)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  datePill: {
    marginTop: 12,
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePillText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 12,
    fontWeight: '900',
  },
  centerBlock: {
    marginTop: 24,
    alignItems: 'center',
  },
  starsRow: {
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stars: {
    color: '#ffd56a',
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: '900',
  },
  heroTitle: {
    marginTop: 16,
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  heroSubtitle: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  tagRow: {
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  tagPill: {
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagPillPrimary: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  tagText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 12,
    fontWeight: '800',
  },
  tagTextPrimary: {
    color: '#ffffff',
  },
  sections: {
    marginTop: 22,
    gap: 18,
  },
  section: {
    paddingTop: 8,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
    marginBottom: 10,
  },
  bullets: {
    gap: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    color: 'rgba(255,255,255,0.86)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
  },
  noteCard: {
    marginTop: 14,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  noteText: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
  },
  illustrationWrap: {
    marginTop: 16,
    height: 110,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  illustrationBlob: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    top: -140,
    right: -120,
  },
  illustrationText: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontWeight: '800',
  },
  discountCard: {
    marginTop: 22,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  discountTitle: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
  },
  discountSubtitle: {
    marginTop: 6,
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  couponPill: {
    marginTop: 12,
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 12,
    fontWeight: '900',
  },
  claimButton: {
    marginTop: 12,
    width: 160,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimButtonText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    fontWeight: '900',
  },
  bottomSpacer: {
    height: 10,
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

