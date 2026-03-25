import type { KeyValueStorage } from './storage/key-value';
import { createMmkvStorage } from './storage/mmkv';

export type SupportedLanguage = 'en' | 'zh';

const STORAGE_KEY = 'settings.language';

export const normalizeLanguage = (raw: string | undefined): SupportedLanguage => {
  if (!raw) return 'en';
  return raw.startsWith('zh') ? 'zh' : 'en';
};

export const getStoredLanguage = (storage: KeyValueStorage = createMmkvStorage()): SupportedLanguage | undefined => {
  const raw = storage.getString(STORAGE_KEY);
  if (raw === 'en' || raw === 'zh') return raw;
  return undefined;
};

export const setStoredLanguage = (
  language: SupportedLanguage,
  storage: KeyValueStorage = createMmkvStorage(),
): void => {
  storage.setString(STORAGE_KEY, language);
};

