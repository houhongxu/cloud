import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Modal, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

type CalculatingScreenProps = Readonly<{
  visible: boolean;
  onDone?: () => void;
}>;

const clampPercent = (value: number): number => {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
};

export const CalculatingScreen = ({ visible, onDone }: CalculatingScreenProps) => {
  const [percent, setPercent] = useState(0);
  const didFinish = useRef(false);

  useEffect(() => {
    if (!visible) {
      setPercent(0);
      didFinish.current = false;
      return;
    }

    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    let raf = 0;
    const start = Date.now();
    const d1 = 1200;
    const d2 = 1000;
    const d3 = 1300;
    const total = d1 + d2 + d3;

    const tick = (): void => {
      const elapsed = Date.now() - start;
      let next = 0;

      if (elapsed <= d1) {
        const t = elapsed / d1;
        next = 65 * (1 - Math.pow(1 - t, 2));
      } else if (elapsed <= d1 + d2) {
        const t = (elapsed - d1) / d2;
        next = 65 + 25 * (1 - Math.pow(1 - t, 2));
      } else {
        const t = Math.min(1, (elapsed - d1 - d2) / d3);
        next = 90 + 10 * (1 - Math.pow(1 - t, 3));
      }

      const clamped = clampPercent(next);
      setPercent(clamped);

      if (elapsed >= total) {
        if (!didFinish.current) {
          didFinish.current = true;
          onDone?.();
        }
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone, visible]);

  const stars = useMemo(() => {
    const count = 36;
    return Array.from({ length: count }, (_, i) => ({
      key: `star-${i}`,
      leftPct: ((i * 29) % 100) / 100,
      topPct: ((i * 47) % 100) / 100,
      size: 1 + (i % 3),
      opacity: 0.12 + ((i % 6) * 0.06),
    }));
  }, []);

  const size = 240;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - percent / 100);

  return (
    <Modal visible={visible} animationType="fade" presentationStyle="fullScreen">
      <LinearGradient colors={['#06123a', '#07113f', '#050b2b']} style={styles.container}>
        <View style={styles.starsLayer} pointerEvents="none">
          {stars.map((s) => (
            <View
              key={s.key}
              style={[
                styles.star,
                {
                  left: `${s.leftPct * 100}%`,
                  top: `${s.topPct * 100}%`,
                  width: s.size,
                  height: s.size,
                  borderRadius: s.size / 2,
                  opacity: s.opacity,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.center}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <Defs>
              <SvgLinearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#2af0c3" stopOpacity="1" />
                <Stop offset="1" stopColor="#2dc8ff" stopOpacity="1" />
              </SvgLinearGradient>
            </Defs>

            <Circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth={stroke}
              fill="transparent"
              strokeLinecap="round"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="url(#ringGradient)"
              strokeWidth={stroke}
              fill="transparent"
              strokeDasharray={`${c} ${c}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              rotation={-90}
              originX={size / 2}
              originY={size / 2}
            />
          </Svg>

          <View style={styles.percentOverlay} pointerEvents="none">
            <Text style={styles.percentText}>{`${percent}%`}</Text>
          </View>
        </View>

        <Text style={styles.label}>Calculating</Text>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  center: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentText: {
    color: '#ffffff',
    fontSize: 56,
    lineHeight: 64,
    fontWeight: '900',
  },
  label: {
    marginTop: 26,
    color: '#ffffff',
    fontSize: 38,
    lineHeight: 46,
    fontWeight: '700',
    opacity: 0.92,
  },
});

