/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useUpdates } from '../expo-updates-provider';

import { delay, infoBoxText, isManifestCritical } from './Utils';
import CacheTimeout from './CacheTimeout';
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

  ////// Download update and handle download events
  const [updateDownloadStatus, setUpdateDownloadStatus] = useState('Not started');
  const downloadHandler = (downloadEvent: UpdatesProviderDownloadEvent) => {
    switch (downloadEvent.type) {
      case UpdatesProviderDownloadEventType.DOWNLOAD_START:
        setUpdateDownloadStatus('Started');
        break;
      case UpdatesProviderDownloadEventType.DOWNLOAD_COMPLETE:
        setUpdateDownloadStatus('Complete');
        break;
      case UpdatesProviderDownloadEventType.DOWNLOAD_ERROR:
        setUpdateDownloadStatus('Error');
        console.warn(`${downloadEvent.error}`);
    }
  };
  useEffect(() => {
    const run = async () => {
      await delay(2000);
      runUpdate();
    };
    if (updateDownloadStatus === 'Complete') {
      run();
    }
  }, [updateDownloadStatus, runUpdate]);

  // Button press handlers
  const handleDownloadButtonPress = () => {
    downloadUpdate(downloadHandler);
  };
  const handleCheckForUpdatePress = () => {
    checkForUpdate();
  };

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
      <Text style={styles.updateMessageText}>{`${infoBoxText(
        currentlyRunning,
        availableUpdate
      )}\n`}</Text>
      <CacheTimeout />
      <Text>Download status</Text>
      <Text>{updateDownloadStatus}</Text>
      <Button pressHandler={handleCheckForUpdatePress} text="Check manually for updates" />
      {showDownloadButton ? (
        <Button pressHandler={handleDownloadButtonPress} text="Download and run update" />
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
