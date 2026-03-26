export type MockQuestionnaireAnalysis = Readonly<{
  userScorePercent: number;
  averagePercent: number;
}>;

export const analysisDeltaPercent = (user: number, average: number): number => {
  if (!Number.isFinite(user) || !Number.isFinite(average)) {
    throw new Error('scores must be finite numbers');
  }
  return Math.max(0, Math.round(user - average));
};

/** Deterministic ranges for UI demo; not clinical data. */
export const generateMockQuestionnaireAnalysis = (): MockQuestionnaireAnalysis => {
  const userScorePercent = Math.round(35 + Math.random() * 39);
  const averagePercent = Math.round(8 + Math.random() * 14);
  return { userScorePercent, averagePercent };
};
