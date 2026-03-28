import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getDefaultPlanSections } from '../../../../lib/questionnaire-plan';
import { color, gradient, radius, shadow } from '../../../../theme/design-tokens';
import { font } from '../../../../theme/typography';

type QuestionnaireStepPlanProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepPlan = ({ onContinue }: QuestionnaireStepPlanProps) => {
  const { t } = useTranslation();
  const sections = useMemo(() => getDefaultPlanSections(), []);

  return (
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />

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
    color: color.text,
    fontSize: 22,
    lineHeight: 28,
    fontFamily: font.headingBold,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  subtitle: {
    marginTop: 10,
    color: color.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: font.bodySemi,
    textAlign: 'center',
  },
  datePill: {
    marginTop: 12,
    paddingHorizontal: 12,
    height: 28,
    borderRadius: 14,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  datePillText: {
    color: color.text,
    fontSize: 12,
    fontFamily: font.bodyBold,
  },
  centerBlock: {
    marginTop: 24,
    alignItems: 'center',
  },
  starsRow: {
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  stars: {
    color: color.goldAccent,
    fontSize: 14,
    letterSpacing: 1,
    fontFamily: font.bodyBold,
  },
  heroTitle: {
    marginTop: 16,
    color: color.text,
    fontSize: 24,
    lineHeight: 30,
    fontFamily: font.headingBold,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  heroSubtitle: {
    marginTop: 6,
    color: color.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: font.bodySemi,
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
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagPillPrimary: {
    backgroundColor: color.overlay,
    borderColor: color.primary,
  },
  tagText: {
    color: color.textSecondary,
    fontSize: 12,
    fontFamily: font.bodySemi,
  },
  tagTextPrimary: {
    color: color.primaryDark,
  },
  sections: {
    marginTop: 22,
    gap: 18,
  },
  section: {
    paddingTop: 8,
  },
  sectionTitle: {
    color: color.text,
    fontSize: 18,
    lineHeight: 22,
    fontFamily: font.headingBold,
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
    color: color.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: font.bodySemi,
  },
  noteCard: {
    marginTop: 14,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.soft,
  },
  noteText: {
    color: color.textMuted,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.bodySemi,
  },
  illustrationWrap: {
    marginTop: 16,
    height: 110,
    borderRadius: radius.lg,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadow.soft,
  },
  illustrationBlob: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: color.overlayStrong,
    top: -140,
    right: -120,
  },
  illustrationText: {
    color: color.textMuted,
    fontSize: 12,
    fontFamily: font.bodySemi,
  },
  discountCard: {
    marginTop: 22,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    alignItems: 'center',
    ...shadow.card,
  },
  discountTitle: {
    color: color.text,
    fontSize: 18,
    lineHeight: 22,
    fontFamily: font.headingBold,
  },
  discountSubtitle: {
    marginTop: 6,
    color: color.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: font.bodySemi,
    textAlign: 'center',
  },
  couponPill: {
    marginTop: 12,
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: color.overlay,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponText: {
    color: color.text,
    fontSize: 12,
    fontFamily: font.bodyBold,
  },
  claimButton: {
    marginTop: 12,
    width: 160,
    height: 42,
    borderRadius: 21,
    backgroundColor: color.primary,
    borderWidth: 1,
    borderColor: color.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  claimButtonText: {
    color: color.textOnPrimary,
    fontSize: 13,
    fontFamily: font.bodyBold,
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
    backgroundColor: color.cta,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lifted,
  },
  primaryButtonText: {
    color: color.ctaText,
    fontSize: 16,
    fontFamily: font.bodyBold,
  },
});

