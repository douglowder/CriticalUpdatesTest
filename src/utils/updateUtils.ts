import type { UpdateInfo, CurrentlyRunningInfo } from 'expo-updates';

// Access 'extra' properties from update manifests

const isManifestCritical = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.critical || false;
};

const manifestMessage = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.message || '';
};

// Utils for constructing display text

const currentlyRunningTitle = (currentlyRunning: CurrentlyRunningInfo) => {
  return currentlyRunning?.isEmbeddedLaunch ? 'Running the embedded bundle:' : 'Running an update:';
};

const currentlyRunningDescription = (
  currentlyRunning: CurrentlyRunningInfo,
  lastCheckForUpdateTime?: Date
) => {
  return (
    ` ID: ${currentlyRunning.updateId}\n` +
    ` Created: ${currentlyRunning.createdAt?.toISOString()}\n` +
    ` Channel: ${currentlyRunning.channel}\n` +
    ` Runtime Version: ${currentlyRunning.runtimeVersion}\n` +
    ` Message: ${manifestMessage(currentlyRunning.manifest)}\n` +
    ` Last check: ${lastCheckForUpdateTime?.toISOString()}\n` +
    ` ${currentlyRunning.isEmergencyLaunch ? 'This is an emergency launch' : ''}\n`
  );
};

const availableUpdateDescription = (availableUpdate?: UpdateInfo) => {
  const updateDescription = availableUpdate
    ? ` ID: ${availableUpdate.updateId}\n` +
      ` Created: ${availableUpdate.createdAt?.toISOString() || ''}\n` +
      ` Message: ${manifestMessage(availableUpdate.manifest)}\n` +
      ` Critical: ${isManifestCritical(availableUpdate.manifest)}\n`
    : 'No available update\n';
  return updateDescription + errorDescription;
};

const errorDescription = (
  initializationError?: Error,
  checkError?: Error,
  downloadError?: Error
) => {
  const initializationErrorDescription = initializationError?.message
    ? `Error on init: ${initializationError?.message}\n`
    : '';
  const checkErrorDescription = checkError?.message
    ? `Error on check: ${checkError?.message}\n`
    : '';
  const downloadErrorDescription = downloadError?.message
    ? `Error on download: ${downloadError?.message}\n`
    : '';
  return initializationErrorDescription + checkErrorDescription + downloadErrorDescription;
};

export {
  availableUpdateDescription,
  errorDescription,
  currentlyRunningTitle,
  currentlyRunningDescription,
  isManifestCritical,
  manifestMessage,
};
