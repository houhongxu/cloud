import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import { getDefaultHarmPages, harmPageIndexFromOffset } from '../../../../lib/questionnaire-harms';
import { color, shadow } from '../../../../theme/design-tokens';
import { font } from '../../../../theme/typography';

type QuestionnaireStepHarmProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepHarm = ({ onContinue }: QuestionnaireStepHarmProps) => {
  const { t } = useTranslation();
  const pages = useMemo(() => getDefaultHarmPages(), []);
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const pageWidth = Math.max(1, width);

  const syncIndexFromEvent = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
      const next = harmPageIndexFromOffset(e.nativeEvent.contentOffset.x, pageWidth, pages.length);
      setActiveIndex(next);
    },
    [pageWidth, pages.length],
  );

  const isLast = activeIndex === pages.length - 1;

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      <ScrollView
        ref={(node) => {
          scrollRef.current = node;
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={syncIndexFromEvent}
        onScrollEndDrag={syncIndexFromEvent}
        onMomentumScrollEnd={syncIndexFromEvent}
        scrollEventThrottle={16}
      >
        {pages.map((page) => (
          <View key={page.id} style={[styles.page, { width: pageWidth, backgroundColor: page.backgroundColor }]}>
            <View style={styles.pageInner}>
              <Text style={styles.brand}>CLOUD</Text>

              <View style={styles.hero}>
                <View style={styles.heroShadow} />
                <View style={styles.heroPlaceholder}>
                  <Text style={styles.heroPlaceholderText}>{t('harms.imagePlaceholder')}</Text>
                </View>
              </View>

              <Text style={styles.title}>{t(page.titleKey)}</Text>
              <Text style={styles.body}>{t(page.bodyKey)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.overlay}>
        <View style={styles.dotsRow} accessibilityRole="tablist">
          {pages.map((p, idx) => {
            const isActive = idx === activeIndex;
            return (
              <View
                key={p.id}
                style={[styles.dot, isActive ? styles.dotActive : styles.dotInactive]}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              />
            );
          })}
        </View>

        {isLast ? (
          <TouchableOpacity style={styles.nextButton} onPress={onContinue} activeOpacity={0.92}>
            <Text style={styles.nextButtonText}>{t('harms.next')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextButtonGhost}
            onPress={() => {
              const nextIndex = Math.min(activeIndex + 1, pages.length - 1);
              setActiveIndex(nextIndex);
              scrollRef.current?.scrollTo({ x: nextIndex * pageWidth, animated: true });
            }}
            activeOpacity={0.92}
          >
            <Text style={styles.nextButtonGhostText}>{t('harms.swipeHint')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  pageInner: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 22,
    paddingBottom: 140,
    alignItems: 'center',
  },
  brand: {
    color: color.textMuted,
    fontFamily: font.bodyBold,
    letterSpacing: 3,
    fontSize: 16,
  },
  hero: {
    marginTop: 44,
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroShadow: {
    position: 'absolute',
    bottom: 18,
    width: 160,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(76, 29, 149, 0.12)',
  },
  heroPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  heroPlaceholderText: {
    color: color.textMuted,
    fontSize: 12,
    fontFamily: font.bodySemi,
  },
  title: {
    marginTop: 34,
    color: color.text,
    fontSize: 28,
    lineHeight: 34,
    fontFamily: font.headingBold,
    textAlign: 'center',
  },
  body: {
    marginTop: 14,
    color: color.textSecondary,
    fontSize: 15,
    fontFamily: font.body,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 310,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 26,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: color.primary,
  },
  dotInactive: {
    backgroundColor: color.border,
  },
  nextButton: {
    width: 240,
    height: 54,
    borderRadius: 27,
    backgroundColor: color.cta,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lifted,
  },
  nextButtonText: {
    color: color.ctaText,
    fontSize: 16,
    fontFamily: font.bodyBold,
  },
  nextButtonGhost: {
    width: 240,
    height: 54,
    borderRadius: 27,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.soft,
  },
  nextButtonGhostText: {
    color: color.text,
    fontSize: 14,
    fontFamily: font.bodySemi,
  },
});
