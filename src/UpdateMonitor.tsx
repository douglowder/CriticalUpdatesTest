/**
 * Monitor component that polls EAS Update server for an available update
 * If no update, we are green
 * If a normal update is available, we turn yellow
 * If a critical update is available, we turn red
 *
 * Click on the monitor to open a modal that allows you to see information
 * on the update, and download and run it
 */
import React from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { useUpdates, checkForUpdate, downloadUpdate, runUpdate } from '@expo/use-updates';

import styles from './styles';
import { delay, isManifestCritical, availableUpdateDescription } from './Utils';
import Button from './Button';

const UpdateMonitor: (props?: {
  monitorInterval?: number;
  setLastCheckForUpdateTime?: (updateTime: Date) => void;
}) => JSX.Element = (props = { monitorInterval: 3600000 }) => {
  const [modalShowing, setModalShowing] = React.useState(false);
  ////// Download update and handle download events
  const [lastEventType, setLastEventType] = React.useState('');

  const {
    availableUpdate,
    isUpdateAvailable,
    isUpdatePending,
    lastCheckForUpdateTimeSinceRestart,
  } = useUpdates();

  React.useEffect(() => {
    if (isUpdatePending) {
      setLastEventType('Download complete');
      const run = async () => {
        await delay(2000);
        runUpdate();
      };
      run();
    }
  }, [isUpdatePending]);

  const handleDownloadButtonPress = () => downloadUpdate();
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

  React.useEffect(() => {
    const interval = setInterval(() => {
      checkForUpdate();
    }, props.monitorInterval);
    return () => clearInterval(interval);
  }, [props.monitorInterval]);

  React.useEffect(() => {
    if (lastCheckForUpdateTimeSinceRestart) {
      props?.setLastCheckForUpdateTime &&
        props?.setLastCheckForUpdateTime(lastCheckForUpdateTimeSinceRestart);
    }
  }, [props, lastCheckForUpdateTimeSinceRestart]);

  return (
    <View style={styles.monitorContainer}>
      <View style={flexStyle} />
      <Pressable onPress={() => setModalShowing(true)} style={monitorStyle} />
      {modalShowing ? (
        <Modal animationType="slide" presentationStyle="formSheet">
          <View style={styles.monitorModalContainer}>
            <Text style={styles.monitorModalTitle}>{modalTitle}</Text>
            <Text>{availableUpdateDescription(availableUpdate)}</Text>
            <Text>{lastEventType}</Text>
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
