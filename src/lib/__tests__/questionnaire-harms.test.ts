import { getDefaultHarmPages, harmPageIndexFromOffset } from '../questionnaire-harms';

describe('getDefaultHarmPages', () => {
  it('returns 5 pages with unique ids', () => {
    const pages = getDefaultHarmPages();
    expect(pages).toHaveLength(5);
    const ids = pages.map((p) => p.id);
    expect(new Set(ids).size).toBe(5);
  });
});

describe('harmPageIndexFromOffset', () => {
  it('returns 0 for invalid inputs', () => {
    expect(harmPageIndexFromOffset(Number.NaN, 390, 5)).toBe(0);
    expect(harmPageIndexFromOffset(0, 0, 5)).toBe(0);
    expect(harmPageIndexFromOffset(0, 390, 0)).toBe(0);
  });

  it('rounds to nearest page index', () => {
    expect(harmPageIndexFromOffset(0, 400, 5)).toBe(0);
    expect(harmPageIndexFromOffset(399, 400, 5)).toBe(1);
    expect(harmPageIndexFromOffset(800, 400, 5)).toBe(2);
  });

  it('clamps as a boundary case', () => {
    expect(harmPageIndexFromOffset(-200, 400, 5)).toBe(0);
    expect(harmPageIndexFromOffset(999999, 400, 5)).toBe(4);
  });
});

