import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createUserTimelinePositions } from '../../../lib/user-timeline';

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

const RANGE_KEYS = ['today', 'thisWeek', 'thisMonth'] as const;
const TIME_KEYS = ['midnight', 'six', 'noon', 'eighteen', 'endOfDay'] as const;

type RangeKey = (typeof RANGE_KEYS)[number];

export const UserScreenBody = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [range, setRange] = useState<RangeKey>('today');
  const tabBarSpace = 72 + Math.max(insets.bottom, 10);

  const labels = TIME_KEYS.map((key) => t(`user.timeline.${key}`));
  const positions = useMemo(() => createUserTimelinePositions(labels.length), [labels.length]);

  return (
    <>
      <View style={styles.starfield} pointerEvents="none">
        {STARFIELD.map((p, i) => (
          <View
            key={`user-star-${String(i)}`}
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
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 8, paddingBottom: tabBarSpace + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t('user.title')}</Text>

        <View style={styles.avatarWrap}>
          <View style={styles.avatarDisc}>
            <View style={styles.avatarHead} />
            <View style={styles.avatarSwirl} />
          </View>
        </View>

        <Text style={styles.displayName}>{t('user.displayName')}</Text>

        <TouchableOpacity style={styles.progressBtn} activeOpacity={0.9} accessibilityRole="button" accessibilityLabel={t('user.progressCard')}>
          <LinearGradient colors={['#05050d', '#05050d', '#bb0a91']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.progressBtnBg}>
            <View style={styles.progressIcon} />
            <Text style={styles.progressText}>{t('user.progressCard')}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.rangePill}>
          {RANGE_KEYS.map((key) => {
            const active = key === range;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.rangeItem, active && styles.rangeItemActive]}
                activeOpacity={0.88}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                accessibilityLabel={t(`user.range.${key}`)}
                onPress={() => setRange(key)}
              >
                <Text style={[styles.rangeText, active && styles.rangeTextActive]}>{t(`user.range.${key}`)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.timelineWrap}>
          <View style={styles.timelineTrack} />
          {positions.map((x, idx) => (
            <View key={`point-${String(idx)}`} style={[styles.timelinePoint, { left: `${x * 100}%` }]} />
          ))}
          <View style={styles.timelineLabels}>
            {labels.map((label, idx) => {
              const x = positions[idx] ?? 0;
              return (
                <View key={label} style={[styles.timelineLabelWrap, { left: `${x * 100}%` }]}>
                  <Text style={styles.timelineLabel}>{label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <TouchableOpacity style={styles.logBtn} activeOpacity={0.88} accessibilityRole="button" accessibilityLabel={t('user.logRelapse')}>
          <Text style={styles.logBtnText}>{t('user.logRelapse')}</Text>
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
    backgroundColor: '#ffffff',
  },
  scroll: {
    minHeight: '100%',
    paddingHorizontal: 22,
  },
  title: {
    fontSize: 44,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 18,
  },
  avatarWrap: {
    alignItems: 'center',
    marginTop: 8,
  },
  avatarDisc: {
    width: 136,
    height: 136,
    borderRadius: 68,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarHead: {
    width: 40,
    height: 50,
    borderWidth: 3,
    borderColor: '#f3f4f6',
    borderRadius: 20,
  },
  avatarSwirl: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#f3f4f6',
    transform: [{ translateX: 2 }, { translateY: -6 }],
  },
  displayName: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
  },
  progressBtn: {
    alignSelf: 'center',
    width: 260,
    marginBottom: 28,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBtnBg: {
    height: 54,
    borderRadius: 999,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#d1d5db',
  },
  progressText: {
    color: '#e5e7eb',
    fontSize: 16,
    fontWeight: '600',
  },
  rangePill: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'rgba(32, 30, 56, 0.85)',
    padding: 4,
    marginBottom: 220,
  },
  rangeItem: {
    paddingHorizontal: 20,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rangeItemActive: {
    backgroundColor: '#3b3b3b',
  },
  rangeText: {
    color: '#8e8ea0',
    fontSize: 16,
    fontWeight: '600',
  },
  rangeTextActive: {
    color: '#ffffff',
  },
  timelineWrap: {
    position: 'relative',
    height: 76,
    marginBottom: 28,
    paddingHorizontal: 12,
  },
  timelineTrack: {
    position: 'absolute',
    top: 18,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: 'rgba(41, 173, 255, 0.35)',
  },
  timelinePoint: {
    position: 'absolute',
    top: 10,
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: -8,
    backgroundColor: '#22d3ee',
    shadowColor: '#22d3ee',
    shadowOpacity: 0.45,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
  },
  timelineLabels: {
    position: 'absolute',
    top: 30,
    left: 12,
    right: 12,
    bottom: 0,
  },
  timelineLabelWrap: {
    position: 'absolute',
    marginLeft: -22,
    width: 44,
    alignItems: 'center',
  },
  timelineLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#d1d5db',
  },
  logBtn: {
    alignSelf: 'center',
    marginTop: 8,
    backgroundColor: '#7f1d1d',
    borderRadius: 999,
    paddingHorizontal: 30,
    height: 56,
    justifyContent: 'center',
  },
  logBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ef4444',
  },
});
