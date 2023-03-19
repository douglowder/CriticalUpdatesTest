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

import { cacheTimeout, setCacheTimeout, infoBoxText, isManifestCritical } from './Utils';
import styles from './styles';

export default function UpdatesDemo() {
  const { updatesInfo, checkForUpdate, runUpdate } = useUpdates();

  const { currentlyRunning, availableUpdate } = updatesInfo;

  // If true, we show the button to download and run the update
  const showDownloadButton = availableUpdate !== undefined;

  const setCacheTimeout3000 = () => {
    setCacheTimeout(3000).catch((error) => console.warn(error));
  };

  const [cacheTimeoutValue, setCacheTimeoutValue] = useState<number | null>(null);
  useEffect(() => {
    cacheTimeout().then((timeout) => {
      if (cacheTimeoutValue === null) {
        setCacheTimeoutValue(timeout);
      }
    });
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
      <Text style={styles.updateMessageText}>{`${infoBoxText(
        currentlyRunning,
        availableUpdate
      )}\nCache timeout = ${cacheTimeoutValue}`}</Text>
      <Button pressHandler={checkForUpdate} text="Check manually for updates" />
      {showDownloadButton ? (
        <Button pressHandler={runUpdate} text="Download and run update" />
      ) : null}
      <Button pressHandler={setCacheTimeout3000} text="Set cache timeout to 3000" />
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
