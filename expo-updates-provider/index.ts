export type { Manifest } from 'expo-updates';
export type {
  UpdatesInfo,
  CurrentlyRunningInfo,
  AvailableUpdateInfo,
} from './UpdatesProvider.types';
export { UpdatesProvider, useUpdates, checkForUpdate, runUpdate } from './UpdatesProvider';
