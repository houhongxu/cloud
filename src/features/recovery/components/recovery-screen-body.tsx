import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

import { recoveryRingStrokeDashoffset } from '../../../lib/recovery-ring';

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
                  <Stop offset="0" stopColor="#a78bfa" stopOpacity="1" />
                  <Stop offset="1" stopColor="#6366f1" stopOpacity="1" />
                </SvgLinearGradient>
              </Defs>
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={r}
                stroke="rgba(255, 255, 255, 0.12)"
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
          <LinearGradient
            colors={['rgba(255,255,255,0.14)', 'rgba(255,255,255,0.04)']}
            style={styles.logoPlaceholderInner}
          >
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
    backgroundColor: '#e2e8f0',
  },
  scroll: {
    paddingHorizontal: 18,
  },
  headerBlock: {
    marginBottom: 8,
  },
  screenTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  displayName: {
    marginTop: 4,
    color: 'rgba(226, 232, 240, 0.55)',
    fontSize: 15,
    fontWeight: '500',
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
    backgroundColor: 'rgba(30, 27, 60, 0.85)',
  },
  ringKicker: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  ringPercent: {
    marginTop: 6,
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
  },
  ringStreak: {
    marginTop: 6,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  intro: {
    color: 'rgba(241, 245, 249, 0.92)',
    fontSize: 15,
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
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    minWidth: 160,
    alignItems: 'center',
  },
  logoPlaceholderText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2,
  },
  onTrack: {
    color: 'rgba(248, 250, 252, 0.9)',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  goalPill: {
    alignSelf: 'center',
    backgroundColor: 'rgba(30, 58, 95, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.35)',
  },
  goalPillText: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
  },
  benefitsCard: {
    backgroundColor: 'rgba(35, 32, 72, 0.72)',
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
  },
  benefitDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  benefitTextCol: {
    flex: 1,
  },
  benefitTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  benefitBody: {
    color: 'rgba(226, 232, 240, 0.78)',
    fontSize: 14,
    lineHeight: 20,
  },
  pledgeCta: {
    alignItems: 'center',
    marginBottom: 14,
  },
  pledgeCtaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
    color: 'rgba(226, 232, 240, 0.65)',
    fontSize: 11,
    marginBottom: 8,
    fontWeight: '600',
  },
  weekDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  achievementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 27, 60, 0.65)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: 12,
  },
  achievementsIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
  },
  achievementsLabel: {
    flex: 1,
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  achievementsChevron: {
    color: 'rgba(226, 232, 240, 0.75)',
    fontSize: 26,
    fontWeight: '300',
    marginTop: -2,
  },
});
