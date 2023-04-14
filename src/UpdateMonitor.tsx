/**
 * Monitor component that polls EAS Update server for an available update
 * If no update, we are green
 * If a normal update is available, we turn yellow
 * If a critical update is available, we turn red
 *
 * Click on the monitor to open a modal that allows you to see information
 * on the update, and download and run it
 */
import React, { useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { useUpdates, checkForUpdate, downloadUpdate, runUpdate } from '@expo/use-updates';
import { Modal, Portal, List, Button, useTheme } from 'react-native-paper';

import useAppState from './utils/useAppState';
import useInterval from './utils/useInterval';
import usePersistentDate from './utils/usePersistentDate';
import { delay, isManifestCritical, availableUpdateDescription } from './utils/updateUtils';
import { dateDifferenceInSeconds } from './utils/dateUtils';
import type { DemoTheme } from './ui/theme';

const UpdateMonitor: (props?: { monitorInterval?: number }) => JSX.Element = (
  props = { monitorInterval: 3600 }
) => {
  const { styles } = useTheme<DemoTheme>();

  const {
    availableUpdate,
    isUpdateAvailable,
    isUpdatePending,
    lastCheckForUpdateTimeSinceRestart,
  } = useUpdates();

  const isUpdateCritical = availableUpdate ? isManifestCritical(availableUpdate.manifest) : false;

  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);

  const monitorInterval = props.monitorInterval || 3600;

  const needsUpdateCheck = () =>
    dateDifferenceInSeconds(new Date(), lastCheckForUpdateTime) > monitorInterval;

  // Check if needed when app becomes active
  const appState = useAppState((activating) => {
    if (activating && needsUpdateCheck()) {
      checkForUpdate();
    }
  });

  // Check every 10 seconds while app is active
  useInterval(() => {
    if (appState === 'active' && needsUpdateCheck()) {
      checkForUpdate();
    }
  }, 10);

  // If update is critical, download it (the next hook will run it)
  useEffect(() => {
    if (isUpdateCritical && !isUpdatePending) {
      downloadUpdate();
    }
  }, [isUpdateCritical, isUpdatePending]);

  // Run the downloaded update if download completes successfully
  useEffect(() => {
    if (isUpdatePending) {
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

  const monitorStyle = isUpdateAvailable
    ? isUpdateCritical
      ? [styles.monitor, styles.monitorCritical]
      : [styles.monitor, styles.monitorUpdate]
    : styles.monitor;

  const modalTitle = isUpdateAvailable
    ? `${isUpdateCritical ? 'Critical ' : ''}Update ${isUpdatePending ? 'Downloaded' : 'Available'}`
    : 'No Update Available';

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
