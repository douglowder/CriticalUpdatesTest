import React, { createContext, useContext, useState } from 'react';
import * as Updates from 'expo-updates';
import type {
  UpdatesInfo,
  UpdatesContextType,
  UpdatesProviderDownloadEvent,
} from './UpdatesProvider.types';
import type { Manifest, UpdateEvent } from 'expo-updates';
import { UpdatesProviderDownloadEventType, currentlyRunning } from './UpdatesProvider.constants';

/////// Internal functions ////////// Promise wrapper for setTimeout()
const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

// Constructs the availableUpdate from the update manifest
export const availableUpdateFromManifest = (manifest: Partial<Manifest> | undefined) => {
  return manifest
    ? {
        updateId: manifest?.id ? manifest?.id : null,
        createdAt: manifest?.createdAt ? new Date(manifest?.createdAt) : null,
        manifest: manifest,
      }
    : undefined;
};

// Constructs the UpdatesInfo from an event
export const updatesFromEvent = (event: UpdateEvent): UpdatesInfo => {
  const lastCheckForUpdateTime = new Date();
  if (event.type === Updates.UpdateEventType.NO_UPDATE_AVAILABLE) {
    return {
      currentlyRunning,
      lastCheckForUpdateTime,
    };
  } else if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
    return {
      currentlyRunning,
      availableUpdate: availableUpdateFromManifest(event.manifest),
      lastCheckForUpdateTime,
    };
  } else {
    // event type === ERROR
    return {
      currentlyRunning,
      error: new Error(event.message),
      lastCheckForUpdateTime,
    };
  }
};

// Implementation of checkForUpdate
export const checkAndReturnNewUpdatesInfo: () => Promise<UpdatesInfo> = async () => {
  let result: UpdatesInfo;
  try {
    const checkResult = await Updates.checkForUpdateAsync();
    const lastCheckForUpdateTime = new Date();
    if (checkResult.isAvailable) {
      result = {
        currentlyRunning,
        availableUpdate: availableUpdateFromManifest(checkResult.manifest),
        lastCheckForUpdateTime,
      };
    } else {
      result = {
        currentlyRunning,
        lastCheckForUpdateTime,
      };
    }
  } catch (error: any) {
    const lastCheckForUpdateTime = new Date();
    result = {
      currentlyRunning,
      error: error?.message || 'Error occurred',
      lastCheckForUpdateTime,
    };
  }
  return result;
};

///////////// Exported functions /////////////

/**
 * Extracts any custom properties in the `extra` part of the Expo config.  The `eas` property
 * is excluded (reserved for Expo internal use).
 * @param manifest The manifest to check
 * @returns Object containing any properties found. If no extra properties found, returns an empty object.
 */
const extraPropertiesFromManifest: (manifest: Partial<Manifest>) => {
  [key: string]: any;
} = (manifest) => {
  const result: { [key: string]: any } = {};
  for (const key in manifest?.extra?.expoClient?.extra) {
    if (key !== 'eas') {
      result[key] = manifest?.extra?.expoClient?.extra[key];
    }
  }
  return result;
};

/**
 * Downloads and runs an update, if one is available. Provided to application code
 * from the [`useUpdates`](#useupdates) hook.
 */
const downloadAndRunUpdate: () => Promise<void> = async () => {
  await Updates.fetchUpdateAsync();
  await delay(2000);
  await Updates.reloadAsync();
};

/**
 * Downloads an update, if one is available, using `Updates.fetchUpdateAsync()`.
 * @param downloadHandler Optional handler. If present, the handler will be called when download starts, and again when download completes (successfully or not).
 */
const downloadUpdate: (downloadHandler?: (event: UpdatesProviderDownloadEvent) => void) => void = (
  downloadHandler
) => {
  downloadHandler &&
    downloadHandler({
      type: UpdatesProviderDownloadEventType.DOWNLOAD_START,
    });
  Updates.fetchUpdateAsync()
    .then(() => {
      downloadHandler &&
        downloadHandler({
          type: UpdatesProviderDownloadEventType.DOWNLOAD_COMPLETE,
        });
    })
    .catch((error: Error) => {
      downloadHandler &&
        downloadHandler({
          type: UpdatesProviderDownloadEventType.DOWNLOAD_ERROR,
          error,
        });
    });
};

/**
 * Runs an update by calling `Updates.reloadAsync()`. This should not be called unless there is an available update
 * that has already been successfully downloaded using [`downloadUpdate()`](#downloadupdate).
 */
const runUpdate = () => {
  Updates.reloadAsync();
};

/////// Provider and hook ///////////

// The context provided to the app
const UpdatesContext: React.Context<UpdatesContextType> = createContext({
  updatesInfo: {
    currentlyRunning,
  },
  setUpdatesInfo: (_) => {},
});

/**
 * Calls `Updates.checkForUpdateAsync()` and uses the passed in setter
 * to refresh the [`UpdatesInfo`](#updatesinfo). Provided to application code from
 * the [`useUpdates`](#useupdates) hook.
 */
let checkForUpdate = () => {
  // This stub is replaced with the real implementation in the hook
};

/**
 * Provides the Updates React context. Includes an [`UpdateEvent`](#updateevent) listener
 * that will set the context automatically, if automatic updates are enabled and a new
 * update is available. This is required if application code uses the [`useUpdates`](#useupdates) hook.
 * @param props Context will be provided to `props.children`
 * @returns the provider.
 */
const UpdatesProvider = (props: { children: any }) => {
  const [updatesInfo, setUpdatesInfo] = useState({
    currentlyRunning,
  });
  // Set up listener for events from automatic update requests
  // that happen on startup, and use events to refresh the updates info
  // context
  Updates.useUpdateEvents((event) => {
    setUpdatesInfo(updatesFromEvent(event));
  });
  return (
    <UpdatesContext.Provider value={{ updatesInfo, setUpdatesInfo }}>
      {props.children}
    </UpdatesContext.Provider>
  );
};

/**
 * Hook that obtains the Updates info structure and functions. Requires that application code be inside an [`UpdatesProvider`](#updatesprovider).
 * @returns the [`UpdatesInfo`](#updatesinfo) structure, the [`checkForUpdate`](#checkforupdate) function, and the [`runUpdate`](#runupdate) function.
 */
const useUpdates = (): {
  updatesInfo: UpdatesInfo;
  checkForUpdate: typeof checkForUpdate;
  extraPropertiesFromManifest: typeof extraPropertiesFromManifest;
  downloadAndRunUpdate: typeof downloadAndRunUpdate;
  downloadUpdate: typeof downloadUpdate;
  runUpdate: typeof runUpdate;
} => {
  // Get updates info value and setter from provider
  const { updatesInfo, setUpdatesInfo } = useContext(UpdatesContext);

  // Create the implementation of checkForUpdate()
  checkForUpdate = () => {
    checkAndReturnNewUpdatesInfo().then((result) => setUpdatesInfo(result));
  };
  // Return the updates info and the user facing functions
  return {
    updatesInfo,
    checkForUpdate,
    extraPropertiesFromManifest,
    downloadAndRunUpdate,
    downloadUpdate,
    runUpdate,
  };
};

export {
  UpdatesProvider,
  useUpdates,
  checkForUpdate,
  extraPropertiesFromManifest,
  downloadAndRunUpdate,
  downloadUpdate,
  runUpdate,
};