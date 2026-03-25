import { getWelcomeCopy } from '../../lib/getWelcomeCopy';

describe('getWelcomeCopy', () => {
  it('returns zh copy for zh', () => {
    expect(getWelcomeCopy('zh').title).toBe('拥抱这段停顿。');
  });

  it('falls back to en for unsupported language', () => {
    expect(getWelcomeCopy('fr').title).toBe('Embrace this pause.');
  });

  it('throws when language is empty', () => {
    expect(() => getWelcomeCopy('   ')).toThrow('language is required');
  });
});

