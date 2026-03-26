import { getDefaultGoalItems, isValidGoalSelection, toggleSingleGoal, type GoalId } from '../questionnaire-goals';

describe('getDefaultGoalItems', () => {
  it('returns 5 items with unique ids', () => {
    const items = getDefaultGoalItems();
    expect(items).toHaveLength(5);
    const ids = items.map((x) => x.id);
    expect(new Set(ids).size).toBe(5);
  });
});

describe('isValidGoalSelection', () => {
  it('returns false when null', () => {
    expect(isValidGoalSelection(null)).toBe(false);
  });

  it('returns true when selected', () => {
    expect(isValidGoalSelection('moreEnergy')).toBe(true);
  });
});

describe('toggleSingleGoal', () => {
  it('selects the next goal', () => {
    expect(toggleSingleGoal(null, 'improvedMood')).toBe('improvedMood');
  });

  it('overwrites previous selection as a boundary case', () => {
    const selected: GoalId = 'improvedSelfControl';
    expect(toggleSingleGoal(selected, 'strongerRelationships')).toBe('strongerRelationships');
  });
});

