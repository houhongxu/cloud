import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color, radius, shadow } from '../../../theme/design-tokens';
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

const TOP_KEYS = ['breathing', 'melius', 'meditate', 'pornResearch'] as const;
const GRID_KEYS = ['articles', 'leaderboard', 'learn', 'podcasts'] as const;
const NOISE_KEYS = ['rain', 'ocean', 'campfire', 'whiteNoise'] as const;

const GRID_GRADIENTS: Record<(typeof GRID_KEYS)[number], readonly [string, string]> = {
  articles: ['#A78BFA', '#6D28D9'],
  leaderboard: ['#EC4899', '#8B5CF6'],
  learn: ['#10B981', '#059669'],
  podcasts: ['#6366F1', '#4F46E5'],
};

const TreeTriangle = ({ w }: { w: number }) => {
  const h = Math.round(w * 1.35);
  return (
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: w / 2,
        borderRightWidth: w / 2,
        borderBottomWidth: h,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'rgba(76, 29, 149, 0.35)',
      }}
    />
  );
};

const TopFeatureIcon = ({ k }: { k: (typeof TOP_KEYS)[number] }) => {
  if (k === 'breathing') {
    return (
      <View style={styles.topIconInner}>
        <View style={styles.waveLine} />
        <View style={[styles.waveLine, styles.waveLineMid]} />
        <View style={styles.waveLine} />
      </View>
    );
  }
  if (k === 'melius') {
    return (
      <View style={styles.topIconInner}>
        <View style={styles.meliusBlob} />
        <View style={styles.meliusCup} />
      </View>
    );
  }
  if (k === 'meditate') {
    return (
      <View style={styles.topIconInner}>
        <View style={styles.meditHead} />
        <View style={styles.meditBody} />
        <View style={styles.meditLegL} />
        <View style={styles.meditLegR} />
      </View>
    );
  }
  return (
    <View style={styles.topIconInner}>
      <View style={styles.pillShape} />
    </View>
  );
};

const NoiseIconPlaceholder = ({ k }: { k: (typeof NOISE_KEYS)[number] }) => {
  if (k === 'rain') {
    return (
      <View style={styles.noiseIconWrap}>
        <View style={styles.rainCloud} />
        <View style={styles.rainBolt} />
        <View style={[styles.rainDrop, { left: 6, top: 22 }]} />
        <View style={[styles.rainDrop, { left: 14, top: 26 }]} />
        <View style={[styles.rainDrop, { left: 22, top: 24 }]} />
      </View>
    );
  }
  if (k === 'ocean') {
    return (
      <View style={styles.noiseIconWrap}>
        <View style={styles.oceanWave} />
        <View style={[styles.oceanFoam, { bottom: 4 }]} />
      </View>
    );
  }
  if (k === 'campfire') {
    return (
      <View style={styles.noiseIconWrap}>
        <View style={styles.campTreeL} />
        <View style={styles.campTreeR} />
        <View style={styles.campTent} />
        <View style={styles.campFire} />
      </View>
    );
  }
  return (
    <View style={styles.noiseIconWrap}>
      <View style={styles.whiteNoiseDisc} />
    </View>
  );
};

const GridTileDecoration = ({ k }: { k: (typeof GRID_KEYS)[number] }) => {
  if (k === 'leaderboard') {
    return (
      <Text style={styles.gridCrown} accessibilityElementsHidden>
        ♔
      </Text>
    );
  }
  if (k === 'learn') {
    return (
      <View style={styles.learnBars} pointerEvents="none">
        <View style={[styles.learnBar, { height: 10 }]} />
        <View style={[styles.learnBar, { height: 16 }]} />
        <View style={[styles.learnBar, { height: 8 }]} />
      </View>
    );
  }
  if (k === 'podcasts') {
    return (
      <View style={styles.podcastRipples} pointerEvents="none">
        <View style={[styles.podcastRing, { width: 72, height: 72, opacity: 0.2 }]} />
        <View style={[styles.podcastRing, { width: 48, height: 48, opacity: 0.35 }]} />
        <View style={[styles.podcastRing, { width: 24, height: 24, opacity: 0.5 }]} />
      </View>
    );
  }
  return null;
};

