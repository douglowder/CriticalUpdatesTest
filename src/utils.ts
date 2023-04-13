import type { AvailableUpdateInfo, CurrentlyRunningInfo } from '@expo/use-updates';

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

const dateToTimeInSeconds = (date: Date | undefined) =>
  date ? Math.floor(date.getTime() / 1000) : -1;

const date1GreaterThanDate2 = (date1: Date | undefined, date2: Date | undefined) =>
  dateToTimeInSeconds(date1) > dateToTimeInSeconds(date2);

const dateDifferenceInSeconds = (date1: Date | undefined, date2: Date | undefined) =>
  dateToTimeInSeconds(date1) - dateToTimeInSeconds(date2);

const currentlyRunningTitle = (currentlyRunning: CurrentlyRunningInfo) => {
  return currentlyRunning?.isEmbeddedLaunch ? 'Running the embedded bundle:' : 'Running an update:';
};

const currentlyRunningDescription = (currentlyRunning: CurrentlyRunningInfo) => {
  return (
    ` ID: ${currentlyRunning.updateId}\n` +
    ` Created: ${currentlyRunning.createdAt?.toISOString()}\n` +
    ` Channel: ${currentlyRunning.channel}\n` +
    ` Runtime Version: ${currentlyRunning.runtimeVersion}\n`
  );
};

const availableUpdateDescription = (availableUpdate: AvailableUpdateInfo | undefined) => {
  return availableUpdate
    ? ` ID: ${availableUpdate.updateId}\n` +
        ` Created: ${availableUpdate.createdAt?.toISOString() || ''}\n` +
        ` Message: ${manifestMessage(availableUpdate.manifest)}\n` +
        ` Critical: ${isManifestCritical(availableUpdate.manifest)}\n`
    : 'No available update';
};

const manifestMessage = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.message || '';
};

export {
  date1GreaterThanDate2,
  dateDifferenceInSeconds,
  availableUpdateDescription,
  delay,
  currentlyRunningTitle,
  currentlyRunningDescription,
  isManifestCritical,
  manifestMessage,
};
