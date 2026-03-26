export type HarmPageId =
  | 'pornIsADrug'
  | 'dopamineLoop'
  | 'toleranceAndEscalation'
  | 'desensitization'
  | 'reclaimControl';

export type HarmPage = Readonly<{
  id: HarmPageId;
  backgroundColor: string;
  titleKey: `harms.pages.${HarmPageId}.title`;
  bodyKey: `harms.pages.${HarmPageId}.body`;
}>;

export const getDefaultHarmPages = (): readonly HarmPage[] => {
  const pages: readonly HarmPage[] = [
    {
      id: 'pornIsADrug',
      backgroundColor: '#E23B3B',
      titleKey: 'harms.pages.pornIsADrug.title',
      bodyKey: 'harms.pages.pornIsADrug.body',
    },
    {
      id: 'dopamineLoop',
      backgroundColor: '#9B2CDE',
      titleKey: 'harms.pages.dopamineLoop.title',
      bodyKey: 'harms.pages.dopamineLoop.body',
    },
    {
      id: 'toleranceAndEscalation',
      backgroundColor: '#1F6FEB',
      titleKey: 'harms.pages.toleranceAndEscalation.title',
      bodyKey: 'harms.pages.toleranceAndEscalation.body',
    },
    {
      id: 'desensitization',
      backgroundColor: '#0F9D7A',
      titleKey: 'harms.pages.desensitization.title',
      bodyKey: 'harms.pages.desensitization.body',
    },
    {
      id: 'reclaimControl',
      backgroundColor: '#D97706',
      titleKey: 'harms.pages.reclaimControl.title',
      bodyKey: 'harms.pages.reclaimControl.body',
    },
  ];
  return pages;
};

export const harmPageIndexFromOffset = (offsetX: number, pageWidth: number, pageCount: number): number => {
  if (!Number.isFinite(offsetX) || !Number.isFinite(pageWidth) || !Number.isFinite(pageCount)) return 0;
  if (pageWidth <= 0 || pageCount <= 0) return 0;
  const raw = Math.round(offsetX / pageWidth);
  const clamped = Math.max(0, Math.min(pageCount - 1, raw));
  return clamped;
};

