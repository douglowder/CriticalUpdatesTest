/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  isEmbeddedLaunch,
  manifest,
  reloadAsync,
  useUpdateEvents,
  UpdateEventType,
} from 'expo-updates';
import type { Manifest, UpdateEvent } from 'expo-updates';
import { delay, infoBoxText, isManifestCritical } from './Utils';
import styles from './styles';

export default function UpdatesDemo() {
  const [updateAvailable, setUpdateAvailable] = useState<Manifest | undefined>(undefined);
  const currentlyRunning = manifest;

  /**
   * Async function to manually check for an available update from EAS.
   */
  const checkManuallyForUpdateAsync = async () => {
    const checkResult = await checkForUpdateAsync();
    if (checkResult.isAvailable) {
      setUpdateAvailable(checkResult.manifest);
    } else {
      setUpdateAvailable(undefined);
    }
  };

  /**
   * Async function to fetch and load the most recent update from EAS.
   */
  const downloadAndRunUpdateAsync = async () => {
    await fetchUpdateAsync();
    await delay(2000);
    await reloadAsync();
  };

  const checkForUpdate = () => {
    checkManuallyForUpdateAsync().catch((error) =>
      console.warn(`Error in checkForUpdate: ${error}`)
    );
  };

  const runUpdate = () => {
    downloadAndRunUpdateAsync().catch((error) => {
      console.warn(`Error in runUpdate: ${error}`);
    });
  };

  /**
   * Sample UpdateEvent listener that handles all three event types.
   * These events occur during app startup, when expo-updates native code
   * automatically checks for available updates from EAS.
   * @param {} event The event to handle
   */
  const eventListener = (event: UpdateEvent) => {
    if (event.type === UpdateEventType.ERROR) {
      console.warn(`Error event: ${event.message}`);
    } else if (event.type === UpdateEventType.NO_UPDATE_AVAILABLE) {
      setUpdateAvailable(undefined);
    } else if (event.type === UpdateEventType.UPDATE_AVAILABLE) {
      setUpdateAvailable(event?.manifest);
    }
  };
  useUpdateEvents(eventListener);

  // If true, we show the button to download and run the update
  const showDownloadButton = updateAvailable !== undefined;

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : isManifestCritical(currentlyRunning)
    ? 'This app is running a critical update'
    : 'This app is running a normal update';

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Critical Updates Test</Text>
      <Text>{runTypeMessage}</Text>
      <Text style={styles.updateMessageText}>{infoBoxText(currentlyRunning, updateAvailable)}</Text>
      <Button pressHandler={checkForUpdate} text="Check manually for updates" />
      {showDownloadButton ? (
        <Button pressHandler={runUpdate} text="Download and run update" />
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
