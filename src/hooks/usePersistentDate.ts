// Wraps the useUpdates() hook and persists the last update check time

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { date1GreaterThanDate2 } from '../utils';

const fetchLastUpdateCheckDateAsync: () => Promise<Date | undefined> = async () => {
  const dateString = await AsyncStorage.getItem('@lastUpdateCheckDate');
  return dateString ? new Date(dateString) : undefined;
};

const storeLastUpdateCheckDateAsync: (date: Date) => Promise<void> = async (date) => {
  const dateString = date.toISOString();
  return await AsyncStorage.setItem('@lastUpdateCheckDate', dateString);
};

const usePersistentDate = (dateSinceRestart: Date | undefined) => {
  const [localDate, setLocalDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (dateSinceRestart && date1GreaterThanDate2(dateSinceRestart, localDate)) {
      // Caller passed in a date, so store it and set the local copy
      storeLastUpdateCheckDateAsync(dateSinceRestart).then(() => {
        setLocalDate(dateSinceRestart);
      });
      return;
    }
  }, [dateSinceRestart, localDate]);

  useEffect(() => {
    if (localDate === undefined) {
      // If no date has yet been defined, try reading it from storage
      fetchLastUpdateCheckDateAsync().then((storedDate) => {
        if (storedDate) {
          setLocalDate(storedDate);
        }
      });
    }
  }, [localDate]);

  return localDate;
};

export default usePersistentDate;
