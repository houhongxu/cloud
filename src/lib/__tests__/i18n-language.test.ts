import { createMemoryStorage } from '../storage/key-value';
import { getStoredLanguage, normalizeLanguage, setStoredLanguage } from '../i18n-language';

describe('i18n-language', () => {
  it('normalizes language values', () => {
    expect(normalizeLanguage('zh-CN')).toBe('zh');
    expect(normalizeLanguage('zh')).toBe('zh');
    expect(normalizeLanguage('en')).toBe('en');
    expect(normalizeLanguage('en-US')).toBe('en');
  });

  it('falls back to en when empty', () => {
    expect(normalizeLanguage(undefined)).toBe('en');
    expect(normalizeLanguage('')).toBe('en');
  });

  it('stores and reads supported languages', () => {
    const storage = createMemoryStorage();
    expect(getStoredLanguage(storage)).toBeUndefined();
    setStoredLanguage('zh', storage);
    expect(getStoredLanguage(storage)).toBe('zh');
    setStoredLanguage('en', storage);
    expect(getStoredLanguage(storage)).toBe('en');
  });
});

