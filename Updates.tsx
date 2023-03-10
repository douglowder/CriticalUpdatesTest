import React, { createContext, useContext, useEffect, useState } from 'react';
import * as ExpoUpdates from 'expo-updates';
import type { UpdateEvent } from 'expo-updates';

/////// Types ////////

/**
 * Description of an update from its manifest
 */
export type UpdateDescription = {
  id: string;
  createdAt: string | Date;
  critical: boolean;
  message: string;
  embedded: boolean;
};

/**
 * Updates info structure for the currently running and next available updates
 */
export type UpdatesInfo = {
  currentlyRunning: UpdateDescription;
  updateAvailable?: UpdateDescription;
  error?: string;
};

/**
 * Context that includes getter and ssetter for updates info
 */
export type UpdatesContextType = {
  updates: UpdatesInfo;
  setUpdates: (updates: UpdatesInfo) => void;
};

/////// Constants ////////

/**
 * The currently running update, constructed from the manifest constant
 */
const currentlyRunning: UpdateDescription = {
  id: ExpoUpdates.manifest?.id || 'None',
  createdAt: ExpoUpdates.manifest?.createdAt || '',
  critical: ExpoUpdates.manifest?.extra?.expoClient?.extra?.critical || false,
  message: ExpoUpdates.manifest?.extra?.expoClient?.extra?.message || '',
  embedded: ExpoUpdates.isEmbeddedLaunch,
};

/////// Internal functions ////////

/**
 * Promise wrapper for setTimeout()
 * @param {delay} timeout Timeout in ms
 * @returns a Promise that resolves after the timeout has elapsed
 */
const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

/**
 * Constructs an UpdatesInfo from an UpdatesEvent
 * @param event the event passed into the expo-updates listener
 * @returns the appropriate updates info object
 */
const updatesFromEvent = (event: UpdateEvent): UpdatesInfo => {
  if (event.type === ExpoUpdates.UpdateEventType.NO_UPDATE_AVAILABLE) {
    return {
      currentlyRunning,
    };
  } else if (event.type === ExpoUpdates.UpdateEventType.UPDATE_AVAILABLE) {
    return {
      currentlyRunning,
      updateAvailable: {
        id: event?.manifest?.id || '',
        createdAt: event?.manifest?.createdAt || '',
        critical: event?.manifest?.extra?.expoClient?.extra?.critical || false,
        message: event?.manifest?.extra?.expoClient?.extra?.message || '',
        embedded: false,
      },
    };
  } else {
    // event type === ERROR
    return {
      currentlyRunning,
      error: event.message || '',
    };
  }
};

/**
 * Calls expo-updates checkForUpdateAsync and uses the passed in setter
 * to refresh the updates info context
 * @param setUpdates the setter passed in from the provider
 */
const checkAndRefreshUpdatesStructure: (
  setUpdates: (_: UpdatesInfo) => void,
) => Promise<void> = async (setUpdates) => {
  let result: UpdatesInfo;
  try {
    const checkResult = await ExpoUpdates.checkForUpdateAsync();
    if (checkResult.isAvailable) {
      result = {
        currentlyRunning,
        updateAvailable: {
          id: checkResult?.manifest?.id || '',
          createdAt: checkResult?.manifest?.createdAt || '',
          critical:
            checkResult?.manifest?.extra?.expoClient?.extra?.critical || false,
          message:
            checkResult?.manifest?.extra?.expoClient?.extra?.message || '',
          embedded: false,
        },
      };
    } else {
      result = {
        currentlyRunning,
      };
    }
  } catch (error: any) {
    result = {
      currentlyRunning,
      error: error?.message || 'Error occurred',
    };
  }
  setUpdates(result);
};

/**
 * Downloads and runs an update, if one is available
 */
const runUpdate: () => Promise<void> = async () => {
  await ExpoUpdates.fetchUpdateAsync();
  await delay(2000);
  await ExpoUpdates.reloadAsync();
};

/////// Context, provider, and hook ////////

const UpdatesContext: React.Context<UpdatesContextType> = createContext({
  updates: {
    currentlyRunning,
  },
  setUpdates: (_) => {},
});

const UpdatesProvider = (props: { children: any }) => {
  const [updates, setUpdates] = useState({
    currentlyRunning,
  });
  return (
    <UpdatesContext.Provider value={{ updates, setUpdates }}>
      {props.children}
    </UpdatesContext.Provider>
  );
};

const useUpdates = (): {
  updatesInfo: UpdatesInfo;
  checkForUpdate: () => void;
  runUpdate: () => void;
} => {
  // Get updates info value and setter from provider
  const { updates, setUpdates } = useContext(UpdatesContext);
  // Construct the function to manually check for updates
  // so applications don't need to use the setter
  const checkForUpdate: () => void = () => {
    checkAndRefreshUpdatesStructure(setUpdates);
  };
  // Set up listener for events from automatic update requests
  // that happen on startup, and use events to refresh the updates info
  // context
  ExpoUpdates.useUpdateEvents((event) => {
    setUpdates(updatesFromEvent(event));
  });
  // Return the updates info and the user facing functions
  return { updatesInfo: updates, checkForUpdate, runUpdate };
};

export { UpdatesProvider, useUpdates };
