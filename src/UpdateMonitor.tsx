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
import { useUpdates, checkForUpdate, downloadUpdate, runUpdate } from '@expo/use-updates';

import useAppState from './utils/useAppState';
import useInterval from './utils/useInterval';
import usePersistentDate from './utils/usePersistentDate';
import { delay, isManifestCritical, availableUpdateDescription } from './utils/updateUtils';
import { dateDifferenceInSeconds } from './utils/dateUtils';
import { Modal, Section, Item, Button, Monitor } from './ui/theme';

const UpdateMonitor: (props?: { updateCheckInterval?: number }) => JSX.Element = (
  props = { updateCheckInterval: 3600 }
) => {
  const {
    availableUpdate,
    isUpdateAvailable,
    isUpdatePending,
    lastCheckForUpdateTimeSinceRestart,
  } = useUpdates();

  const isUpdateCritical = availableUpdate ? isManifestCritical(availableUpdate.manifest) : false;

  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);

  const monitorInterval = props.updateCheckInterval || 3600;

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

  const modalTitle = isUpdateAvailable
    ? `${isUpdateCritical ? 'Critical ' : ''}Update ${isUpdatePending ? 'Downloaded' : 'Available'}`
    : 'No Update Available';

  return (
    <Monitor
      isUpdateCritical={isUpdateCritical}
      isUpdateAvailable={isUpdateAvailable}
      onPress={() => setModalShowing(true)}>
      {modalShowing ? (
        <Modal visible={modalShowing} onDismiss={() => setModalShowing(false)}>
          <Section title={modalTitle}>
            <Item
              title="Description:"
              description={availableUpdateDescription(availableUpdate)}
              descriptionNumberOfLines={5}
            />
          </Section>
          <Button onPress={() => setModalShowing(false)}>Dismiss</Button>
          {availableUpdate ? (
            <Button onPress={handleDownloadButtonPress}>Download and run update</Button>
          ) : null}
        </Modal>
      ) : null}
    </Monitor>
  );
};

export default UpdateMonitor;
