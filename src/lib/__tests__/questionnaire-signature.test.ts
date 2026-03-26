import { isValidSignaturePath, pointsToSvgPath } from '../questionnaire-signature';

describe('pointsToSvgPath', () => {
  it('returns empty when no points', () => {
    expect(pointsToSvgPath([])).toBe('');
  });

  it('creates a move command for one point', () => {
    expect(pointsToSvgPath([{ x: 10, y: 20 }])).toBe('M 10 20');
  });

  it('creates a polyline path for multiple points', () => {
    expect(
      pointsToSvgPath([
        { x: 10, y: 20 },
        { x: 11, y: 21.23 },
        { x: 12.04, y: 22.01 },
      ]),
    ).toBe('M 10 20 L 11 21.2 L 12 22');
  });
});

describe('isValidSignaturePath', () => {
  it('returns false for empty', () => {
    expect(isValidSignaturePath('')).toBe(false);
    expect(isValidSignaturePath('   ')).toBe(false);
    expect(isValidSignaturePath(undefined)).toBe(false);
  });

  it('returns true for non-empty', () => {
    expect(isValidSignaturePath('M 1 2')).toBe(true);
  });
});

