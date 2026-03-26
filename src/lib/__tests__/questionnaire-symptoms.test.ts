import { isValidSymptomSelection, toggleSelectedSymptom, type SymptomId } from '../questionnaire-symptoms';

describe('toggleSelectedSymptom', () => {
  it('adds when not selected', () => {
    const next = toggleSelectedSymptom([], 'unmotivated');
    expect(next).toEqual(['unmotivated']);
  });

  it('removes when already selected', () => {
    const next = toggleSelectedSymptom(['unmotivated'], 'unmotivated');
    expect(next).toEqual([]);
  });

  it('preserves other selections as a boundary case', () => {
    const selected: SymptomId[] = ['unmotivated', 'generalAnxiety'];
    const next = toggleSelectedSymptom(selected, 'unmotivated');
    expect(next).toEqual(['generalAnxiety']);
  });
});

describe('isValidSymptomSelection', () => {
  it('returns false when empty', () => {
    expect(isValidSymptomSelection([])).toBe(false);
  });

  it('returns true when has at least one', () => {
    expect(isValidSymptomSelection(['brainFog'])).toBe(true);
  });
});

