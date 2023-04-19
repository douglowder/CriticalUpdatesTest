import type { AvailableUpdateInfo, CurrentlyRunningInfo } from '@expo/use-updates';

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

export {
  availableUpdateDescription,
  currentlyRunningTitle,
  currentlyRunningDescription,
  isManifestCritical,
  manifestMessage,
};
