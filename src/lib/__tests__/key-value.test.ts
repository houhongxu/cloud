import { createMemoryStorage } from '../storage/key-value';

describe('createMemoryStorage', () => {
  it('stores and reads strings', () => {
    const storage = createMemoryStorage();
    expect(storage.getString('k')).toBeUndefined();
    storage.setString('k', 'v');
    expect(storage.getString('k')).toBe('v');
  });

  it('deletes keys as a boundary case', () => {
    const storage = createMemoryStorage();
    storage.setString('k', 'v');
    storage.delete('k');
    expect(storage.getString('k')).toBeUndefined();
  });
});

