import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  analysisDeltaPercent,
  generateMockQuestionnaireAnalysis,
} from '../../../../lib/mock-questionnaire-analysis';
import { color, gradient, shadow } from '../../../../theme/design-tokens';
import { font } from '../../../../theme/typography';
import { CalculatingProgressPanel } from '../calculating-progress-panel';

type QuestionnaireStepAnalysisProps = Readonly<{
  onCheckSymptoms?: () => void;
}>;

type Phase = 'calculating' | 'result';

export const QuestionnaireStepAnalysis = ({ onCheckSymptoms }: QuestionnaireStepAnalysisProps) => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<Phase>('calculating');
  const analysis = useMemo(() => generateMockQuestionnaireAnalysis(), []);
  const delta = analysisDeltaPercent(analysis.userScorePercent, analysis.averagePercent);
  const barMaxHeight = 168;
  const chartMax = Math.max(analysis.userScorePercent, analysis.averagePercent, 1);
  const userBarH = (analysis.userScorePercent / chartMax) * barMaxHeight;
  const avgBarH = (analysis.averagePercent / chartMax) * barMaxHeight;

  const onProgressComplete = useCallback(() => {
    setPhase('result');
  }, []);

  useEffect(() => {
    if (phase !== 'calculating') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, [phase]);

  return (
    <LinearGradient colors={[...gradient.screen]} style={styles.container}>
      <StatusBar style="dark" />
      {phase === 'calculating' ? (
        <CalculatingProgressPanel active onComplete={onProgressComplete} label={t('analysis.calculating')} />
      ) : (
        <View style={styles.resultScroll}>
          <View style={styles.resultInner}>
            <View style={styles.titleRow}>
              <Text style={styles.resultTitle}>{t('analysis.title')}</Text>
              <View style={styles.checkBubble}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
            </View>
            <Text style={styles.subtitle}>{t('analysis.subtitle')}</Text>

            <Text style={styles.headline}>{t('analysis.headline')}</Text>

            <View style={styles.chartRow}>
              <View style={styles.chartCol}>
                <View style={[styles.barTrack, { height: barMaxHeight }]}>
                  <View style={[styles.barUser, { height: userBarH }]}>
                    <Text style={styles.barPct}>{`${analysis.userScorePercent}%`}</Text>
                  </View>
                </View>
                <Text style={styles.barLabel}>{t('analysis.yourScore')}</Text>
              </View>
              <View style={styles.chartCol}>
                <View style={[styles.barTrack, { height: barMaxHeight }]}>
                  <View style={[styles.barAvg, { height: avgBarH }]}>
                    <Text style={styles.barPct}>{`${analysis.averagePercent}%`}</Text>
                  </View>
                </View>
                <Text style={styles.barLabel}>{t('analysis.average')}</Text>
              </View>
            </View>

            <Text style={styles.summaryLine}>
              <Text style={styles.summaryHighlight}>{t('analysis.summaryDelta', { delta })}</Text>
              <Text style={styles.summaryRest}>{t('analysis.summaryRest')}</Text>
            </Text>
            <Text style={styles.disclaimer}>{t('analysis.disclaimer')}</Text>

            <TouchableOpacity style={styles.cta} onPress={onCheckSymptoms} activeOpacity={0.92}>
              <Text style={styles.ctaText}>{t('analysis.cta')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultScroll: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 28,
    justifyContent: 'center',
  },
  resultInner: {
    alignItems: 'center',
    gap: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  resultTitle: {
    color: color.text,
    fontSize: 26,
    lineHeight: 32,
    fontFamily: font.headingBold,
    textAlign: 'center',
  },
  checkBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: color.cta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: color.ctaText,
    fontSize: 20,
    fontFamily: font.bodyBold,
    marginTop: -1,
  },
  subtitle: {
    color: color.textSecondary,
    fontSize: 16,
    lineHeight: 22,
    fontFamily: font.body,
    textAlign: 'center',
    marginBottom: 6,
  },
  headline: {
    color: color.text,
    fontSize: 20,
    lineHeight: 28,
    fontFamily: font.headingSemi,
    textAlign: 'center',
    paddingHorizontal: 8,
    marginTop: 4,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 48,
    marginTop: 28,
    marginBottom: 8,
  },
  chartCol: {
    alignItems: 'center',
    gap: 12,
  },
  barTrack: {
    width: 88,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barUser: {
    width: '100%',
    minHeight: 44,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: color.analysisNo,
    alignItems: 'center',
    paddingTop: 10,
  },
  barAvg: {
    width: '100%',
    minHeight: 44,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: color.analysisYes,
    alignItems: 'center',
    paddingTop: 10,
  },
  barPct: {
    color: color.ctaText,
    fontSize: 17,
    fontFamily: font.bodyBold,
  },
  barLabel: {
    color: color.text,
    fontSize: 15,
    fontFamily: font.bodySemi,
  },
  summaryLine: {
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 12,
  },
  summaryHighlight: {
    color: color.analysisNo,
    fontSize: 17,
    fontFamily: font.bodyBold,
  },
  summaryRest: {
    color: color.text,
    fontSize: 17,
    fontFamily: font.bodySemi,
  },
  disclaimer: {
    color: color.textMuted,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: font.body,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  cta: {
    marginTop: 28,
    width: '100%',
    maxWidth: 420,
    height: 58,
    borderRadius: 29,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.lifted,
  },
  ctaText: {
    color: color.textOnPrimary,
    fontSize: 18,
    fontFamily: font.bodyBold,
  },
});
