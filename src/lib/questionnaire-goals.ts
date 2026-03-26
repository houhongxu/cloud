export type GoalId =
  | 'strongerRelationships'
  | 'improvedSelfConfidence'
  | 'improvedMood'
  | 'moreEnergy'
  | 'improvedSelfControl';

export type GoalItem = Readonly<{
  id: GoalId;
  labelKey: `goals.items.${GoalId}`;
  iconText: string;
  background: readonly [string, string];
  accent: string;
}>;

export const getDefaultGoalItems = (): readonly GoalItem[] => {
  const items: readonly GoalItem[] = [
    {
      id: 'strongerRelationships',
      labelKey: 'goals.items.strongerRelationships',
      iconText: '❤',
      background: ['rgba(255, 59, 135, 0.18)', 'rgba(255, 59, 135, 0.06)'],
      accent: '#ff2d7a',
    },
    {
      id: 'improvedSelfConfidence',
      labelKey: 'goals.items.improvedSelfConfidence',
      iconText: '👤',
      background: ['rgba(59, 130, 246, 0.18)', 'rgba(59, 130, 246, 0.06)'],
      accent: '#3b82f6',
    },
    {
      id: 'improvedMood',
      labelKey: 'goals.items.improvedMood',
      iconText: '😊',
      background: ['rgba(250, 204, 21, 0.18)', 'rgba(250, 204, 21, 0.06)'],
      accent: '#facc15',
    },
    {
      id: 'moreEnergy',
      labelKey: 'goals.items.moreEnergy',
      iconText: '⚡',
      background: ['rgba(251, 146, 60, 0.18)', 'rgba(251, 146, 60, 0.06)'],
      accent: '#fb923c',
    },
    {
      id: 'improvedSelfControl',
      labelKey: 'goals.items.improvedSelfControl',
      iconText: '🧠',
      background: ['rgba(56, 189, 248, 0.18)', 'rgba(56, 189, 248, 0.06)'],
      accent: '#38bdf8',
    },
  ];
  return items;
};

export const isValidGoalSelection = (selected: GoalId | null): boolean => {
  return selected !== null;
};

export const toggleSingleGoal = (selected: GoalId | null, next: GoalId): GoalId => {
  if (selected === next) return next;
  return next;
};

