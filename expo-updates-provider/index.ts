// Export types
export type { Manifest } from 'expo-updates';
export type {
  UpdatesInfo,
  CurrentlyRunningInfo,
  AvailableUpdateInfo,
  UpdatesProviderDownloadEvent,
} from './types';

// Export constants
export { UpdatesProviderDownloadEventType } from './constants';

// Methods
export { extraPropertiesFromManifest } from './utils';

// Provider
export { UpdatesProvider, useUpdates } from './provider';
