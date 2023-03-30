/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import * as Updates from 'expo-updates';

const { useUpdates } = Updates.Provider;

import { delay, infoBoxText, isManifestCritical, logEntryText } from './Utils';
import CacheTimeout from './CacheTimeout';
import styles from './styles';
import { UpdatesProviderCallbacksType } from 'expo-updates';
export default function UpdatesDemo() {
  ////// Download update and handle download events
  const [lastEventType, setLastEventType] = useState('');
  const callbacks: UpdatesProviderCallbacksType = {
    onDownloadUpdateStart: () => setLastEventType('Download start'),
    onDownloadUpdateComplete: () => {
      setLastEventType('Download complete');
      const run = async () => {
        await delay(2000);
        runUpdate();
      };
      run();
    },
    onDownloadUpdateError: () => setLastEventType('Download error'),
  };

  // Info from the provider
  const { updatesInfo, checkForUpdate, downloadUpdate, runUpdate, readLogEntries } =
    useUpdates(callbacks);
  const {
    currentlyRunning,
    availableUpdate,
    error,
    lastCheckForUpdateTimeSinceRestart,
    logEntries,
  } = updatesInfo;

  // If true, we show the button to download and run the update
  const showDownloadButton = availableUpdate !== undefined;

  const logEntryString = logEntryText(logEntries);

  // Button press handlers
  const handleDownloadButtonPress = () => {
    downloadUpdate();
  };
  const handleCheckForUpdatePress = () => {
    checkForUpdate();
  };

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = updatesInfo.currentlyRunning.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : isManifestCritical(currentlyRunning.manifest)
    ? 'This app is running a critical update'
    : 'This app is running a normal update';

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Critical Updates Test</Text>
      <Text>{runTypeMessage}</Text>
      <Text style={styles.updateMessageText}>{`${infoBoxText(
        currentlyRunning,
        availableUpdate,
        error,
        lastCheckForUpdateTimeSinceRestart
      )}\n`}</Text>
      <CacheTimeout />
      <Text>Type of most recent event</Text>
      <Text>{lastEventType}</Text>

      <Button pressHandler={() => readLogEntries()} text="Read log entries" />
      <Button pressHandler={handleCheckForUpdatePress} text="Check manually for updates" />
      {showDownloadButton ? (
        <Button pressHandler={handleDownloadButtonPress} text="Download and run update" />
      ) : null}
      <Text style={styles.logEntryText}>{logEntryString}</Text>
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
