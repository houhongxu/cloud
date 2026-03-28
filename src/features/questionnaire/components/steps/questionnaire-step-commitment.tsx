import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useQuestionnaireEntryStore } from '../../../../lib/questionnaire-entry';
import { isValidSignaturePath, pointsToSvgPath, type SignaturePoint } from '../../../../lib/questionnaire-signature';
import { color, gradient, radius, shadow } from '../../../../theme/design-tokens';
import { font } from '../../../../theme/typography';

type QuestionnaireStepCommitmentProps = Readonly<{
  onContinue?: () => void;
}>;

export const QuestionnaireStepCommitment = ({ onContinue }: QuestionnaireStepCommitmentProps) => {
  const { t } = useTranslation();
  const setField = useQuestionnaireEntryStore((s) => s.setField);
  const storedSignature = useQuestionnaireEntryStore((s) => s.fields.commitmentSignatureSvg);

  const [points, setPoints] = useState<SignaturePoint[]>([]);
  const hasInitialized = useRef(false);
  const pointsRef = useRef<SignaturePoint[]>([]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    if (isValidSignaturePath(storedSignature)) {
      // restore only as path string; points are not recoverable, but we can render path directly
    }
  }, [storedSignature]);

  const pathD = useMemo(() => {
    const d = pointsToSvgPath(points);
    return d;
  }, [points]);

  const renderedD = isValidSignaturePath(pathD) ? pathD : isValidSignaturePath(storedSignature) ? storedSignature : '';
  const canFinish = isValidSignaturePath(renderedD);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const next = [{ x: locationX, y: locationY }];
        pointsRef.current = next;
        setPoints(next);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        pointsRef.current = [...pointsRef.current, { x: locationX, y: locationY }];
        setPoints(pointsRef.current);
      },
      onPanResponderRelease: () => {
        const d = pointsToSvgPath(pointsRef.current);
        if (isValidSignaturePath(d)) {
          setField('commitmentSignatureSvg', d);
        }
      },
    });
  }, [setField]);

  const onClear = (): void => {
    setPoints([]);
    pointsRef.current = [];
    setField('commitmentSignatureSvg', '');
  };

  const onFinish = (): void => {
    if (!canFinish) return;
    if (isValidSignaturePath(pathD)) {
      setField('commitmentSignatureSvg', pathD);
    }
    onContinue?.();
  };

  return (
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeftSpacer} />
          <View style={styles.headerRightSpacer} />
        </View>

        <Text style={styles.title}>{t('commitment.title')}</Text>
        <Text style={styles.subtitle}>{t('commitment.subtitle')}</Text>

        <View style={styles.signatureCard} {...panResponder.panHandlers}>
          <Svg width="100%" height="100%">
            {renderedD ? (
              <Path
                d={renderedD}
                stroke={color.text}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ) : null}
          </Svg>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={onClear} activeOpacity={0.92}>
          <Text style={styles.clearText}>{t('commitment.clear')}</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>{t('commitment.hint')}</Text>

        <TouchableOpacity
          style={[styles.finishButton, !canFinish && styles.finishButtonDisabled]}
          onPress={onFinish}
          activeOpacity={0.92}
          disabled={!canFinish}
        >
          <Text style={[styles.finishText, !canFinish && styles.finishTextDisabled]}>{t('commitment.finish')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerLeftSpacer: {
    width: 44,
    height: 44,
  },
  headerRightSpacer: {
    width: 44,
    height: 44,
  },
  title: {
    color: color.text,
    fontSize: 40,
    lineHeight: 46,
    fontFamily: font.headingBold,
    marginTop: 10,
  },
  subtitle: {
    color: color.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: font.body,
    marginTop: 14,
    maxWidth: 320,
  },
  signatureCard: {
    marginTop: 26,
    height: 250,
    borderRadius: radius.lg,
    backgroundColor: color.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color.borderSubtle,
    ...shadow.card,
  },
  clearButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  clearText: {
    color: color.primary,
    fontSize: 14,
    fontFamily: font.bodySemi,
  },
  hint: {
    marginTop: 18,
    color: color.text,
    fontSize: 16,
    fontFamily: font.bodyBold,
    textAlign: 'center',
  },
  finishButton: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 22,
    height: 56,
    borderRadius: 28,
    backgroundColor: color.cta,
    borderWidth: 1,
    borderColor: color.ctaDark,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lifted,
  },
  finishButtonDisabled: {
    backgroundColor: color.overlay,
    borderColor: color.borderSubtle,
  },
  finishText: {
    color: color.ctaText,
    fontSize: 16,
    fontFamily: font.bodyBold,
  },
  finishTextDisabled: {
    color: color.textMuted,
  },
});
