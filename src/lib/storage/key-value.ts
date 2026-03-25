export type KeyValueStorage = Readonly<{
  getString: (key: string) => string | undefined;
  setString: (key: string, value: string) => void;
  delete: (key: string) => void;
}>;

export const createMemoryStorage = (): KeyValueStorage => {
  const data = new Map<string, string>();

  return {
    getString: (key) => data.get(key),
    setString: (key, value) => {
      data.set(key, value);
    },
    delete: (key) => {
      data.delete(key);
    },
  };
};

