import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';

import { getShouldShowHomeDailyCheckinModal, markHomeDailyCheckinModalShownForDay } from '../../../lib/home-daily-checkin-modal';
import { createMmkvStorage } from '../../../lib/storage/mmkv';

export const useHomeDailyCheckinModal = (): Readonly<{
  checkinModalVisible: boolean;
  dismissCheckinModalForToday: () => void;
}> => {
  const storage = useMemo(() => createMmkvStorage(), []);
  const [checkinModalVisible, setCheckinModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (getShouldShowHomeDailyCheckinModal(storage)) {
        setCheckinModalVisible(true);
      }
    }, [storage]),
  );

  const dismissCheckinModalForToday = useCallback(() => {
    markHomeDailyCheckinModalShownForDay(storage);
    setCheckinModalVisible(false);
  }, [storage]);

  return { checkinModalVisible, dismissCheckinModalForToday };
};
