import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COMMUNITY_COUNTER_DEMO = 13_933;

const STAR_LAYOUT = [
  { t: 0.05, l: 0.1 },
  { t: 0.1, l: 0.35 },
  { t: 0.08, l: 0.72 },
  { t: 0.16, l: 0.55 },
  { t: 0.22, l: 0.18 },
  { t: 0.28, l: 0.88 },
  { t: 0.34, l: 0.42 },
  { t: 0.4, l: 0.68 },
  { t: 0.48, l: 0.12 },
  { t: 0.52, l: 0.5 },
  { t: 0.58, l: 0.82 },
  { t: 0.64, l: 0.28 },
  { t: 0.72, l: 0.62 },
  { t: 0.78, l: 0.38 },
  { t: 0.86, l: 0.75 },
  { t: 0.92, l: 0.22 },
];

type HomeDailyCheckinModalProps = Readonly<{
  visible: boolean;
  onDismissForToday: () => void;
}>;

export const HomeDailyCheckinModal = ({ visible, onDismissForToday }: HomeDailyCheckinModalProps) => {
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();

  const formattedCount = useMemo(() => {
    try {
      return new Intl.NumberFormat(i18n.language === 'zh' ? 'zh-CN' : 'en-US').format(COMMUNITY_COUNTER_DEMO);
    } catch {
      return String(COMMUNITY_COUNTER_DEMO);
    }
  }, [i18n.language]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onDismissForToday}
      statusBarTranslucent
    >
      <Pressable style={styles.modalRoot} onPress={onDismissForToday}>
        <LinearGradient colors={['#000b2b', '#020617', '#000b2b']} style={styles.gradient}>
          <View style={styles.stars} pointerEvents="none">
            {STAR_LAYOUT.map((p, i) => (
              <View
                key={`checkin-star-${String(i)}`}
                style={[
                  styles.star,
                  {
                    top: `${p.t * 100}%`,
                    left: `${p.l * 100}%`,
                    opacity: 0.25 + (i % 6) * 0.1,
                  },
                ]}
              />
            ))}
          </View>

          <Pressable style={[styles.sheet, { paddingTop: Math.max(insets.top, 14) + 8 }]} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} accessibilityLabel={t('home.dailyCheckinModal.handleA11y')} />

            <Text style={styles.eyesGlyph} accessibilityLabel={t('home.dailyCheckinModal.iconA11y')}>
              {'👀'}
            </Text>

            <Text style={styles.title}>{t('home.dailyCheckinModal.title')}</Text>

            <Text style={styles.counter}>{formattedCount}</Text>
            <Text style={styles.counterSuffix}>{t('home.dailyCheckinModal.counterSuffix')}</Text>

            <View style={styles.flexSpacer} />
            <View style={[styles.buttons, { paddingBottom: Math.max(insets.bottom, 16) + 12 }]}>
              <TouchableOpacity
                style={styles.buttonNo}
                activeOpacity={0.9}
                accessibilityRole="button"
                accessibilityLabel={t('home.dailyCheckinModal.buttonNo')}
                onPress={onDismissForToday}
              >
                <Text style={styles.buttonNoText}>{t('home.dailyCheckinModal.buttonNo')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonYes}
                activeOpacity={0.9}
                accessibilityRole="button"
                accessibilityLabel={t('home.dailyCheckinModal.buttonYes')}
                onPress={onDismissForToday}
              >
                <Text style={styles.buttonYesText}>{t('home.dailyCheckinModal.buttonYes')}</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </LinearGradient>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  stars: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#e2e8f0',
  },
  sheet: {
    flex: 1,
    paddingHorizontal: 22,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.35)',
    marginBottom: 18,
  },
  eyesGlyph: {
    fontSize: 32,
    marginBottom: 14,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '800',
    marginBottom: 28,
    maxWidth: 340,
  },
  counter: {
    color: '#ffffff',
    fontSize: 48,
    lineHeight: 54,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  counterSuffix: {
    marginTop: 10,
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  flexSpacer: {
    flex: 1,
    minHeight: 20,
  },
  buttons: {
    gap: 14,
    paddingTop: 8,
  },
  buttonNo: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#002855',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonNoText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  buttonYes: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#2a1212',
    borderWidth: 2,
    borderColor: '#b91c1c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonYesText: {
    color: '#991b1b',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
});
