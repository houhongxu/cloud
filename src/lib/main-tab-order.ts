/** Bottom tab route names in left-to-right order (must match navigator registration). */
export const MAIN_TAB_ORDER = ['Home', 'Recovery', 'Library', 'Community', 'User'] as const;

export type MainTabRouteName = (typeof MAIN_TAB_ORDER)[number];
