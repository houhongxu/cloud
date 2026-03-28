import {
  formatLocalYmd,
  getShouldShowHomeDailyCheckinModal,
  HOME_DAILY_CHECKIN_MODAL_STORAGE_KEY,
  markHomeDailyCheckinModalShownForDay,
} from '../home-daily-checkin-modal';
import { createMemoryStorage } from '../storage/key-value';

describe('formatLocalYmd', () => {
  it('pads month and day to two digits', () => {
    const date = new Date(2026, 2, 8);
    expect(formatLocalYmd(date)).toBe('2026-03-08');
  });

  it('handles year boundary in local calendar', () => {
    const date = new Date(2025, 11, 31);
    expect(formatLocalYmd(date)).toBe('2025-12-31');
  });
});

describe('home daily check-in modal storage', () => {
  it('shows modal when no prior day was recorded (success path)', () => {
    const storage = createMemoryStorage();
    const now = new Date(2026, 5, 1, 10, 0, 0);
    expect(getShouldShowHomeDailyCheckinModal(storage, now)).toBe(true);
  });

  it('does not show after the same local day was marked (failure path for repeat)', () => {
    const storage = createMemoryStorage();
    const now = new Date(2026, 5, 1, 10, 0, 0);
    markHomeDailyCheckinModalShownForDay(storage, now);
    expect(getShouldShowHomeDailyCheckinModal(storage, now)).toBe(false);
    expect(storage.getString(HOME_DAILY_CHECKIN_MODAL_STORAGE_KEY)).toBe('2026-06-01');
  });

  it('shows again on the next local calendar day (boundary)', () => {
    const storage = createMemoryStorage();
    const day1 = new Date(2026, 5, 1, 23, 59, 0);
    markHomeDailyCheckinModalShownForDay(storage, day1);
    const day2 = new Date(2026, 5, 2, 0, 1, 0);
    expect(getShouldShowHomeDailyCheckinModal(storage, day2)).toBe(true);
  });
});
