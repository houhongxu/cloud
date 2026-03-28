import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeDailyCheckinModal } from '../features/home/components/home-daily-checkin-modal';
import { useHomeDailyCheckinModal } from '../features/home/hooks/use-home-daily-checkin-modal';
import { color, gradient, radius, shadow } from '../theme/design-tokens';
import { font } from '../theme/typography';

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

type TodoKey = 'notifications' | 'tree' | 'community' | 'blocker' | 'help';

const TODO_KEYS: readonly TodoKey[] = ['notifications', 'tree', 'community', 'blocker', 'help'];

const MAIN_KEYS = ['melius', 'reason', 'chat', 'learn', 'achievements'] as const;
const MIND_KEYS = ['sideEffects', 'motivation', 'breath', 'stories'] as const;

const MENU_DOT_COLORS = [
  color.primary,
  color.cta,
  color.goldAccent,
  '#EC4899',
  '#38BDF8',
  '#A855F7',
  '#14B8A6',
  '#F59E0B',
];

export const HomeScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarSpace = 72 + Math.max(insets.bottom, 10);
  const { checkinModalVisible, dismissCheckinModalForToday } = useHomeDailyCheckinModal();

  return (
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.starfield} pointerEvents="none">
        {STARFIELD.map((p, i) => (
          <View
            key={`star-${String(i)}`}
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
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12, paddingBottom: tabBarSpace + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.brand}>{t('welcome.brandName')}</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIconBtn}
              accessibilityRole="button"
              accessibilityLabel={t('home.headerCloudA11y')}
              activeOpacity={0.88}
            >
              <View style={styles.headerIconPlaceholder} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIconBtn}
              accessibilityRole="button"
              accessibilityLabel={t('home.headerTrophyA11y')}
              activeOpacity={0.88}
            >
              <View style={styles.headerIconPlaceholder} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.hero}>
          <LinearGradient
            colors={[...gradient.heroDisc]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroDisc}
          >
            <View style={styles.heroDiscInner} />
          </LinearGradient>
          <Text style={styles.heroHint}>{t('home.journeyHint')}</Text>
          <Text style={styles.timerMain}>{t('home.timerMinutes', { m: 0 })}</Text>
          <View style={styles.secondsPill}>
            <Text style={styles.timerSeconds}>{t('home.timerSeconds', { s: '00' })}</Text>
          </View>
        </View>

        <View style={styles.quickRow}>
          {(['pledge', 'meditate', 'reset', 'more'] as const).map((key) => (
            <View key={key} style={styles.quickItem}>
              <TouchableOpacity style={styles.quickCircle} activeOpacity={0.9} accessibilityRole="button">
                <View style={styles.quickCircleInner} />
              </TouchableOpacity>
              <Text style={styles.quickLabel}>{t(`home.quick.${key}`)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('home.progress.brainTitle')}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
          <Text style={styles.cardMeta}>{t('home.progress.brainMeta', { current: 0 })}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('home.progress.challengeTitle')}</Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
          <Text style={styles.cardMeta}>{t('home.progress.challengeMeta', { current: 0 })}</Text>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>{t('home.todo.title')}</Text>
          <Text style={styles.sectionGlyph}>{'· ·'}</Text>
        </View>

        <View style={styles.todoList}>
          {TODO_KEYS.map((key) => (
            <View key={key} style={styles.todoRow}>
              <View style={styles.todoIcon} />
              <View style={styles.todoTextBlock}>
                <Text style={styles.todoTitle}>{t(`home.todo.${key}.title`)}</Text>
                <Text style={styles.todoDesc}>{t(`home.todo.${key}.desc`)}</Text>
              </View>
              <View style={styles.radioOuter} />
            </View>
          ))}
        </View>

        <View style={styles.dualRow}>
          <View style={styles.dualCard}>
            <View style={styles.dualIcon} />
            <Text style={styles.dualLabel}>{t('home.status.targetLabel')}</Text>
            <Text style={styles.dualValue}>{t('home.status.targetDate')}</Text>
          </View>
          <View style={styles.dualCard}>
            <View style={[styles.dualIcon, styles.dualIconWarm]} />
            <Text style={styles.dualLabel}>{t('home.status.temptedLabel')}</Text>
            <Text style={[styles.dualValue, styles.dualValueGreen]}>{t('home.status.temptedValue')}</Text>
          </View>
        </View>

        <View style={styles.quoteCard}>
          <View style={styles.quoteTop}>
            <Text style={styles.quoteTitle}>{t('home.motivation.title')}</Text>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel={t('home.motivation.editA11y')}>
              <Text style={styles.quoteEdit}>{'✎'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.quoteBody}>{t('home.motivation.body')}</Text>
          <View style={styles.quoteBadgeRow}>
            <Text style={styles.quoteStar}>{'★'}</Text>
            <Text style={styles.quoteBadge}>{t('home.motivation.best')}</Text>
          </View>
        </View>

        <Text style={styles.menuSectionTitle}>{t('home.sections.main')}</Text>
        <View style={styles.menuList}>
          {MAIN_KEYS.map((key, idx) => (
            <View key={key} style={styles.menuRow}>
              <View style={[styles.menuDot, { backgroundColor: MENU_DOT_COLORS[idx % MENU_DOT_COLORS.length] }]} />
              <Text style={styles.menuLabel}>{t(`home.mainMenu.${key}`)}</Text>
              <Text style={styles.menuMore}>{'···'}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.menuSectionTitle}>{t('home.sections.mindfulness')}</Text>
        <View style={styles.menuList}>
          {MIND_KEYS.map((key, idx) => (
            <View key={key} style={styles.menuRow}>
              <View
                style={[styles.menuDot, { backgroundColor: MENU_DOT_COLORS[(idx + 3) % MENU_DOT_COLORS.length] }]}
              />
              <Text style={styles.menuLabel}>{t(`home.mindfulnessMenu.${key}`)}</Text>
              <Text style={styles.menuMore}>{'···'}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footerQuote}>{t('home.footerQuote')}</Text>

        <TouchableOpacity style={styles.primaryCta} activeOpacity={0.92} accessibilityRole="button">
          <Text style={styles.primaryCtaIcon}>{'▶'}</Text>
          <Text style={styles.primaryCtaText}>{t('home.startJourney')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <HomeDailyCheckinModal visible={checkinModalVisible} onDismissForToday={dismissCheckinModalForToday} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    color: color.text,
    fontSize: 22,
    fontFamily: font.headingBold,
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  headerIconPlaceholder: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: color.secondary,
  },
  hero: {
    marginTop: 18,
    alignItems: 'center',
  },
  heroDisc: {
    width: 168,
    height: 168,
    borderRadius: 84,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: color.borderStrong,
    ...shadow.lifted,
  },
  heroDiscInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  heroHint: {
    marginTop: 14,
    color: color.textSecondary,
    fontSize: 13,
    fontFamily: font.bodySemi,
  },
  timerMain: {
    marginTop: 6,
    color: color.text,
    fontSize: 44,
    fontFamily: font.headingBold,
  },
  secondsPill: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: color.overlayStrong,
    borderWidth: 1,
    borderColor: color.border,
  },
  timerSeconds: {
    color: color.primaryDark,
    fontSize: 13,
    fontFamily: font.bodyBold,
  },
  quickRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickItem: {
    width: '22%',
    alignItems: 'center',
  },
  quickCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  quickCircleInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: color.secondary,
  },
  quickLabel: {
    marginTop: 8,
    color: color.textMuted,
    fontSize: 11,
    fontFamily: font.bodySemi,
    textAlign: 'center',
  },
  card: {
    marginTop: 16,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.card,
  },
  cardTitle: {
    color: color.text,
    fontSize: 14,
    fontFamily: font.headingSemi,
  },
  progressTrack: {
    marginTop: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: color.overlay,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: color.cta,
  },
  cardMeta: {
    marginTop: 8,
    color: color.textSecondary,
    fontSize: 12,
    fontFamily: font.bodySemi,
  },
  sectionHeaderRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: color.text,
    fontSize: 18,
    fontFamily: font.headingBold,
  },
  sectionGlyph: {
    color: color.textMuted,
    fontSize: 14,
    fontFamily: font.bodyBold,
  },
  todoList: {
    marginTop: 12,
    gap: 10,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.soft,
  },
  todoIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: color.overlay,
  },
  todoTextBlock: {
    flex: 1,
    marginLeft: 10,
  },
  todoTitle: {
    color: color.text,
    fontSize: 14,
    fontFamily: font.bodyBold,
  },
  todoDesc: {
    marginTop: 4,
    color: color.textSecondary,
    fontSize: 12,
    fontFamily: font.bodyMedium,
    lineHeight: 16,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: color.borderStrong,
  },
  dualRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  dualCard: {
    flex: 1,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.soft,
  },
  dualIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    marginBottom: 8,
  },
  dualIconWarm: {
    backgroundColor: 'rgba(217, 119, 6, 0.22)',
  },
  dualLabel: {
    color: color.textMuted,
    fontSize: 11,
    fontFamily: font.bodySemi,
    lineHeight: 14,
  },
  dualValue: {
    marginTop: 6,
    color: color.text,
    fontSize: 12,
    fontFamily: font.bodyBold,
    lineHeight: 16,
  },
  dualValueGreen: {
    color: color.ctaDark,
  },
  quoteCard: {
    marginTop: 16,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.card,
  },
  quoteTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quoteTitle: {
    color: color.text,
    fontSize: 14,
    fontFamily: font.headingSemi,
    flex: 1,
    paddingRight: 10,
  },
  quoteEdit: {
    color: color.primary,
    fontSize: 18,
    fontFamily: font.bodyBold,
  },
  quoteBody: {
    marginTop: 10,
    color: color.textSecondary,
    fontSize: 13,
    fontFamily: font.body,
    lineHeight: 18,
  },
  quoteBadgeRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quoteStar: {
    color: color.goldAccent,
    fontSize: 14,
    fontFamily: font.bodyBold,
  },
  quoteBadge: {
    color: color.textMuted,
    fontSize: 12,
    fontFamily: font.bodySemi,
  },
  menuSectionTitle: {
    marginTop: 22,
    color: color.text,
    fontSize: 15,
    fontFamily: font.headingSemi,
  },
  menuList: {
    marginTop: 10,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.borderSubtle,
    backgroundColor: color.surface,
    ...shadow.soft,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: color.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.borderSubtle,
  },
  menuDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  menuLabel: {
    flex: 1,
    color: color.text,
    fontSize: 14,
    fontFamily: font.bodySemi,
  },
  menuMore: {
    color: color.textMuted,
    fontSize: 16,
    fontFamily: font.bodyBold,
    letterSpacing: 1,
  },
  footerQuote: {
    marginTop: 20,
    color: color.textMuted,
    fontSize: 12,
    fontFamily: font.body,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  primaryCta: {
    marginTop: 16,
    height: 54,
    borderRadius: 27,
    backgroundColor: color.cta,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...shadow.lifted,
  },
  primaryCtaIcon: {
    color: color.ctaText,
    fontSize: 14,
    fontFamily: font.bodyBold,
  },
  primaryCtaText: {
    color: color.ctaText,
    fontSize: 16,
    fontFamily: font.bodyBold,
  },
});
