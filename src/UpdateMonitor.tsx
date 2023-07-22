/**
 * Monitor component that polls EAS Update server for an available update
 * If no update, we are green
 * If a normal update is available, we turn yellow
 * If a critical update is available, we turn red
 *
 * Click on the monitor to open a modal that allows you to see information
 * on the update, and download and run it
 *
 * The `updateCheckInterval` prop is the number of milliseconds to wait after the previous check for updates
 * before calling `checkForUpdate()` again. Default value is 3600000 (1 hour).
 *
 * If `checkOnForeground` is true, the monitor will check for an update whenever the app comes back to
 * foreground. Defaults to false.
 *
 * If `autoLaunchCritical` is true, critical updates will be downloaded and launched immediately. Defaults to false.
 */
import * as Updates from 'expo-updates';
import React, { useEffect } from 'react';

const { useUpdates, checkForUpdateAsync, fetchUpdateAsync, reloadAsync } = Updates;

import useAppState from './utils/useAppState';
import useInterval from './utils/useInterval';
import usePersistentDate from './utils/usePersistentDate';
import {
  isManifestCritical,
  availableUpdateDescription,
  errorDescription,
} from './utils/updateUtils';
import { dateDifferenceInMilliSeconds } from './utils/dateUtils';
import { Modal, Section, Item, Button, Monitor } from './ui/theme';

const defaultUpdateCheckInterval = 3600000; // 1 hour
const defaultCheckOnForeground = false;
const defaultAutoLaunchCritical = false;
const defaultAlwaysVisible = false;

const UpdateMonitor: (props?: {
  updateCheckInterval?: number;
  checkOnForeground?: boolean;
  autoLaunchCritical?: boolean;
  alwaysVisible?: boolean;
}) => JSX.Element = (props) => {
  const {
    availableUpdate,
    isUpdateAvailable,
    isUpdatePending,
    lastCheckForUpdateTimeSinceRestart,
    initializationError,
    checkError,
    downloadError,
  } = useUpdates();

  const isUpdateCritical = availableUpdate ? isManifestCritical(availableUpdate.manifest) : false;

  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);

  const monitorInterval = props?.updateCheckInterval ?? defaultUpdateCheckInterval;
  const checkOnForeground = props?.checkOnForeground ?? defaultCheckOnForeground;
  const autoLaunchCritical = props?.autoLaunchCritical ?? defaultAutoLaunchCritical;
  const alwaysVisible = props?.alwaysVisible ?? defaultAlwaysVisible;

  const needsUpdateCheck = () =>
    dateDifferenceInMilliSeconds(new Date(), lastCheckForUpdateTime) > monitorInterval;

  // Check if needed when app becomes active
  const appStateHandler = (activating: boolean) => {
    if (activating) {
      checkForUpdateAsync().catch((_error) => {});
    }
  };
  const appState = useAppState(checkOnForeground ? appStateHandler : undefined);

  // Wake up periodically while app is active to see if we need to do another check
  // This interval should be smaller than monitorInterval
  useInterval(() => {
    if (appState === 'active' && needsUpdateCheck()) {
      checkForUpdateAsync().catch((_error) => {});
    }
  }, monitorInterval / 4);

  // If update is critical, download it
  useEffect(() => {
    if (isUpdateCritical && !isUpdatePending && autoLaunchCritical) {
      fetchUpdateAsync().catch((_error) => {});
    }
  }, [isUpdateCritical, isUpdatePending, autoLaunchCritical]);

  // Run the downloaded update if download completes successfully and it is critical
  useEffect(() => {
    if (isUpdatePending && isUpdateCritical && autoLaunchCritical) {
      setTimeout(() => reloadAsync(), 2000);
    }
  }, [isUpdateCritical, isUpdatePending, autoLaunchCritical]);

  const handleDownloadButtonPress = () => fetchUpdateAsync();

  const handleRunButtonPress = () => setTimeout(() => reloadAsync(), 500);

  // Appearance and content

  const [modalShowing, setModalShowing] = React.useState(false);

  const modalTitle = isUpdateAvailable
    ? `${isUpdateCritical ? 'Critical ' : ''}Update ${isUpdatePending ? 'Downloaded' : 'Available'}`
    : 'No Update Available';

  return (
    <Monitor
      visible={isUpdateAvailable || alwaysVisible}
      type={isUpdateCritical ? 'warning' : isUpdateAvailable ? 'info' : undefined}
      label={modalTitle}
      onPress={() => setModalShowing(true)}>
      {modalShowing ? (
        <Modal visible={modalShowing} onDismiss={() => setModalShowing(false)}>
          <Section title={modalTitle}>
            <Item
              title="Description:"
              description={
                availableUpdateDescription(availableUpdate) +
                errorDescription(initializationError, checkError, downloadError)
              }
              descriptionNumberOfLines={5}
            />
          </Section>
          <Button onPress={() => setModalShowing(false)}>Dismiss</Button>
          {isUpdateAvailable ? (
            <Button onPress={handleDownloadButtonPress}>Download update</Button>
          ) : null}
          {isUpdatePending ? <Button onPress={handleRunButtonPress}>Run update</Button> : null}
        </Modal>
      ) : null}
    </Monitor>
  );
};

export default UpdateMonitor;
