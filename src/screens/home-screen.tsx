import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HomeDailyCheckinModal } from '../features/home/components/home-daily-checkin-modal';
import { useHomeDailyCheckinModal } from '../features/home/hooks/use-home-daily-checkin-modal';

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

const MENU_DOT_COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ec4899', '#38bdf8', '#a855f7', '#14b8a6', '#f97316'];

export const HomeScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarSpace = 72 + Math.max(insets.bottom, 10);
  const { checkinModalVisible, dismissCheckinModalForToday } = useHomeDailyCheckinModal();

  return (
    <LinearGradient colors={['#050B1C', '#07112a', '#050B1C']} style={styles.container}>
      <StatusBar style="light" />
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
            colors={['#c9a227', '#8b7355', '#d4af37', '#6b7280']}
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
    backgroundColor: '#e2e8f0',
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
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconPlaceholder: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.35)',
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
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroDiscInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(5, 11, 28, 0.35)',
  },
  heroHint: {
    marginTop: 14,
    color: '#a0a0c0',
    fontSize: 13,
    fontWeight: '700',
  },
  timerMain: {
    marginTop: 6,
    color: '#ffffff',
    fontSize: 44,
    fontWeight: '900',
  },
  secondsPill: {
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(99, 102, 241, 0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  timerSeconds: {
    color: '#e0e7ff',
    fontSize: 13,
    fontWeight: '900',
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCircleInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  quickLabel: {
    marginTop: 8,
    color: '#a0a0c0',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  card: {
    marginTop: 16,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  progressTrack: {
    marginTop: 10,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#00e676',
  },
  cardMeta: {
    marginTop: 8,
    color: '#a0a0c0',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
  },
  sectionGlyph: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 14,
    fontWeight: '900',
  },
  todoList: {
    marginTop: 12,
    gap: 10,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  todoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  todoTextBlock: {
    flex: 1,
    marginLeft: 10,
  },
  todoTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  todoDesc: {
    marginTop: 4,
    color: '#a0a0c0',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  dualRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },
  dualCard: {
    flex: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  dualIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(34, 197, 94, 0.35)',
    marginBottom: 8,
  },
  dualIconWarm: {
    backgroundColor: 'rgba(249, 115, 22, 0.35)',
  },
  dualLabel: {
    color: '#a0a0c0',
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 14,
  },
  dualValue: {
    marginTop: 6,
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 16,
  },
  dualValueGreen: {
    color: '#00e676',
  },
  quoteCard: {
    marginTop: 16,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  quoteTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quoteTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    flex: 1,
    paddingRight: 10,
  },
  quoteEdit: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 18,
    fontWeight: '800',
  },
  quoteBody: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  quoteBadgeRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quoteStar: {
    color: '#ffd56a',
    fontSize: 14,
    fontWeight: '900',
  },
  quoteBadge: {
    color: '#a0a0c0',
    fontSize: 12,
    fontWeight: '800',
  },
  menuSectionTitle: {
    marginTop: 22,
    color: 'rgba(255,255,255,0.86)',
    fontSize: 15,
    fontWeight: '900',
  },
  menuList: {
    marginTop: 10,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  menuDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  menuLabel: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  menuMore: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footerQuote: {
    marginTop: 20,
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  primaryCta: {
    marginTop: 16,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#00c853',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryCtaIcon: {
    color: '#04120a',
    fontSize: 14,
    fontWeight: '900',
  },
  primaryCtaText: {
    color: '#04120a',
    fontSize: 16,
    fontWeight: '900',
  },
});
