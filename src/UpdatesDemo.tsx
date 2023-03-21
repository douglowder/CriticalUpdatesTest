/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useUpdates } from '../expo-updates-provider';

import {
  delay,
  getCacheTimeoutSetting,
  setCacheTimeoutSetting,
  removeCacheTimeoutSetting,
  infoBoxText,
  isManifestCritical,
} from './Utils';
import styles from './styles';
import {
  UpdatesProviderDownloadEvent,
  UpdatesProviderDownloadEventType,
} from '../expo-updates-provider/UpdatesProvider.types';

export default function UpdatesDemo() {
  // Info from the provider
  const { updatesInfo, checkForUpdate, downloadUpdate, runUpdate } = useUpdates();
  const { currentlyRunning, availableUpdate } = updatesInfo;
  // If true, we show the button to download and run the update
  const showDownloadButton = availableUpdate !== undefined;

  // Download handling
  const [updateStatus, setUpdateStatus] = useState('Not started');

  const downloadHandler = (downloadEvent: UpdatesProviderDownloadEvent) => {
    switch (downloadEvent.type) {
      case UpdatesProviderDownloadEventType.DOWNLOAD_START:
        setUpdateStatus('Started');
        break;
      case UpdatesProviderDownloadEventType.DOWNLOAD_COMPLETE:
        setUpdateStatus('Complete');
        break;
      case UpdatesProviderDownloadEventType.DOWNLOAD_ERROR:
        setUpdateStatus('Error');
        console.warn(`${downloadEvent.error}`);
    }
  };

  const getAndRunUpdate = () => {
    downloadUpdate(downloadHandler);
  };

  useEffect(() => {
    const run = async () => {
      await delay(2000);
      runUpdate();
    };
    if (updateStatus === 'Complete') {
      run();
    }
  }, [updateStatus, runUpdate]);

  // Cache timeout handling
  const [cacheTimeoutValue, setCacheTimeoutValue] = useState<number | null>(null);

  const getCacheTimeoutText = () => {
    if (cacheTimeoutValue === -1) {
      return '0';
    }
    if (Number.isNaN(cacheTimeoutValue)) {
      return '0';
    }
    return `${cacheTimeoutValue}`;
  };

  const setCacheTimeoutText = (timeout: string) => {
    let value = 0;
    try {
      const newTimeout = parseInt(timeout, 10);
      if (newTimeout >= 0 && newTimeout <= 5000) {
        value = newTimeout;
      }
    } catch (_: any) {}
    setCacheTimeoutSetting(value);
    setCacheTimeoutValue(value);
  };

  const setCacheTimeout3000 = () => {
    setCacheTimeoutSetting(3000);
    setCacheTimeoutValue(3000);
  };

  const removeCacheTimeout = () => {
    removeCacheTimeoutSetting();
    setCacheTimeoutValue(null);
  };

  useEffect(() => {
    if (cacheTimeoutValue === null) {
      setCacheTimeoutValue(getCacheTimeoutSetting());
    }
  }, [cacheTimeoutValue]);
  // Show whether or not we are running embedded code or an update
  const runTypeMessage = updatesInfo.currentlyRunning.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : isManifestCritical(currentlyRunning)
    ? 'This app is running a critical update'
    : 'This app is running a normal update';

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Critical Updates Test</Text>
      <Text>{runTypeMessage}</Text>
      <Text style={styles.updateMessageText}>{`Download status: ${updateStatus}\n\n${infoBoxText(
        currentlyRunning,
        availableUpdate
      )}\n`}</Text>
      <Text>Cache timeout</Text>
      <TextInput
        aria-label="Cache timeout"
        value={getCacheTimeoutText()}
        onChangeText={(text) => setCacheTimeoutText(text)}
      />
      <Button pressHandler={checkForUpdate} text="Check manually for updates" />
      {showDownloadButton ? (
        <Button pressHandler={getAndRunUpdate} text="Download and run update" />
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}

function Button(props: { text: string; pressHandler: () => void }) {
  const { text, pressHandler } = props;
  return (
    <Pressable
      style={({ pressed }) => {
        return pressed ? [styles.button, styles.buttonPressed] : styles.button;
      }}
      onPress={pressHandler}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}
