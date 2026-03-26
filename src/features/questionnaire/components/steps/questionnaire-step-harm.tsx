import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
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

type QuestionnaireStepHarmProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepHarm = ({ onContinue }: QuestionnaireStepHarmProps) => {
  const { t } = useTranslation();
  const pages = useMemo(() => getDefaultHarmPages(), []);
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const next = harmPageIndexFromOffset(e.nativeEvent.contentOffset.x, width, pages.length);
    setActiveIndex(next);
  };

  const isLast = activeIndex === pages.length - 1;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <ScrollView
        ref={(node) => {
          scrollRef.current = node;
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {pages.map((page) => (
          <View key={page.id} style={[styles.page, { width, backgroundColor: page.backgroundColor }]}>
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
              scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
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
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '900',
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
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  heroPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPlaceholderText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    marginTop: 34,
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    textAlign: 'center',
  },
  body: {
    marginTop: 14,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
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
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  nextButton: {
    width: 240,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '900',
  },
  nextButtonGhost: {
    width: 240,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonGhostText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 14,
    fontWeight: '800',
  },
});
