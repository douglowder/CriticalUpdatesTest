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
import { AppState, View, Pressable } from 'react-native';
import { checkForUpdate, downloadUpdate, runUpdate } from '@expo/use-updates';
import { Modal, Portal, List, Button } from 'react-native-paper';

// Use our wrapped hook with the persistent time
import { useUpdates } from './UseUpdatesWithPersistentDate';

import styles from './styles';
import {
  delay,
  isManifestCritical,
  availableUpdateDescription,
  dateDifferenceInSeconds,
} from './utils';

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
        <Portal>
          <Modal
            visible={modalShowing}
            onDismiss={() => setModalShowing(false)}
            contentContainerStyle={styles.monitorModalContainer}>
            <List.Section
              style={styles.listSection}
              title={modalTitle}
              titleStyle={styles.listSectionTitleText}>
              <List.Item
                style={styles.listItem}
                title="Description:"
                titleStyle={styles.listItemTitleText}
                description={availableUpdateDescription(availableUpdate)}
                descriptionNumberOfLines={5}
                descriptionStyle={styles.listItemDescriptionText}
              />
              <List.Item
                style={styles.listItem}
                title="Message:"
                titleStyle={styles.listItemTitleText}
                description={message}
                descriptionStyle={styles.listItemDescriptionText}
              />
            </List.Section>
            <Button
              style={styles.buttonStyle}
              mode="contained"
              onPress={() => setModalShowing(false)}>
              Dismiss
            </Button>
            {availableUpdate ? (
              <Button
                style={styles.buttonStyle}
                mode="contained"
                onPress={handleDownloadButtonPress}>
                Download and run update
              </Button>
            ) : null}
          </Modal>
        </Portal>
      ) : null}
    </View>
  );
};

export default UpdateMonitor;
