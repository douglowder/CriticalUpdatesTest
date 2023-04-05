import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUpdates as expoUseUpdates } from '@expo/use-updates';
import type { UseUpdatesCallbacksType, UseUpdatesReturnType } from '@expo/use-updates';

const fetchLastUpdateCheckDateAsync: () => Promise<Date | undefined> = async () => {
  const dateString = await AsyncStorage.getItem('@lastUpdateCheckDate');
  return dateString ? new Date(dateString) : undefined;
};

const storeLastUpdateCheckDateAsync: (date: Date) => void = (date) => {
  const dateString = date.toISOString();
  return AsyncStorage.setItem('@lastUpdateCheckDate', dateString);
};

const dateToTimeInSeconds = (date: Date) => Math.floor(date.getTime() / 1000);

const date1GreaterThanDate2 = (date1: Date | undefined, date2: Date | undefined) => {
  if (!date2) {
    return true;
  } else if (!date1) {
    return false;
  } else {
    return dateToTimeInSeconds(date1) > dateToTimeInSeconds(date2);
  }
};

export const useUpdates: (callbacks?: UseUpdatesCallbacksType) => UseUpdatesReturnType = (
  callbacks
) => {
  const useUpdatesResult = expoUseUpdates(callbacks);

  const [lastCheckForUpdateTimeLocal, setLastCheckForUpdateTimeLocal] = useState<Date | undefined>(
    undefined
  );

  const { lastCheckForUpdateTimeSinceRestart } = useUpdatesResult;

  useEffect(() => {
    fetchLastUpdateCheckDateAsync().then((date) => {
      if (date1GreaterThanDate2(date, lastCheckForUpdateTimeLocal)) {
        setLastCheckForUpdateTimeLocal(date);
      }
    });
  }, [lastCheckForUpdateTimeLocal]);

  useEffect(() => {
    if (lastCheckForUpdateTimeSinceRestart) {
      if (date1GreaterThanDate2(lastCheckForUpdateTimeSinceRestart, lastCheckForUpdateTimeLocal)) {
        setLastCheckForUpdateTimeLocal(lastCheckForUpdateTimeSinceRestart);
        storeLastUpdateCheckDateAsync(lastCheckForUpdateTimeSinceRestart);
      }
    }
  }, [lastCheckForUpdateTimeLocal, lastCheckForUpdateTimeSinceRestart]);

  return {
    ...useUpdatesResult,
    lastCheckForUpdateTimeSinceRestart: lastCheckForUpdateTimeLocal,
  };
};
