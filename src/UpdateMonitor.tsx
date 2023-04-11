/**
 * Monitor component that polls EAS Update server for an available update
 * If no update, we are green
 * If a normal update is available, we turn yellow
 * If a critical update is available, we turn red
 *
 * Click on the monitor to open a modal that allows you to see information
 * on the update, and download and run it
 */
import React, { useEffect, useRef } from 'react';
import { AppState, View, Text, Pressable, Modal } from 'react-native';
import { checkForUpdate, downloadUpdate, runUpdate } from '@expo/use-updates';

// Use our wrapped hook with the persistent time
import { useUpdates } from './UseUpdatesWithPersistentDate';

import styles from './styles';
import {
  delay,
  isManifestCritical,
  availableUpdateDescription,
  dateDifferenceInSeconds,
} from './Utils';
import Button from './Button';

const UpdateMonitor: (props?: { monitorInterval?: number }) => JSX.Element = (
  props = { monitorInterval: 3600 }
) => {
  const { availableUpdate, isUpdateAvailable, isUpdatePending, lastCheckForUpdateTime } =
    useUpdates();

  ////////////// App state section
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground, see if it is time to check for an update
        const now = new Date();
        if (
          dateDifferenceInSeconds(now, lastCheckForUpdateTime) > (props.monitorInterval || 3600000)
        ) {
          checkForUpdate();
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [lastCheckForUpdateTime, props.monitorInterval]);

  ///////////////////////////////////////////

  // Run the update if download completes successfully
  useEffect(() => {
    if (isUpdatePending) {
      setMessage('Download complete');
      const run = async () => {
        await delay(2000);
        runUpdate();
      };
      run();
    }
  }, [isUpdatePending]);

  const handleDownloadButtonPress = () => downloadUpdate();

  // Appearance and content

  const [modalShowing, setModalShowing] = React.useState(false);

  const [message, setMessage] = React.useState('');

  const monitorStyle = isUpdateAvailable
    ? isManifestCritical(availableUpdate?.manifest)
      ? [styles.monitor, styles.monitorCritical]
      : [styles.monitor, styles.monitorUpdate]
    : styles.monitor;

  const modalTitle = isUpdateAvailable
    ? isManifestCritical(availableUpdate?.manifest)
      ? 'Critical update available'
      : 'Update available'
    : 'No update available';

  const flexStyle = { flex: 1 };

  return (
    <View style={styles.monitorContainer}>
      <View style={flexStyle} />
      <Pressable onPress={() => setModalShowing(true)} style={monitorStyle} />
      {modalShowing ? (
        <Modal animationType="slide" presentationStyle="formSheet">
          <View style={styles.monitorModalContainer}>
            <Text style={styles.monitorModalTitle}>{modalTitle}</Text>
            <Text>{availableUpdateDescription(availableUpdate)}</Text>
            <Text>{message}</Text>
            <Button pressHandler={() => setModalShowing(false)} text="Dismiss" />
            {availableUpdate ? (
              <Button pressHandler={handleDownloadButtonPress} text="Download and run update" />
            ) : null}
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

export default UpdateMonitor;
