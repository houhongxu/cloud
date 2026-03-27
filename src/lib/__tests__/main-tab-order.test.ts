import { MAIN_TAB_ORDER, type MainTabRouteName } from '../main-tab-order';

describe('main-tab-order', () => {
  it('has five ordered tabs left-to-right', () => {
    expect(MAIN_TAB_ORDER).toEqual(['Home', 'Recovery', 'Library', 'Community', 'User']);
  });

  it('has unique route names', () => {
    expect(new Set(MAIN_TAB_ORDER).size).toBe(MAIN_TAB_ORDER.length);
  });

  it('narrows MainTabRouteName to known tabs', () => {
    const sample: MainTabRouteName = 'Home';
    expect(sample).toBe('Home');
  });
});
