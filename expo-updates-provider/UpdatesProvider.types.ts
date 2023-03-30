import type { Manifest } from 'expo-updates';

import type { UpdatesProviderDownloadEventType } from './UpdatesProvider.constants';

/**
 * An event emitted by [`downloadUpdate`](#downloadupdate) during
 * the download of an available update.
 */
export type UpdatesProviderDownloadEvent = {
  type: UpdatesProviderDownloadEventType;
  error?: Error;
};

/**
 * Structure encapsulating information on the currently running app
 * (either the embedded bundle or a downloaded update).
 */
export type CurrentlyRunningInfo = {
  /**
   * The UUID that uniquely identifies the currently running update if `expo-updates` is enabled. The
   * UUID is represented in its canonical string form (`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) and
   * will always use lowercase letters. In development mode, or any other environment in which
   * `expo-updates` is disabled, this value is `null`.
   */
  updateId: string | null;
  /**
   * The channel name of the current build, if configured for use with EAS Update. Null otherwise.
   */
  channel: string | null;
  /**
   * If `expo-updates` is enabled, this is a `Date` object representing the creation time of the update
   * that's currently running (whether it was embedded or downloaded at runtime).
   *
   * In development mode, or any other environment in which `expo-updates` is disabled, this value is
   * null.
   */
  createdAt: Date | null;
  /**
   * This will be true if the currently running update is the one embedded in the build,
   * and not one downloaded from the updates server.
   */
  isEmbeddedLaunch: boolean;
  /**
   * `expo-updates` does its very best to always launch monotonically newer versions of your app so
   * you don't need to worry about backwards compatibility when you put out an update. In very rare
   * cases, it's possible that `expo-updates` may need to fall back to the update that's embedded in
   * the app binary, even after newer updates have been downloaded and run (an "emergency launch").
   * This boolean will be `true` if the app is launching under this fallback mechanism and `false`
   * otherwise. If you are concerned about backwards compatibility of future updates to your app, you
   * can use this constant to provide special behavior for this rare case.
   */
  isEmergencyLaunch: boolean;
  /**
   * If `expo-updates` is enabled, this is the
   * [manifest](/workflow/expo-go#manifest) object for the update that's currently
   * running.
   *
   * In development mode, or any other environment in which `expo-updates` is disabled, this object is
   * empty.
   */
  manifest: Partial<Manifest>;
  /**
   * The runtime version of the current build.
   */
  runtimeVersion: string | null;
};

export type AvailableUpdateInfo = {
  /**
   * The UUID that uniquely identifies thls update. The
   * UUID is represented in its canonical string form (`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) and
   * will always use lowercase letters.
   */
  updateId: string | null;
  /**
   * A `Date` object representing the creation time of this update.
   */
  createdAt: Date | null;
  /**
   * The manifest for this update.
   */
  manifest: Partial<Manifest>;
};
/**
 * Combined updates info structure provided by UpdatesProvider.
 */
export type UpdatesInfo = {
  /**
   * Information on the currently running app
   */
  currentlyRunning: CurrentlyRunningInfo;
  /**
   * If a new available update has been found, either by using checkForUpdate(),
   * or by the [`UpdateEvent`](#updateevent) listener in [`useUpdates`](#useupdates),
   * this will contain the information for that update.
   */
  availableUpdate?: AvailableUpdateInfo;
  /**
   * If an error is returned by any of the APIs to check for, download, or launch updates,
   * the error description will appear here.
   */
  error?: Error;
  /**
   * A `Date` object representing the last time this client checked for an available update,
   * or undefined if no check has yet occurred since the app started.
   */
  lastCheckForUpdateTime?: Date;
};

/**
 * Context that includes getter and setter for updates info
 */
export type UpdatesContextType = {
  updatesInfo: UpdatesInfo;
  setUpdatesInfo: (updates: UpdatesInfo) => void;
};