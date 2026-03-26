export type BenefitScreenId = 'quotes' | 'progress';

export type BenefitQuoteId = 'huberman' | 'bartlett' | 'connor' | 'jack';

export type BenefitQuote = Readonly<{
  id: BenefitQuoteId;
  nameKey: `benefits.quotes.${BenefitQuoteId}.name`;
  headlineKey: `benefits.quotes.${BenefitQuoteId}.headline`;
  bodyKey: `benefits.quotes.${BenefitQuoteId}.body`;
}>;

export type BenefitScreen = Readonly<
  | {
      id: 'quotes';
      titleKey: 'benefits.title';
      items: readonly BenefitQuote[];
      ctaKey: 'benefits.ctaSeeProgress';
    }
  | {
      id: 'progress';
      titleKey: 'benefits.title';
      kickerKey: 'benefits.progress.kicker';
      captionKey: 'benefits.progress.caption';
      ctaKey: 'benefits.ctaContinue';
    }
>;

export const getDefaultBenefitScreens = (): readonly BenefitScreen[] => {
  const screens: readonly BenefitScreen[] = [
    {
      id: 'quotes',
      titleKey: 'benefits.title',
      items: [
        {
          id: 'huberman',
          nameKey: 'benefits.quotes.huberman.name',
          headlineKey: 'benefits.quotes.huberman.headline',
          bodyKey: 'benefits.quotes.huberman.body',
        },
        {
          id: 'bartlett',
          nameKey: 'benefits.quotes.bartlett.name',
          headlineKey: 'benefits.quotes.bartlett.headline',
          bodyKey: 'benefits.quotes.bartlett.body',
        },
        {
          id: 'connor',
          nameKey: 'benefits.quotes.connor.name',
          headlineKey: 'benefits.quotes.connor.headline',
          bodyKey: 'benefits.quotes.connor.body',
        },
        {
          id: 'jack',
          nameKey: 'benefits.quotes.jack.name',
          headlineKey: 'benefits.quotes.jack.headline',
          bodyKey: 'benefits.quotes.jack.body',
        },
      ],
      ctaKey: 'benefits.ctaSeeProgress',
    },
    {
      id: 'progress',
      titleKey: 'benefits.title',
      kickerKey: 'benefits.progress.kicker',
      captionKey: 'benefits.progress.caption',
      ctaKey: 'benefits.ctaContinue',
    },
  ];
  return screens;
};

export const benefitScreenIndexFromOffset = (offsetY: number, pageHeight: number, screenCount: number): number => {
  if (!Number.isFinite(offsetY) || !Number.isFinite(pageHeight) || !Number.isFinite(screenCount)) return 0;
  if (pageHeight <= 0 || screenCount <= 0) return 0;
  const raw = Math.round(offsetY / pageHeight);
  return Math.max(0, Math.min(screenCount - 1, raw));
};

