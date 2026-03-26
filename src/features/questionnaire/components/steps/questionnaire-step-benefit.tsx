import { LinearGradient } from 'expo-linear-gradient';
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

import { benefitScreenIndexFromOffset, getDefaultBenefitScreens } from '../../../../lib/questionnaire-benefits';

type QuestionnaireStepBenefitProps = Readonly<{
  onBack?: () => void;
  onContinue?: () => void;
}>;

export const QuestionnaireStepBenefit = ({ onBack, onContinue }: QuestionnaireStepBenefitProps) => {
  const { t } = useTranslation();
  const screens = useMemo(() => getDefaultBenefitScreens(), []);
  const scrollRef = useRef<ScrollView | null>(null);
  const { height, width } = useWindowDimensions();
  const pageHeight = Math.max(1, height);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncIndexFromEvent = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
      const next = benefitScreenIndexFromOffset(e.nativeEvent.contentOffset.y, pageHeight, screens.length);
      setActiveIndex(next);
    },
    [pageHeight, screens.length],
  );

  const onPressSeeProgress = (): void => {
    setActiveIndex(1);
    scrollRef.current?.scrollTo({ y: pageHeight, animated: true });
  };

  return (
    <LinearGradient colors={['#020617', '#07112a', '#020617']} style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        ref={(node) => {
          scrollRef.current = node;
        }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={syncIndexFromEvent}
        onScrollEndDrag={syncIndexFromEvent}
        onMomentumScrollEnd={syncIndexFromEvent}
        scrollEventThrottle={16}
      >
        <View style={[styles.screen, { height: pageHeight, width }]}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerBack}
              onPress={onBack}
              disabled={!onBack}
              activeOpacity={0.92}
              accessibilityRole="button"
            >
              <Text style={[styles.headerBackText, !onBack && { opacity: 0.35 }]}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('benefits.title')}</Text>
            <View style={styles.headerRightSpacer} />
          </View>

          <View style={styles.list}>
            {screens[0].id === 'quotes'
              ? screens[0].items.map((item) => (
                  <View key={item.id} style={styles.quoteRow}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{t(`benefits.avatars.${item.id}`)}</Text>
                    </View>

                    <View style={styles.quoteCard}>
                      <View style={styles.quoteHeader}>
                        <Text style={styles.quoteName}>{t(item.nameKey)}</Text>
                        <View style={styles.verifiedBadge}>
                          <Text style={styles.verifiedText}>{t('benefits.verified')}</Text>
                        </View>
                      </View>
                      <Text style={styles.quoteHeadline}>{t(item.headlineKey)}</Text>
                      <Text style={styles.quoteBody}>{t(item.bodyKey)}</Text>
                    </View>
                  </View>
                ))
              : null}
          </View>

          <View style={styles.bottomCta}>
            <TouchableOpacity style={styles.primaryButton} onPress={onPressSeeProgress} activeOpacity={0.92}>
              <Text style={styles.primaryButtonText}>{t('benefits.ctaSeeProgress')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.screen, { height: pageHeight, width }]}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerBack}
              onPress={() => {
                setActiveIndex(0);
                scrollRef.current?.scrollTo({ y: 0, animated: true });
              }}
              activeOpacity={0.92}
              accessibilityRole="button"
            >
              <Text style={styles.headerBackText}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('benefits.title')}</Text>
            <View style={styles.headerRightSpacer} />
          </View>

          <Text style={styles.bigTitle}>{t('benefits.title')}</Text>

          <View style={styles.chartFrame}>
            <View style={styles.chartInner}>
              <Text style={styles.chartTitle}>{t('benefits.progress.kicker')}</Text>
              <Text style={styles.chartPlaceholder}>{t('benefits.progress.imagePlaceholder')}</Text>
            </View>
          </View>

          <Text style={styles.caption}>{t('benefits.progress.caption')}</Text>

          <View style={styles.bottomCta}>
            <TouchableOpacity style={styles.primaryButton} onPress={onContinue} activeOpacity={0.92}>
              <Text style={styles.primaryButtonText}>{t('benefits.ctaContinue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.pageDots} pointerEvents="none">
        <View style={[styles.pageDot, activeIndex === 0 ? styles.pageDotActive : styles.pageDotInactive]} />
        <View style={[styles.pageDot, activeIndex === 1 ? styles.pageDotActive : styles.pageDotInactive]} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  headerBack: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    marginTop: -2,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  headerRightSpacer: {
    width: 44,
    height: 44,
  },
  list: {
    flex: 1,
    gap: 14,
    paddingTop: 6,
  },
  quoteRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  avatarText: {
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '900',
    fontSize: 12,
  },
  quoteCard: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(14, 38, 94, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  quoteName: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 14,
    fontWeight: '800',
  },
  verifiedBadge: {
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: 'rgba(175, 255, 210, 0.92)',
    fontSize: 12,
    fontWeight: '800',
  },
  quoteHeadline: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
  },
  quoteBody: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 13,
    lineHeight: 19,
  },
  bottomCta: {
    paddingTop: 14,
    paddingBottom: 6,
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    maxWidth: 380,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.2,
  },
  pageDots: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  pageDotActive: {
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  pageDotInactive: {
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  bigTitle: {
    marginTop: 6,
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 0.2,
    marginBottom: 18,
  },
  chartFrame: {
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: 14,
    marginBottom: 18,
  },
  chartInner: {
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    height: 240,
    padding: 14,
    justifyContent: 'space-between',
  },
  chartTitle: {
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '900',
    fontSize: 14,
  },
  chartPlaceholder: {
    color: 'rgba(255,255,255,0.78)',
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },
  caption: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 14,
  },
});
