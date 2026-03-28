import type { KeyValueStorage } from './storage/key-value';

export const HOME_DAILY_CHECKIN_MODAL_STORAGE_KEY = 'homeDailyCheckinModal.lastYmd';

/** Local calendar day as YYYY-MM-DD (device timezone). */
export const formatLocalYmd = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${String(y)}-${m}-${d}`;
};

export const getShouldShowHomeDailyCheckinModal = (
  storage: KeyValueStorage,
  now: Date = new Date(),
): boolean => {
  const today = formatLocalYmd(now);
  const last = storage.getString(HOME_DAILY_CHECKIN_MODAL_STORAGE_KEY);
  return last !== today;
};

export const markHomeDailyCheckinModalShownForDay = (
  storage: KeyValueStorage,
  now: Date = new Date(),
): void => {
  storage.setString(HOME_DAILY_CHECKIN_MODAL_STORAGE_KEY, formatLocalYmd(now));
};
