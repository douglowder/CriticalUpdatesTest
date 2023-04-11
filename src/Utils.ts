import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AvailableUpdateInfo, CurrentlyRunningInfo } from '@expo/use-updates';
import type { UpdatesLogEntry } from 'expo-updates';

// Test for the critical user flag passed into an update

const isManifestCritical = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.critical || false;
};

// Promise wrapper for setTimeout()

const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

// Persistent date utils

const fetchLastUpdateCheckDateAsync: () => Promise<Date | undefined> = async () => {
  const dateString = await AsyncStorage.getItem('@lastUpdateCheckDate');
  return dateString ? new Date(dateString) : undefined;
};

const storeLastUpdateCheckDateAsync: (date: Date) => Promise<void> = async (date) => {
  const dateString = date.toISOString();
  return await AsyncStorage.setItem('@lastUpdateCheckDate', dateString);
};

const dateToTimeInSeconds = (date: Date | undefined) =>
  date ? Math.floor(date.getTime() / 1000) : -1;

const date1GreaterThanDate2 = (date1: Date | undefined, date2: Date | undefined) =>
  dateToTimeInSeconds(date1) > dateToTimeInSeconds(date2);

const dateDifferenceInSeconds = (date1: Date | undefined, date2: Date | undefined) =>
  dateToTimeInSeconds(date1) - dateToTimeInSeconds(date2);

// Utils for displaying info

const infoBoxText = (
  currentlyRunning: CurrentlyRunningInfo,
  error: Error | undefined,
  lastCheckForUpdateTime: Date | undefined
) => {
  return (
    currentlyRunningDescription(currentlyRunning) +
    '\n' +
    //availableUpdateDescription(availableUpdate) +
    //'\n' +
    `Last check for update: ${lastCheckForUpdateTime}\n` +
    `Error: ${JSON.stringify(error)}\n`
  );
};

const manifestDescription = (manifest: any) => {
  return manifest?.id
    ? `  ID: ${manifest?.id}\n` +
        `  Created: ${manifest?.createdAt}\n` +
        `  Message: ${manifestMessage(manifest)}\n` +
        `  Critical: ${isManifestCritical(manifest)}\n`
    : '';
};

const currentlyRunningDescription = (currentlyRunning: CurrentlyRunningInfo) => {
  return (
    (currentlyRunning?.isEmbeddedLaunch
      ? 'Running the embedded bundle:\n'
      : 'Running an update:\n') +
    ` ID: ${currentlyRunning.updateId}\n` +
    ` Created: ${currentlyRunning.createdAt}\n` +
    ` Channel: ${currentlyRunning.channel}\n` +
    ` Runtime Version: ${currentlyRunning.runtimeVersion}\n`
  );
};

const availableUpdateDescription = (availableUpdate: AvailableUpdateInfo | undefined) => {
  return availableUpdate
    ? 'Update available:\n' +
        ` ID: ${availableUpdate.updateId}\n` +
        ` Created: ${availableUpdate.createdAt || ''}\n` +
        ' Manifest:\n' +
        manifestDescription(availableUpdate.manifest)
    : 'No available update';
};

const manifestMessage = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.message || '';
};

const logEntryText = (logEntries?: UpdatesLogEntry[]) => {
  const entries: any = logEntries
    ? logEntries
        .slice(logEntries.length - 2, logEntries.length)
        .map((entry) => ({ code: entry.code, message: entry.message }))
    : [];
  return JSON.stringify(entries, null, 2);
};

export {
  fetchLastUpdateCheckDateAsync,
  storeLastUpdateCheckDateAsync,
  date1GreaterThanDate2,
  dateDifferenceInSeconds,
  availableUpdateDescription,
  delay,
  infoBoxText,
  isManifestCritical,
  logEntryText,
  manifestDescription,
  manifestMessage,
};
