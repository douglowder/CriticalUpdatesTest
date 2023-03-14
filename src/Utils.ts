const infoBoxText = (currentlyRunning: any, updateAvailable: any) => {
  let currentlyRunningText = 'Running the embedded bundle\n';
  if (currentlyRunning?.id) {
    currentlyRunningText = `Running an update:\n${manifestDescription(currentlyRunning)}`;
  }
  let updateAvailableText = 'No new update available\n';
  if (updateAvailable) {
    updateAvailableText = `New update available:\n${manifestDescription(updateAvailable)}`;
  }
  return currentlyRunningText + '\n' + updateAvailableText;
};

const manifestDescription = (manifest: any) => {
  return (
    `  ID: ${manifest?.id}\n` +
    `  Created: ${manifest?.createdAt}\n` +
    `  Message: ${manifestMessage(manifest)}\n` +
    `  Critical: ${isManifestCritical(manifest)}\n`
  );
};

const manifestMessage = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.message || '';
};

const isManifestCritical = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.critical || false;
};

// Promise wrapper for setTimeout()
const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export { delay, infoBoxText, manifestDescription, manifestMessage, isManifestCritical };