export const LibraryScreenBody = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const tabBarSpace = 72 + Math.max(insets.bottom, 10);

  return (
    <>
      <View style={styles.starfield} pointerEvents="none">
        {STARFIELD.map((p, i) => (
          <View
            key={`library-star-${String(i)}`}
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
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top, paddingBottom: tabBarSpace + 28 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroBlock}>
          <LinearGradient
            colors={['#EDE9FE', '#DDD6FE', '#C4B5FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            {STARFIELD.slice(0, 10).map((p, i) => (
              <View
                key={`hero-star-${String(i)}`}
                style={[
                  styles.heroStar,
                  {
                    top: `${p.t * 100}%`,
                    left: `${p.l * 100}%`,
                  },
                ]}
              />
            ))}
            <View style={styles.moonGlow} />
            <View style={styles.moonDisc} />
            <View style={styles.hill} />
            <View style={styles.treeRow}>
              <TreeTriangle w={28} />
              <TreeTriangle w={36} />
              <TreeTriangle w={44} />
              <TreeTriangle w={32} />
              <TreeTriangle w={38} />
            </View>
          </LinearGradient>
          <Text style={styles.heroTitle} accessibilityRole="header">
            {t('tabs.library')}
          </Text>
        </View>

        <View style={styles.topFeaturesRow}>
          {TOP_KEYS.map((key) => (
            <View key={key} style={styles.topFeatureItem}>
              <TouchableOpacity
                style={styles.topFeatureCircle}
                activeOpacity={0.88}
                accessibilityRole="button"
                accessibilityLabel={t('library.topFeatures.iconA11y', {
                  label: t(`library.topFeatures.${key}`),
                })}
              >
                <TopFeatureIcon k={key} />
              </TouchableOpacity>
              <Text style={styles.topFeatureLabel} numberOfLines={2}>
                {t(`library.topFeatures.${key}`)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.grid2x2}>
          {GRID_KEYS.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.gridTileOuter}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel={t(`library.grid.${key}`)}
            >
              <LinearGradient colors={GRID_GRADIENTS[key]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gridTile}>
                <GridTileDecoration k={key} />
                <Text style={styles.gridTileLabel}>{t(`library.grid.${key}`)}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('library.noises.title')}</Text>
        <Text style={styles.sectionSubtitle}>{t('library.noises.subtitle')}</Text>

        <View style={styles.noiseGrid}>
          {NOISE_KEYS.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.noiseRow}
              activeOpacity={0.88}
              accessibilityRole="button"
              accessibilityLabel={t('library.noises.iconA11y', {
                label: t(`library.noises.${key}`),
              })}
            >
              <View style={styles.noiseIconCircle}>
                <NoiseIconPlaceholder k={key} />
              </View>
              <Text style={styles.noiseLabel}>{t(`library.noises.${key}`)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.lbHeaderRow}
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel={t('library.leaderboardPreview.rowA11y')}
        >
          <Text style={styles.lbHeaderTitle}>
            {t('library.leaderboardPreview.title')}
            <Text style={styles.lbChevron}> ›</Text>
          </Text>
          <Text style={styles.lbLoading}>{t('library.leaderboardPreview.loading')}</Text>
        </TouchableOpacity>

        <View style={styles.lbCard}>
          <Text style={styles.lbEmpty}>{t('library.leaderboardPreview.empty')}</Text>
        </View>
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
    paddingHorizontal: 20,
  },
  heroBlock: {
    marginHorizontal: -20,
    marginBottom: 20,
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    ...shadow.card,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroStar: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  moonGlow: {
    position: 'absolute',
    top: 28,
    alignSelf: 'center',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 248, 220, 0.35)',
  },
  moonDisc: {
    position: 'absolute',
    top: 44,
    alignSelf: 'center',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FEF9C3',
    shadowColor: color.goldAccent,
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  hill: {
    position: 'absolute',
    bottom: 0,
    left: -40,
    right: -40,
    height: 36,
    backgroundColor: 'rgba(16, 185, 129, 0.22)',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
  },
  treeRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 2,
    gap: 2,
  },
  heroTitle: {
    position: 'absolute',
    top: 16,
    left: 24,
    fontSize: 28,
    fontFamily: font.headingBold,
    color: color.text,
    letterSpacing: 0.3,
  },
  topFeaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
    gap: 8,
  },
  topFeatureItem: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '25%',
  },
  topFeatureCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
    backgroundColor: color.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  topIconInner: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveLine: {
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: color.primary,
    marginVertical: 2,
  },
  waveLineMid: {
    width: 18,
  },
  meliusBlob: {
    width: 18,
    height: 20,
    borderRadius: 9,
    backgroundColor: '#f9a8d4',
    position: 'absolute',
    left: 7,
    top: 6,
  },
  meliusCup: {
    width: 10,
    height: 8,
    borderRadius: 2,
    backgroundColor: color.surface,
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  meditHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.primaryDark,
    position: 'absolute',
    top: 4,
  },
  meditBody: {
    width: 20,
    height: 10,
    borderRadius: 4,
    backgroundColor: color.primary,
    position: 'absolute',
    top: 14,
  },
  meditLegL: {
    position: 'absolute',
    bottom: 2,
    left: 6,
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: color.secondary,
    transform: [{ rotate: '-25deg' }],
  },
  meditLegR: {
    position: 'absolute',
    bottom: 2,
    right: 6,
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: color.secondary,
    transform: [{ rotate: '25deg' }],
  },
  pillShape: {
    width: 16,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: color.primary,
    backgroundColor: color.overlay,
  },
  topFeatureLabel: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 13,
    textAlign: 'center',
    color: color.text,
    fontFamily: font.bodyMedium,
  },
  grid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 26,
  },
  gridTileOuter: {
    width: '48%',
    minWidth: '48%',
  },
  gridTile: {
    minHeight: 96,
    borderRadius: radius.xl,
    paddingVertical: 16,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...shadow.soft,
  },
  gridTileLabel: {
    fontSize: 17,
    fontFamily: font.headingSemi,
    color: '#FFFFFF',
    textAlign: 'center',
    zIndex: 2,
    textShadowColor: 'rgba(76, 29, 149, 0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  gridCrown: {
    position: 'absolute',
    fontSize: 64,
    color: 'rgba(255,255,255,0.14)',
    top: 4,
    right: 8,
  },
  learnBars: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
  },
  learnBar: {
    width: 10,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  podcastRipples: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 8,
    right: 10,
  },
  podcastRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: font.headingBold,
    color: color.text,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: font.body,
    color: color.textSecondary,
    marginBottom: 16,
  },
  noiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 28,
  },
  noiseRow: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  noiseIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: color.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  noiseIconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rainCloud: {
    position: 'absolute',
    top: 4,
    width: 28,
    height: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(147,197,253,0.85)',
  },
  rainBolt: {
    position: 'absolute',
    top: 14,
    left: 16,
    width: 0,
    height: 0,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fbbf24',
  },
  rainDrop: {
    position: 'absolute',
    width: 2,
    height: 6,
    borderRadius: 1,
    backgroundColor: 'rgba(147,197,253,0.9)',
  },
  oceanWave: {
    width: 30,
    height: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    backgroundColor: 'rgba(59,130,246,0.85)',
  },
  oceanFoam: {
    position: 'absolute',
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  campTreeL: {
    position: 'absolute',
    left: 2,
    bottom: 8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(34,197,94,0.7)',
  },
  campTreeR: {
    position: 'absolute',
    right: 2,
    bottom: 8,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(34,197,94,0.65)',
  },
  campTent: {
    position: 'absolute',
    bottom: 6,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(248,113,113,0.85)',
  },
  campFire: {
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    width: 8,
    height: 10,
    borderRadius: 4,
    backgroundColor: 'rgba(251,146,60,0.95)',
  },
  whiteNoiseDisc: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  noiseLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.bodySemi,
    color: color.text,
  },
  lbHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  lbHeaderTitle: {
    fontSize: 17,
    fontFamily: font.headingSemi,
    color: color.text,
  },
  lbChevron: {
    color: color.text,
    fontFamily: font.headingSemi,
  },
  lbLoading: {
    fontSize: 14,
    fontFamily: font.bodySemi,
    color: color.primary,
  },
  lbCard: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.borderSubtle,
    backgroundColor: color.surface,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    ...shadow.card,
  },
  lbEmpty: {
    fontSize: 14,
    fontFamily: font.body,
    color: color.textMuted,
    textAlign: 'center',
  },
});
