import { createMMKV } from 'react-native-mmkv';

import type { KeyValueStorage } from './key-value';

export const createMmkvStorage = (): KeyValueStorage => {
  const mmkv = createMMKV();

  return {
    getString: (key) => mmkv.getString(key) ?? undefined,
    setString: (key, value) => {
      mmkv.set(key, value);
    },
    delete: (key) => {
      mmkv.remove(key);
    },
  };
};

