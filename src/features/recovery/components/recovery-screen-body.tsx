import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

import { recoveryRingStrokeDashoffset } from '../../../lib/recovery-ring';
import { color, gradient, radius, shadow } from '../../../theme/design-tokens';
import { font } from '../../../theme/typography';

const STARFIELD = [
  { t: 0.04, l: 0.08 },
  { t: 0.12, l: 0.22 },
  { t: 0.08, l: 0.42 },
  { t: 0.18, l: 0.62 },
  { t: 0.06, l: 0.78 },
  { t: 0.22, l: 0.12 },
  { t: 0.28, l: 0.88 },
  { t: 0.34, l: 0.34 },
  { t: 0.4, l: 0.54 },
  { t: 0.46, l: 0.18 },
  { t: 0.52, l: 0.72 },
  { t: 0.58, l: 0.44 },
  { t: 0.64, l: 0.92 },
  { t: 0.7, l: 0.08 },
  { t: 0.76, l: 0.28 },
  { t: 0.82, l: 0.58 },
  { t: 0.88, l: 0.38 },
];

const BENEFIT_KEYS = [
  'confidence',
  'selfEsteem',
  'mentalClarity',
  'libido',
  'healthierThoughts',
  'productivity',
  'sleep',
] as const;

const WEEK_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

const RING_SIZE = 220;
const RING_STROKE = 14;
/** Inner disc matches the hole inside the stroke (diameter = size − 2×stroke). */
const RING_INNER_SIZE = RING_SIZE - 2 * RING_STROKE;
const RECOVERY_PERCENT = 0;
const STREAK_DAYS = 0;

type BenefitKey = (typeof BENEFIT_KEYS)[number];

