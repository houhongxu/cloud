import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { CalculatingProgressPanel } from '../calculating-progress-panel';
import {
  analysisDeltaPercent,
  generateMockQuestionnaireAnalysis,
} from '../../../../lib/mock-questionnaire-analysis';

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
    <LinearGradient colors={['#06123a', '#07113f', '#050b2b']} style={styles.container}>
      <StatusBar style="light" />
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
    color: '#ffffff',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  checkBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2bcf8f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    marginTop: -1,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.88)',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 6,
  },
  headline: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '800',
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
    backgroundColor: '#ff3b4d',
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
    backgroundColor: '#2bcf8f',
    alignItems: 'center',
    paddingTop: 10,
  },
  barPct: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  barLabel: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  summaryLine: {
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 12,
  },
  summaryHighlight: {
    color: '#ff4d5e',
    fontSize: 17,
    fontWeight: '800',
  },
  summaryRest: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  disclaimer: {
    color: 'rgba(255, 255, 255, 0.55)',
    fontSize: 12,
    lineHeight: 17,
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
    backgroundColor: '#1f8fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
});
