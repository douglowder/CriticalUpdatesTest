/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import { readLogEntries } from '@expo/use-updates';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';

import { useUpdates } from './UseUpdatesWithPersistentDate';
import { infoBoxText, isManifestCritical, logEntryText } from './Utils';
import UpdateMonitor from './UpdateMonitor';
import styles from './styles';
import Button from './Button';

export default function Demo() {
  const { currentlyRunning, error, logEntries, lastCheckForUpdateTime } = useUpdates();

  const logEntryString = logEntryText(logEntries);

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? 'This app is running from built-in code'
    : isManifestCritical(currentlyRunning.manifest)
    ? 'This app is running a critical update'
    : 'This app is running a normal update';

  return (
    <SafeAreaView style={styles.container}>
      {/* Monitor that polls for updates and shows a green, yellow, or red
          button at the top right */}
      <UpdateMonitor monitorInterval={10} />
      <Text style={styles.headerText}>Critical Updates Test</Text>
      <Text>{runTypeMessage}</Text>
      <Text style={styles.updateMessageText}>{`${infoBoxText(
        currentlyRunning,
        error,
        lastCheckForUpdateTime
      )}\n`}</Text>

      <Button pressHandler={() => readLogEntries()} text="Read log entries" />
      <Text style={styles.logEntryText}>{logEntryString}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
