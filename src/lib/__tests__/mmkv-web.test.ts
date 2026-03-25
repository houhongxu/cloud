import { createMmkvStorage } from '../storage/mmkv.web';

describe('createMmkvStorage (web)', () => {
  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).window;
  });

  it('falls back to memory storage when window is missing', () => {
    const storage = createMmkvStorage();
    expect(storage.getString('missing')).toBeUndefined();
    storage.setString('k', 'v');
    expect(storage.getString('k')).toBe('v');
    storage.delete('k');
    expect(storage.getString('k')).toBeUndefined();
  });

  it('uses localStorage when available', () => {
    const localStorage = {
      getItem: jest.fn((key: string) => (key === 'k' ? 'v' : null)),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).window = { localStorage };

    const storage = createMmkvStorage();
    expect(storage.getString('k')).toBe('v');
    storage.setString('k2', 'v2');
    storage.delete('k2');

    expect(localStorage.getItem).toHaveBeenCalledWith('k');
    expect(localStorage.setItem).toHaveBeenCalledWith('k2', 'v2');
    expect(localStorage.removeItem).toHaveBeenCalledWith('k2');
  });

  it('handles localStorage errors gracefully', () => {
    const localStorage = {
      getItem: jest.fn(() => {
        throw new Error('boom');
      }),
      setItem: jest.fn(() => {
        throw new Error('boom');
      }),
      removeItem: jest.fn(() => {
        throw new Error('boom');
      }),
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).window = { localStorage };

    const storage = createMmkvStorage();
    expect(storage.getString('k')).toBeUndefined();
    expect(() => storage.setString('k', 'v')).not.toThrow();
    expect(() => storage.delete('k')).not.toThrow();
  });
});

