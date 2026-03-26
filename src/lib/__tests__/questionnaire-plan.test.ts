import { getDefaultPlanSections } from '../questionnaire-plan';

describe('questionnaire-plan', () => {
  it('returns 3 deterministic sections', () => {
    const s1 = getDefaultPlanSections();
    const s2 = getDefaultPlanSections();
    expect(s1).toHaveLength(3);
    expect(s2).toHaveLength(3);
    expect(s1.map((s) => s.id)).toEqual(['conquer', 'restore', 'control']);
    expect(s1).toEqual(s2);
  });

  it('ensures each section has at least 3 bullets', () => {
    const sections = getDefaultPlanSections();
    for (const section of sections) {
      expect(section.bullets.length).toBeGreaterThanOrEqual(3);
    }
  });
});

