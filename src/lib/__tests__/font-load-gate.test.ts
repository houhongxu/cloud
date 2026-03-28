import { isFontBootstrapComplete } from '../font-load-gate';

describe('isFontBootstrapComplete', () => {
  it('returns false while fonts are still loading', () => {
    expect(isFontBootstrapComplete(false, null)).toBe(false);
    expect(isFontBootstrapComplete(false, undefined)).toBe(false);
  });

  it('returns true when fonts loaded successfully', () => {
    expect(isFontBootstrapComplete(true, null)).toBe(true);
  });

  it('returns true when font loading failed so the app can fall back to system fonts', () => {
    expect(isFontBootstrapComplete(false, new Error('network'))).toBe(true);
  });
});
