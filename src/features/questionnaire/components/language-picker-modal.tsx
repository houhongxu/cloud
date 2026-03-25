import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { SupportedLanguage } from '../../../lib/i18n-language';

type LanguagePickerModalProps = Readonly<{
  visible: boolean;
  selected: SupportedLanguage;
  onClose: () => void;
  onSelect: (language: SupportedLanguage) => void;
}>;

type LanguageOption = Readonly<{
  id: SupportedLanguage;
  label: string;
  flag: string;
}>;

export const LanguagePickerModal = ({ visible, selected, onClose, onSelect }: LanguagePickerModalProps) => {
  const options = useMemo<readonly LanguageOption[]>(
    () => [
      { id: 'en', label: 'English', flag: '🇺🇸' },
      { id: 'zh', label: '中文', flag: '🇨🇳' },
    ],
    [],
  );

  const stars = useMemo(() => {
    const count = 22;
    return Array.from({ length: count }, (_, i) => ({
      key: `star-${i}`,
      leftPct: ((i * 37) % 100) / 100,
      topPct: ((i * 61) % 100) / 100,
      size: 2 + (i % 3),
      opacity: 0.15 + ((i % 5) * 0.08),
    }));
  }, []);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />
        <LinearGradient colors={['rgba(7, 10, 45, 0.92)', 'rgba(5, 8, 30, 0.94)']} style={styles.backdrop}>
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

          <View style={styles.card}>
            <Text style={styles.title}>Select Language</Text>

            <View style={styles.options}>
              {options.map((opt) => {
                const isSelected = opt.id === selected;
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[styles.optionRow, isSelected ? styles.optionRowSelected : styles.optionRowDefault]}
                    activeOpacity={0.9}
                    onPress={() => onSelect(opt.id)}
                  >
                    <View style={styles.optionLeft}>
                      <Text style={styles.flag}>{opt.flag}</Text>
                      <Text style={styles.optionLabel}>{opt.label}</Text>
                    </View>

                    <View style={styles.optionRight}>
                      {isSelected ? <Text style={styles.check}>✓</Text> : <Text style={styles.chevron}>⌄</Text>}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  starsLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 18 },
    elevation: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 14,
  },
  options: {
    gap: 12,
    paddingTop: 4,
    paddingBottom: 4,
  },
  optionRow: {
    height: 62,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionRowDefault: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.10)',
    backgroundColor: 'rgba(10, 12, 40, 0.55)',
  },
  optionRowSelected: {
    borderWidth: 2,
    borderColor: 'rgba(62, 150, 255, 0.85)',
    backgroundColor: 'rgba(14, 22, 60, 0.78)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flag: {
    fontSize: 22,
  },
  optionLabel: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
  },
  optionRight: {
    minWidth: 22,
    alignItems: 'flex-end',
  },
  check: {
    color: '#8cc8ff',
    fontSize: 18,
    fontWeight: '900',
  },
  chevron: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 18,
    fontWeight: '800',
    marginTop: -6,
  },
});

