export type SymptomCategoryId = 'mental';

export type SymptomId =
  | 'unmotivated'
  | 'lackOfAmbition'
  | 'difficultyConcentrating'
  | 'brainFog'
  | 'generalAnxiety';

export type SymptomCategory = Readonly<{
  id: SymptomCategoryId;
  titleKey: 'symptoms.categories.mental';
  items: readonly Readonly<{
    id: SymptomId;
    labelKey:
      | 'symptoms.items.unmotivated'
      | 'symptoms.items.lackOfAmbition'
      | 'symptoms.items.difficultyConcentrating'
      | 'symptoms.items.brainFog'
      | 'symptoms.items.generalAnxiety';
  }>[];
}>;

export const getDefaultSymptomCategories = (): readonly SymptomCategory[] => [
  {
    id: 'mental',
    titleKey: 'symptoms.categories.mental',
    items: [
      { id: 'unmotivated', labelKey: 'symptoms.items.unmotivated' },
      { id: 'lackOfAmbition', labelKey: 'symptoms.items.lackOfAmbition' },
      { id: 'difficultyConcentrating', labelKey: 'symptoms.items.difficultyConcentrating' },
      { id: 'brainFog', labelKey: 'symptoms.items.brainFog' },
      { id: 'generalAnxiety', labelKey: 'symptoms.items.generalAnxiety' },
    ],
  },
] as const;

export const toggleSelectedSymptom = (selected: readonly SymptomId[], id: SymptomId): SymptomId[] => {
  if (selected.includes(id)) {
    return selected.filter((x) => x !== id);
  }
  return [...selected, id];
};

export const isValidSymptomSelection = (selected: readonly SymptomId[]): boolean => {
  return selected.length > 0;
};
