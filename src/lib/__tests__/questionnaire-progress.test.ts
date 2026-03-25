import { isLastQuestionIndex } from '../questionnaire-progress';

describe('isLastQuestionIndex', () => {
  it('returns true for last index', () => {
    expect(isLastQuestionIndex(2, 3)).toBe(true);
  });

  it('returns false when not last', () => {
    expect(isLastQuestionIndex(0, 3)).toBe(false);
  });

  it('returns false as a boundary case for empty total', () => {
    expect(isLastQuestionIndex(0, 0)).toBe(false);
  });

  it('throws on invalid inputs', () => {
    expect(() => isLastQuestionIndex(-1, 3)).toThrow('index must be a non-negative integer');
    expect(() => isLastQuestionIndex(0.2, 3)).toThrow('index must be a non-negative integer');
    expect(() => isLastQuestionIndex(0, -1)).toThrow('total must be a non-negative integer');
  });
});

