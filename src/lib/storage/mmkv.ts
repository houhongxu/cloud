import type { KeyValueStorage } from './key-value';

export const createMmkvStorage = (): KeyValueStorage => {
  return {
    getString: () => undefined,
    setString: () => {},
    delete: () => {},
  };
};

