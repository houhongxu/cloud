import { recoveryRingStrokeDashoffset } from '../recovery-ring';

describe('recoveryRingStrokeDashoffset', () => {
  it('returns full circumference when percent is 0', () => {
    const c = 100 * Math.PI;
    expect(recoveryRingStrokeDashoffset(0, c)).toBeCloseTo(c);
  });

  it('returns 0 offset when percent is 100', () => {
    const c = 50;
    expect(recoveryRingStrokeDashoffset(100, c)).toBe(0);
  });

  it('clamps percent above 100', () => {
    const c = 200;
    expect(recoveryRingStrokeDashoffset(150, c)).toBe(recoveryRingStrokeDashoffset(100, c));
  });

  it('clamps percent below 0', () => {
    const c = 80;
    expect(recoveryRingStrokeDashoffset(-10, c)).toBe(recoveryRingStrokeDashoffset(0, c));
  });

  it('returns circumference when inputs are not finite', () => {
    expect(recoveryRingStrokeDashoffset(NaN, 100)).toBe(100);
    expect(recoveryRingStrokeDashoffset(50, NaN)).toBeNaN();
  });
});
