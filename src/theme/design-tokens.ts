/**
 * Soft UI + lavender wellness palette (ui-ux-pro-max design system).
 * Single source of truth for product chrome; questionnaire content accents may extend this set.
 */
export const color = {
  primary: '#8B5CF6',
  primaryDark: '#7C3AED',
  secondary: '#C4B5FD',
  secondaryLight: '#DDD6FE',
  cta: '#10B981',
  ctaDark: '#059669',
  ctaText: '#FFFFFF',
  background: '#FAF5FF',
  backgroundMid: '#F3E8FF',
  backgroundDeep: '#EDE9FE',
  surface: '#FFFFFF',
  surfaceMuted: '#FDFAFF',
  text: '#4C1D95',
  textSecondary: 'rgba(76, 29, 149, 0.65)',
  textMuted: 'rgba(76, 29, 149, 0.48)',
  textOnPrimary: '#FFFFFF',
  border: 'rgba(139, 92, 246, 0.2)',
  borderSubtle: 'rgba(139, 92, 246, 0.12)',
  borderStrong: 'rgba(139, 92, 246, 0.35)',
  overlay: 'rgba(139, 92, 246, 0.1)',
  overlayStrong: 'rgba(139, 92, 246, 0.18)',
  star: 'rgba(139, 92, 246, 0.5)',
  ink: '#312E81',
  danger: '#DC2626',
  dangerMuted: '#B91C1C',
  dangerSurface: '#FEF2F2',
  dangerBorder: '#FECACA',
  analysisYes: '#10B981',
  analysisNo: '#EF4444',
  goldAccent: '#D97706',
} as const;

export const gradient = {
  screen: ['#FAF5FF', '#F3E8FF', '#EDE9FE'] as const,
  screenCool: ['#EDE9FE', '#E9D5FF', '#DDD6FE'] as const,
  heroDisc: ['#DDD6FE', '#C4B5FD', '#8B5CF6', '#A78BFA'] as const,
  modal: ['#F5F3FF', '#EDE9FE', '#FAF5FF'] as const,
  logoSheen: ['rgba(139, 92, 246, 0.12)', 'rgba(196, 181, 253, 0.2)'] as const,
  ringTrack: 'rgba(76, 29, 149, 0.12)',
} as const;

export const shadow = {
  soft: {
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  card: {
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  lifted: {
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  tabBar: {
    shadowColor: '#4C1D95',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
} as const;
