import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import type { UseUpdatesCallbacksType, UseUpdatesReturnType } from 'expo-updates';

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
  const useUpdatesResult = Updates.useUpdates(callbacks);
  const { updatesInfo } = useUpdatesResult;

  const [lastCheckForUpdateTimeLocal, setLastCheckForUpdateTimeLocal] = useState<Date | undefined>(
    undefined
  );

  const { lastCheckForUpdateTimeSinceRestart } = updatesInfo;

  useEffect(() => {
    if (lastCheckForUpdateTimeSinceRestart) {
      if (date1GreaterThanDate2(lastCheckForUpdateTimeSinceRestart, lastCheckForUpdateTimeLocal)) {
        setLastCheckForUpdateTimeLocal(lastCheckForUpdateTimeSinceRestart);
        storeLastUpdateCheckDateAsync(lastCheckForUpdateTimeSinceRestart);
      }
    }
  }, [lastCheckForUpdateTimeLocal, lastCheckForUpdateTimeSinceRestart]);

  useEffect(() => {
    if (!lastCheckForUpdateTimeLocal && !lastCheckForUpdateTimeSinceRestart) {
      fetchLastUpdateCheckDateAsync().then((date) => {
        if (date) {
          setLastCheckForUpdateTimeLocal(date);
        }
      });
    }
  }, [lastCheckForUpdateTimeLocal, lastCheckForUpdateTimeSinceRestart]);

  return {
    ...useUpdatesResult,
    updatesInfo: {
      ...updatesInfo,
      lastCheckForUpdateTimeSinceRestart: lastCheckForUpdateTimeLocal,
    },
  };
};