export const RecoveryScreenBody = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarSpace = 72 + Math.max(insets.bottom, 10);

  const r = (RING_SIZE - RING_STROKE) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = recoveryRingStrokeDashoffset(RECOVERY_PERCENT, circumference);

  return (
    <>
      <View style={styles.starfield} pointerEvents="none">
        {STARFIELD.map((p, i) => (
          <View
            key={`recovery-star-${String(i)}`}
            style={[
              styles.star,
              {
                top: `${p.t * 100}%`,
                left: `${p.l * 100}%`,
                opacity: 0.35 + (i % 5) * 0.08,
              },
            ]}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12, paddingBottom: tabBarSpace + 28 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          <Text style={styles.screenTitle}>{t('tabs.recovery')}</Text>
          <Text style={styles.displayName}>{t('recovery.displayName')}</Text>
        </View>

        <View style={styles.ringWrap}>
          <View style={styles.ringSvgWrap}>
            <Svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
              <Defs>
                <SvgLinearGradient id="recoveryRingGrad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0" stopColor={color.secondary} stopOpacity="1" />
                  <Stop offset="1" stopColor={color.primary} stopOpacity="1" />
                </SvgLinearGradient>
              </Defs>
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={r}
                stroke={gradient.ringTrack}
                strokeWidth={RING_STROKE}
                fill="transparent"
                strokeLinecap="round"
              />
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={r}
                stroke="url(#recoveryRingGrad)"
                strokeWidth={RING_STROKE}
                fill="transparent"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                rotation={-90}
                originX={RING_SIZE / 2}
                originY={RING_SIZE / 2}
              />
            </Svg>
            <View style={[styles.ringCenter, { width: RING_INNER_SIZE, height: RING_INNER_SIZE, borderRadius: RING_INNER_SIZE / 2 }]} pointerEvents="none">
              <Text style={styles.ringKicker}>{t('recovery.ringKicker')}</Text>
              <Text style={styles.ringPercent}>{t('recovery.percentValue', { percent: RECOVERY_PERCENT })}</Text>
              <Text style={styles.ringStreak}>{t('recovery.dayStreak', { days: STREAK_DAYS })}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.intro}>{t('recovery.intro')}</Text>

        <View style={styles.logoPlaceholder} accessibilityLabel={t('recovery.brandLogoA11y')} accessibilityRole="image">
          <LinearGradient colors={[...gradient.logoSheen]} style={styles.logoPlaceholderInner}>
            <Text style={styles.logoPlaceholderText}>{t('welcome.brandName')}</Text>
          </LinearGradient>
        </View>

        <Text style={styles.onTrack}>{t('recovery.onTrackLabel')}</Text>
        <View style={styles.goalPill}>
          <Text style={styles.goalPillText}>{t('recovery.goalPill', { date: t('plan.date') })}</Text>
        </View>

        <View style={styles.benefitsCard}>
          {BENEFIT_KEYS.map((key: BenefitKey, index) => (
            <View key={key}>
              {index > 0 ? <View style={styles.benefitDivider} /> : null}
              <View style={styles.benefitRow}>
                <View
                  style={styles.benefitIcon}
                  accessibilityLabel={t('recovery.benefits.iconPlaceholderA11y')}
                  accessibilityRole="image"
                />
                <View style={styles.benefitTextCol}>
                  <Text style={styles.benefitTitle}>{t(`recovery.benefits.${key}.title`)}</Text>
                  <Text style={styles.benefitBody}>{t(`recovery.benefits.${key}.body`)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.pledgeCta}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel={t('recovery.pledge.cta')}
        >
          <Text style={styles.pledgeCtaText}>{t('recovery.pledge.cta')}</Text>
        </TouchableOpacity>

        <View style={styles.weekRow}>
          {WEEK_KEYS.map((d) => (
            <View key={d} style={styles.weekCol}>
              <Text style={styles.weekLabel}>{t(`recovery.weekDays.${d}`)}</Text>
              <TouchableOpacity
                style={styles.weekDot}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel={t('recovery.pledge.dayA11y', { day: t(`recovery.weekDays.${d}`) })}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.achievementsRow}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel={t('recovery.achievements.rowA11y')}
        >
          <View style={styles.achievementsIcon} />
          <Text style={styles.achievementsLabel}>{t('recovery.achievements.row')}</Text>
          <Text style={styles.achievementsChevron}>{'›'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  starfield: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: color.star,
  },
  scroll: {
    paddingHorizontal: 18,
  },
  headerBlock: {
    marginBottom: 8,
  },
  screenTitle: {
    color: color.text,
    fontSize: 28,
    fontFamily: font.headingBold,
    letterSpacing: 0.3,
  },
  displayName: {
    marginTop: 4,
    color: color.textMuted,
    fontSize: 15,
    fontFamily: font.body,
  },
  ringWrap: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  ringSvgWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.card,
  },
  ringKicker: {
    color: color.textSecondary,
    fontSize: 11,
    fontFamily: font.bodySemi,
    letterSpacing: 1.2,
  },
  ringPercent: {
    marginTop: 6,
    color: color.text,
    fontSize: 36,
    fontFamily: font.headingBold,
  },
  ringStreak: {
    marginTop: 6,
    color: color.textMuted,
    fontSize: 11,
    fontFamily: font.bodySemi,
    letterSpacing: 0.8,
  },
  intro: {
    color: color.textSecondary,
    fontSize: 15,
    fontFamily: font.body,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  logoPlaceholder: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoPlaceholderInner: {
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.border,
    minWidth: 160,
    alignItems: 'center',
    ...shadow.soft,
  },
  logoPlaceholderText: {
    color: color.primaryDark,
    fontSize: 20,
    fontFamily: font.headingSemi,
    letterSpacing: 2,
  },
  onTrack: {
    color: color.text,
    fontSize: 15,
    fontFamily: font.bodySemi,
    textAlign: 'center',
    marginBottom: 10,
  },
  goalPill: {
    alignSelf: 'center',
    backgroundColor: color.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radius.pill,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: color.borderStrong,
    ...shadow.soft,
  },
  goalPillText: {
    color: color.text,
    fontSize: 14,
    fontFamily: font.bodySemi,
  },
  benefitsCard: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    marginBottom: 24,
    ...shadow.card,
  },
  benefitDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.borderSubtle,
    marginVertical: 14,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: color.overlay,
    borderWidth: 1,
    borderColor: color.borderSubtle,
  },
  benefitTextCol: {
    flex: 1,
  },
  benefitTitle: {
    color: color.text,
    fontSize: 16,
    fontFamily: font.headingSemi,
    marginBottom: 6,
  },
  benefitBody: {
    color: color.textSecondary,
    fontSize: 14,
    fontFamily: font.body,
    lineHeight: 20,
  },
  pledgeCta: {
    alignItems: 'center',
    marginBottom: 14,
  },
  pledgeCtaText: {
    color: color.primary,
    fontSize: 16,
    fontFamily: font.bodySemi,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
    paddingHorizontal: 2,
  },
  weekCol: {
    alignItems: 'center',
    flex: 1,
  },
  weekLabel: {
    color: color.textMuted,
    fontSize: 11,
    marginBottom: 8,
    fontFamily: font.bodySemi,
  },
  weekDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.surfaceMuted,
    borderWidth: 1,
    borderColor: color.border,
    ...shadow.soft,
  },
  achievementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    gap: 12,
    ...shadow.card,
  },
  achievementsIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: color.overlay,
    borderWidth: 1,
    borderColor: color.border,
  },
  achievementsLabel: {
    flex: 1,
    color: color.text,
    fontSize: 17,
    fontFamily: font.bodySemi,
  },
  achievementsChevron: {
    color: color.textMuted,
    fontSize: 26,
    fontFamily: font.body,
    marginTop: -2,
  },
});
