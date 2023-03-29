import * as ExpoSettings from 'expo-settings';
import type { CurrentlyRunningInfo, AvailableUpdateInfo, UpdatesLogEntry } from 'expo-updates';

const cacheTimeoutKey = 'EX_UPDATES_LAUNCH_WAIT_MS';

const getCacheTimeoutSetting: () => number = () => {
  const cacheTimeoutString = ExpoSettings.get(cacheTimeoutKey);
  return cacheTimeoutString ? parseInt(cacheTimeoutString, 10) : -1;
};

const setCacheTimeoutSetting = (timeout: number) => {
  ExpoSettings.set(cacheTimeoutKey, `${timeout}`);
};

const removeCacheTimeoutSetting = () => {
  ExpoSettings.remove(cacheTimeoutKey);
};

const infoBoxText = (
  currentlyRunning: CurrentlyRunningInfo,
  availableUpdate: AvailableUpdateInfo | undefined,
  error: Error | undefined,
  lastCheckForUpdateTime: Date | undefined
) => {
  return (
    currentlyRunningDescription(currentlyRunning) +
    '\n' +
    availableUpdateDescription(availableUpdate) +
    '\n' +
    `Last check for update: ${lastCheckForUpdateTime}\n` +
    `Error: ${JSON.stringify(error)}\n`
  );
};

const manifestDescription = (manifest: any) => {
  return (
    `  ID: ${manifest?.id}\n` +
    `  Created: ${manifest?.createdAt}\n` +
    `  Message: ${manifestMessage(manifest)}\n` +
    `  Critical: ${isManifestCritical(manifest)}\n`
  );
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

const isManifestCritical = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.critical || false;
};

const logEntryText = (logEntries?: UpdatesLogEntry[]) => {
  const entries: any = logEntries
    ? logEntries
        .slice(logEntries.length - 2, logEntries.length)
        .map((entry) => ({ code: entry.code, message: entry.message }))
    : [];
  return JSON.stringify(entries, null, 2);
};

// Promise wrapper for setTimeout()
const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export {
  getCacheTimeoutSetting,
  setCacheTimeoutSetting,
  removeCacheTimeoutSetting,
  delay,
  infoBoxText,
  logEntryText,
  manifestDescription,
  manifestMessage,
  isManifestCritical,
};
