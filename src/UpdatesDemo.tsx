/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useUpdates } from 'expo-updates-provider';

import { infoBoxText, isManifestCritical } from './Utils';
import styles from './styles';

export default function UpdatesDemo() {
  const { updatesInfo, checkForUpdate, runUpdate } = useUpdates();

  const { currentlyRunning, updateAvailable } = updatesInfo;

  // If true, we show the button to download and run the update
  const showDownloadButton = updateAvailable !== undefined;

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = updatesInfo.embedded
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
