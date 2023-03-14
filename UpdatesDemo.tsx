/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UpdatesProvider, useUpdates } from 'expo-updates';

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

  const handleCheckButtonPress = () => {
    checkForUpdate();
  };

  const handleDownloadButtonPress = () => {
    runUpdate();
  };

  return (
    <UpdatesProvider>
      <View style={styles.container}>
        <Text style={styles.headerText}>Critical Updates Test</Text>
        <Text>{runTypeMessage}</Text>
        <Text style={styles.updateMessageText}>
          {infoBoxText(currentlyRunning, updateAvailable)}
        </Text>
        <Button pressHandler={handleCheckButtonPress} text="Check manually for updates" />
        {showDownloadButton ? (
          <Button pressHandler={handleDownloadButtonPress} text="Download and run update" />
        ) : null}
        <StatusBar style="auto" />
      </View>
    </UpdatesProvider>
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

const infoBoxText = (currentlyRunning: any, updateAvailable: any) => {
  let currentlyRunningText = 'Running the embedded bundle\n';
  if (currentlyRunning?.id) {
    currentlyRunningText = `Running an update:\n${manifestDescription(currentlyRunning)}`;
  }
  let updateAvailableText = 'No new update available\n';
  if (updateAvailable) {
    updateAvailableText = `New update available:\n${manifestDescription(updateAvailable)}`;
  }
  return currentlyRunningText + '\n' + updateAvailableText;
};

const manifestDescription = (manifest: any) => {
  return (
    `  ID: ${manifest?.id}\n` +
    `  Created: ${manifest?.createdAt}\n` +
    `  Message: ${manifestMessage(manifest)}\n` +
    `  Critical: ${isManifestCritical(manifest)}\n`
  );
};

const manifestMessage = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.message || '';
};

const isManifestCritical = (manifest: any) => {
  return manifest?.extra?.expoClient?.extra?.critical || false;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4630EB',
  },
  buttonPressed: {
    backgroundColor: '#8630EB',
  },
  buttonText: {
    color: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  updateMessageText: {
    margin: 10,
    height: 200,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '90%',
    borderColor: '#4630EB',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 10,
  },
});
