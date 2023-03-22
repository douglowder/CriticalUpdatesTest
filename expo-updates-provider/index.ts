// Export types
export type { Manifest } from 'expo-updates';
export type {
  UpdatesInfo,
  CurrentlyRunningInfo,
  AvailableUpdateInfo,
  UpdatesProviderDownloadEvent,
} from './UpdatesProvider.types';
// Export constants
export { UpdatesProviderDownloadEventType } from './UpdatesProvider.types';
// Export methods and components
export {
  UpdatesProvider,
  useUpdates,
  checkForUpdate,
  extraPropertiesFromManifest,
  downloadUpdate,
  downloadAndRunUpdate,
  runUpdate,
} from './UpdatesProvider';
