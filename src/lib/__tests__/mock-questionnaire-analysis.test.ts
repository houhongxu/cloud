import {
  analysisDeltaPercent,
  generateMockQuestionnaireAnalysis,
} from '../mock-questionnaire-analysis';

describe('analysisDeltaPercent', () => {
  it('returns rounded non-negative difference', () => {
    expect(analysisDeltaPercent(52, 13)).toBe(39);
    expect(analysisDeltaPercent(10, 20)).toBe(0);
  });

  it('throws on non-finite inputs', () => {
    expect(() => analysisDeltaPercent(Number.NaN, 1)).toThrow('scores must be finite numbers');
    expect(() => analysisDeltaPercent(1, Number.POSITIVE_INFINITY)).toThrow('scores must be finite numbers');
  });
});

describe('generateMockQuestionnaireAnalysis', () => {
  it('returns scores in expected demo ranges', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const a = generateMockQuestionnaireAnalysis();
    expect(a.userScorePercent).toBe(35);
    expect(a.averagePercent).toBe(8);
    jest.restoreAllMocks();
  });

  it('hits upper range as a boundary case', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.999);
    const a = generateMockQuestionnaireAnalysis();
    expect(a.userScorePercent).toBeGreaterThanOrEqual(35);
    expect(a.userScorePercent).toBeLessThanOrEqual(74);
    expect(a.averagePercent).toBeGreaterThanOrEqual(8);
    expect(a.averagePercent).toBeLessThanOrEqual(22);
    jest.restoreAllMocks();
  });
});
