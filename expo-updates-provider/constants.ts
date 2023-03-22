import * as Updates from 'expo-updates';

/////// Constants and enums  ////////

// The currently running info, constructed from Updates constants
export const currentlyRunning = {
  updateId: Updates.updateId,
  channel: Updates.channel,
  createdAt: Updates.createdAt,
  isEmbeddedLaunch: Updates.isEmbeddedLaunch,
  isEmergencyLaunch: Updates.isEmergencyLaunch,
  manifest: Updates.manifest,
  runtimeVersion: Updates.runtimeVersion,
};

/**
 * Enumeration of the different possible event types emitted by [`downloadUpdate`](#downloadupdate) during
 * the download of an available update.
 */
export enum UpdatesProviderDownloadEventType {
  DOWNLOAD_START = 'start',
  DOWNLOAD_COMPLETE = 'complete',
  DOWNLOAD_ERROR = 'error',
}
