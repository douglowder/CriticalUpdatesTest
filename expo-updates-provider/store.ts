import { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { EventEmitter } from 'fbemitter';

import { currentlyRunning } from './constants';
import type { UpdatesInfo } from './types';
import {
  checkAndReturnNewUpdatesInfo,
  downloadAndRunUpdate,
  downloadUpdate,
  extraPropertiesFromManifest,
  runUpdate,
  updatesFromEvent,
} from './utils';

//////// Alternative: use a store for Updates shared state ////////

let store: UpdatesInfo = {
  currentlyRunning,
};

const storeEmitter = new EventEmitter();

const getStore = () => store;

const setStore = (newStore: UpdatesInfo) => {
  store = newStore;
  storeEmitter.emit('store', store);
};

const checkForUpdate = () => {
  checkAndReturnNewUpdatesInfo().then((result) => setStore(result));
};

export const useUpdatesStore = () => {
  const [localStore, setLocalStore] = useState(getStore());
  useEffect(() => {
    const subscription = storeEmitter.addListener('store', (newStore: UpdatesInfo) =>
      setLocalStore(newStore)
    );
    return () => subscription.remove();
  }, []);
  Updates.useUpdateEvents((event) => setStore(updatesFromEvent(event)));
  return {
    updatesInfo: localStore,
    checkForUpdate,
    extraPropertiesFromManifest,
    downloadAndRunUpdate,
    downloadUpdate,
    runUpdate,
  };
};
