// Wraps the useUpdates() hook and persists the last update check time

import { useEffect, useState } from 'react';
import { useUpdates as expoUseUpdates } from '@expo/use-updates';
import type { UseUpdatesReturnType } from '@expo/use-updates';
import { fetchLastUpdateCheckDateAsync, storeLastUpdateCheckDateAsync } from './utils';

export type WrappedUseUpdatesReturnType = UseUpdatesReturnType & {
  lastCheckForUpdateTime: Date | undefined;
};

export const useUpdates: () => WrappedUseUpdatesReturnType = () => {
  const useUpdatesResult = expoUseUpdates();
  const { lastCheckForUpdateTimeSinceRestart } = useUpdatesResult;

  const [lastCheckForUpdateTime, setLastCheckForUpdateTime] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (lastCheckForUpdateTimeSinceRestart) {
      // If this changes, there was a check for update, so store the time and set the state
      storeLastUpdateCheckDateAsync(lastCheckForUpdateTimeSinceRestart).then(() => {
        setLastCheckForUpdateTime(lastCheckForUpdateTimeSinceRestart);
      });
      return;
    }
  }, [lastCheckForUpdateTimeSinceRestart]);

  useEffect(() => {
    if (lastCheckForUpdateTime === undefined) {
      // If no check for update yet, try reading from storage
      fetchLastUpdateCheckDateAsync().then((storedDate) => {
        if (storedDate) {
          setLastCheckForUpdateTime(storedDate);
        }
      });
    }
  }, [lastCheckForUpdateTime]);

  return {
    ...useUpdatesResult,
    lastCheckForUpdateTime,
  };
};
