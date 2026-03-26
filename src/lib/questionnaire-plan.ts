export type PlanSectionId = 'conquer' | 'restore' | 'control';

export type PlanBulletId =
  | 'buildUnbreakableSelfControl'
  | 'becomeMoreAttractive'
  | 'control'
  | 'restoreDrive'
  | 'reduceDesensitization'
  | 'enjoyHealthyIntimacy'
  | 'learnToReject'
  | 'cravings'
  | 'regainFocus'
  | 'reduceSadness';

export type PlanBullet = Readonly<{
  id: PlanBulletId;
  textKey: `plan.bullets.${PlanBulletId}`;
  dotColor: string;
}>;

export type PlanSection = Readonly<{
  id: PlanSectionId;
  titleKey: `plan.sections.${PlanSectionId}.title`;
  bullets: readonly PlanBullet[];
  noteKey?: `plan.sections.${PlanSectionId}.note`;
  illustrationKey?: `plan.sections.${PlanSectionId}.illustrationA11y`;
}>;

const dot = (hex: string) => hex;

export const getDefaultPlanSections = (): readonly PlanSection[] => {
  return [
    {
      id: 'conquer',
      titleKey: 'plan.sections.conquer.title',
      illustrationKey: 'plan.sections.conquer.illustrationA11y',
      bullets: [
        { id: 'buildUnbreakableSelfControl', textKey: 'plan.bullets.buildUnbreakableSelfControl', dotColor: dot('#3b82f6') },
        { id: 'becomeMoreAttractive', textKey: 'plan.bullets.becomeMoreAttractive', dotColor: dot('#22c55e') },
        { id: 'control', textKey: 'plan.bullets.control', dotColor: dot('#ef4444') },
      ],
      noteKey: 'plan.sections.conquer.note',
    },
    {
      id: 'restore',
      titleKey: 'plan.sections.restore.title',
      illustrationKey: 'plan.sections.restore.illustrationA11y',
      bullets: [
        { id: 'restoreDrive', textKey: 'plan.bullets.restoreDrive', dotColor: dot('#22c55e') },
        { id: 'reduceDesensitization', textKey: 'plan.bullets.reduceDesensitization', dotColor: dot('#f59e0b') },
        { id: 'enjoyHealthyIntimacy', textKey: 'plan.bullets.enjoyHealthyIntimacy', dotColor: dot('#3b82f6') },
      ],
    },
    {
      id: 'control',
      titleKey: 'plan.sections.control.title',
      illustrationKey: 'plan.sections.control.illustrationA11y',
      bullets: [
        { id: 'learnToReject', textKey: 'plan.bullets.learnToReject', dotColor: dot('#22c55e') },
        { id: 'cravings', textKey: 'plan.bullets.cravings', dotColor: dot('#ef4444') },
        { id: 'regainFocus', textKey: 'plan.bullets.regainFocus', dotColor: dot('#3b82f6') },
        { id: 'reduceSadness', textKey: 'plan.bullets.reduceSadness', dotColor: dot('#f59e0b') },
      ],
      noteKey: 'plan.sections.control.note',
    },
  ] as const;
};

