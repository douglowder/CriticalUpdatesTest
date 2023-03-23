// Export types
export type { Manifest } from 'expo-updates';
export type {
  UpdatesInfo,
  CurrentlyRunningInfo,
  AvailableUpdateInfo,
  UpdatesProviderDownloadEvent,
} from './UpdatesProvider.types';

// Export constants
export { UpdatesProviderDownloadEventType } from './UpdatesProvider.constants';

// Provider
export {
  UpdatesProvider,
  useUpdates,
  checkForUpdate,
  downloadUpdate,
  runUpdate,
  downloadAndRunUpdate,
  extraPropertiesFromManifest,
} from './UpdatesProvider';
