import { getWelcomeCopy } from '../lib/getWelcomeCopy';

describe('getWelcomeCopy', () => {
  it('returns localized copy for supported language', () => {
    const copy = getWelcomeCopy('zh');

    expect(copy.title).toBe('拥抱这段停顿。');
    expect(copy.subtitle).toBe('在失控之前，先回到觉察。');
  });

  it('falls back to English when language is not supported', () => {
    const copy = getWelcomeCopy('fr');

    expect(copy.title).toBe('Embrace this pause.');
    expect(copy.subtitle).toBe('Reflect before you relapse.');
  });

  it('throws when language is empty', () => {
    expect(() => getWelcomeCopy('')).toThrow('language is required');
  });
});
