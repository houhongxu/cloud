import { createMmkvStorage } from '../storage/mmkv';

describe('createMmkvStorage', () => {
  it('falls back safely outside React Native', () => {
    const storage = createMmkvStorage();
    expect(storage.getString('missing')).toBeUndefined();
    expect(() => storage.setString('k', 'v')).not.toThrow();
    expect(() => storage.delete('k')).not.toThrow();
  });
});

