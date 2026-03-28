import { color, gradient, radius, shadow } from '../design-tokens';

const hexRe = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

describe('design-tokens', () => {
  it('exports hex colors for core roles', () => {
    expect(hexRe.test(color.primary)).toBe(true);
    expect(hexRe.test(color.cta)).toBe(true);
    expect(hexRe.test(color.background)).toBe(true);
    expect(hexRe.test(color.text)).toBe(true);
    expect(hexRe.test(color.surface)).toBe(true);
  });

  it('exports screen gradients with at least two stops', () => {
    expect(gradient.screen.length).toBeGreaterThanOrEqual(2);
    expect(gradient.modal.length).toBeGreaterThanOrEqual(2);
    gradient.screen.forEach((stop) => {
      expect(hexRe.test(stop)).toBe(true);
    });
  });

  it('uses bounded shadow opacity for soft UI', () => {
    expect(shadow.soft.shadowOpacity).toBeGreaterThan(0);
    expect(shadow.soft.shadowOpacity).toBeLessThanOrEqual(0.15);
    expect(shadow.card.shadowOpacity).toBeGreaterThan(0);
    expect(shadow.card.shadowOpacity).toBeLessThanOrEqual(0.15);
    expect(shadow.lifted.elevation).toBeGreaterThanOrEqual(shadow.card.elevation);
  });

  it('uses positive radii', () => {
    expect(radius.sm).toBeGreaterThan(0);
    expect(radius.pill).toBeGreaterThan(100);
  });
});
