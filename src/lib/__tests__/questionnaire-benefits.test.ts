import { benefitScreenIndexFromOffset, getDefaultBenefitScreens } from '../questionnaire-benefits';

describe('getDefaultBenefitScreens', () => {
  it('returns 2 screens', () => {
    const screens = getDefaultBenefitScreens();
    expect(screens).toHaveLength(2);
    expect(screens[0]?.id).toBe('quotes');
    expect(screens[1]?.id).toBe('progress');
  });
});

describe('benefitScreenIndexFromOffset', () => {
  it('returns 0 for invalid inputs', () => {
    expect(benefitScreenIndexFromOffset(Number.NaN, 800, 2)).toBe(0);
    expect(benefitScreenIndexFromOffset(0, 0, 2)).toBe(0);
    expect(benefitScreenIndexFromOffset(0, 800, 0)).toBe(0);
  });

  it('rounds to nearest index', () => {
    expect(benefitScreenIndexFromOffset(0, 800, 2)).toBe(0);
    expect(benefitScreenIndexFromOffset(799, 800, 2)).toBe(1);
    expect(benefitScreenIndexFromOffset(801, 800, 2)).toBe(1);
  });

  it('clamps as a boundary case', () => {
    expect(benefitScreenIndexFromOffset(-120, 800, 2)).toBe(0);
    expect(benefitScreenIndexFromOffset(999999, 800, 2)).toBe(1);
  });
});

