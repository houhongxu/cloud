import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

type WelcomeSequenceProps = {
  onComplete: () => void;
};

export const WelcomeSequence = ({ onComplete }: WelcomeSequenceProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<0 | 1>(0);
  const opacity = useRef(new Animated.Value(1)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (isMounted) {
        setReduceMotion(enabled);
      }
    });

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      setReduceMotion(enabled);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  const transitionDurationMs = useMemo(() => (reduceMotion ? 0 : 260), [reduceMotion]);

  const runFade = (next: () => void): void => {
    if (transitionDurationMs === 0) {
      next();
      return;
    }

    Animated.timing(opacity, {
      toValue: 0,
      duration: transitionDurationMs,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      next();
      opacity.setValue(0);
      Animated.timing(opacity, {
        toValue: 1,
        duration: transitionDurationMs,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  };

  const onContinueFromScreen1 = (): void => {
    runFade(() => setStep(1));
  };

  const onContinueFromScreen2 = (): void => {
    runFade(() => onComplete());
  };

  return (
    <LinearGradient colors={['#0f3f6b', '#07133f', '#050b2b']} style={styles.container}>
      <Animated.View style={[styles.screen, { opacity }]}>
        {step === 0 ? (
          <View style={styles.screen1}>
            <View style={styles.screen1Top}>
              <Text style={styles.brandText}>{t('welcome.brandName')}</Text>
              <Text style={styles.brandReflection} accessibilityElementsHidden>
                {t('welcome.brandName')}
              </Text>
            </View>

            <View style={styles.screen1Middle}>
              <Text style={styles.screen1Title}>{t('welcome.screen1Title')}</Text>
              <Text style={styles.screen1Subtitle}>{t('welcome.screen1Subtitle')}</Text>
            </View>

            <View style={styles.screen1Bottom}>
              <View style={styles.laurelRow} accessibilityRole="image">
                <Text style={styles.laurelGlyph}>{'‹'}</Text>
                <View style={styles.starsRow}>
                  <Text style={styles.starGlyph}>★</Text>
                  <Text style={styles.starGlyph}>★</Text>
                  <Text style={styles.starGlyph}>★</Text>
                  <Text style={styles.starGlyph}>★</Text>
                  <Text style={styles.starGlyph}>★</Text>
                </View>
                <Text style={styles.laurelGlyph}>{'›'}</Text>
              </View>

              <Text style={styles.publisherText}>{t('welcome.publisher')}</Text>

              <TouchableOpacity style={styles.primaryCta} onPress={onContinueFromScreen1} activeOpacity={0.9}>
                <Text style={styles.primaryCtaText}>{t('welcome.ctaContinue')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.screen2}>
            <Text style={styles.screen2Brand}>{t('welcome.brandName')}</Text>

            <View style={styles.illustrationOuter}>
              <LinearGradient
                colors={['#0b1f4d', '#050a2a', '#071a3a']}
                start={{ x: 0.15, y: 0.1 }}
                end={{ x: 0.9, y: 0.95 }}
                style={styles.illustrationInner}
              >
                <View style={styles.nebulaBlob1} />
                <View style={styles.nebulaBlob2} />
                <View style={styles.nebulaBlob3} />
                <View style={styles.webLine1} />
                <View style={styles.webLine2} />
                <View style={styles.webLine3} />
              </LinearGradient>
            </View>

            <View style={styles.screen2Text}>
              <Text style={styles.screen2Title}>{t('welcome.screen2Title')}</Text>
              <Text style={styles.screen2Subtitle}>{t('welcome.screen2Subtitle')}</Text>
            </View>

            <TouchableOpacity style={styles.ghostCta} onPress={onContinueFromScreen2} activeOpacity={0.9}>
              <Text style={styles.ghostCtaText}>{t('welcome.ctaContinue')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  screen1: {
    flex: 1,
    paddingTop: 70,
    paddingBottom: 44,
    paddingHorizontal: 26,
    justifyContent: 'space-between',
  },
  screen1Top: {
    alignItems: 'center',
  },
  brandText: {
    color: '#ffffff',
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: 4,
  },
  brandReflection: {
    marginTop: -10,
    color: '#ffffff',
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: 4,
    opacity: 0.18,
    transform: [{ scaleY: -0.72 }],
  },
  screen1Middle: {
    alignItems: 'center',
    gap: 12,
    marginTop: -40,
  },
  screen1Title: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '800',
    textAlign: 'center',
  },
  screen1Subtitle: {
    color: '#ffffff',
    opacity: 0.92,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '500',
    textAlign: 'center',
  },
  screen1Bottom: {
    alignItems: 'center',
    gap: 18,
  },
  laurelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    opacity: 0.55,
  },
  laurelGlyph: {
    color: '#cfe6ff',
    fontSize: 34,
    fontWeight: '300',
    marginTop: -2,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  starGlyph: {
    color: '#f6d37a',
    fontSize: 18,
    fontWeight: '800',
    opacity: 0.95,
  },
  publisherText: {
    color: '#ffffff',
    opacity: 0.78,
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '500',
  },
  primaryCta: {
    marginTop: 6,
    minWidth: 210,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 26,
    backgroundColor: '#ffffff',
  },
  primaryCtaText: {
    color: '#0a174f',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
  screen2: {
    flex: 1,
    paddingTop: 54,
    paddingBottom: 44,
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screen2Brand: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 3,
  },
  illustrationOuter: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  illustrationInner: {
    flex: 1,
  },
  nebulaBlob1: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(63, 215, 255, 0.22)',
    top: 40,
    left: 28,
  },
  nebulaBlob2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(120, 170, 255, 0.16)',
    bottom: 46,
    right: 34,
  },
  nebulaBlob3: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: 110,
    right: 70,
  },
  webLine1: {
    position: 'absolute',
    width: 220,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: 120,
    left: 40,
    transform: [{ rotate: '-18deg' }],
  },
  webLine2: {
    position: 'absolute',
    width: 240,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    bottom: 110,
    left: 30,
    transform: [{ rotate: '22deg' }],
  },
  webLine3: {
    position: 'absolute',
    width: 200,
    height: 2,
    backgroundColor: 'rgba(63, 215, 255, 0.18)',
    top: 170,
    left: 50,
    transform: [{ rotate: '8deg' }],
  },
  screen2Text: {
    alignItems: 'center',
    gap: 10,
    marginTop: -10,
  },
  screen2Title: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '800',
    textAlign: 'center',
  },
  screen2Subtitle: {
    color: '#ffffff',
    opacity: 0.9,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '500',
    textAlign: 'center',
  },
  ghostCta: {
    width: '100%',
    maxWidth: 420,
    height: 62,
    borderRadius: 31,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    backgroundColor: 'rgba(5, 10, 40, 0.15)',
  },
  ghostCtaText: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
  },
});
