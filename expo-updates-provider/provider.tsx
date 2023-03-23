import React, { createContext, useContext, useState } from 'react';
import * as Updates from 'expo-updates';

import { currentlyRunning } from './constants';
import type { UpdatesInfo, UpdatesContextType } from './types';
import {
  checkAndReturnNewUpdatesInfo,
  downloadAndRunUpdate,
  downloadUpdate,
  extraPropertiesFromManifest,
  runUpdate,
  updatesFromEvent,
} from './utils';

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
