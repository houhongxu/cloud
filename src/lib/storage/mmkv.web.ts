import type { KeyValueStorage } from './key-value';
import { createMemoryStorage } from './key-value';

const safeGetLocalStorage = (): Storage | undefined => {
  try {
    if (typeof window === 'undefined') return undefined;
    return window.localStorage;
  } catch {
    return undefined;
  }
};

export const createMmkvStorage = (): KeyValueStorage => {
  const localStorage = safeGetLocalStorage();
  if (!localStorage) return createMemoryStorage();

  return {
    getString: (key) => {
      try {
        const value = localStorage.getItem(key);
        return value ?? undefined;
      } catch {
        return undefined;
      }
    },
    setString: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        // ignore (quota exceeded / disabled storage)
      }
    },
    delete: (key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // ignore
      }
    },
  };
};

