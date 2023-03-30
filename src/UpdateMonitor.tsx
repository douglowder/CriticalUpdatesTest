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
import * as Updates from 'expo-updates';

import styles from './styles';
import { delay, isManifestCritical, manifestDescription } from './Utils';
import Button from './Button';

const { useUpdates } = Updates.Provider;

const UpdateMonitor: (props?: { monitorInterval?: number }) => JSX.Element = (
  props = { monitorInterval: 10000 }
) => {
  const [modalShowing, setModalShowing] = React.useState(false);
  ////// Download update and handle download events
  const [lastEventType, setLastEventType] = React.useState('');
  const callbacks: Updates.UpdatesProviderCallbacksType = {
    onDownloadUpdateStart: () => setLastEventType('Download start'),
    onDownloadUpdateComplete: () => {
      setLastEventType('Download complete');
      const run = async () => {
        await delay(2000);
        runUpdate();
      };
      run();
    },
    onDownloadUpdateError: () => setLastEventType('Download error'),
  };

  const { updatesInfo, checkForUpdate, downloadUpdate, runUpdate } = useUpdates(callbacks);
  const { availableUpdate } = updatesInfo;

  const handleDownloadButtonPress = () => downloadUpdate();
  const monitorStyle = availableUpdate
    ? isManifestCritical(availableUpdate?.manifest)
      ? [styles.monitor, styles.monitorCritical]
      : [styles.monitor, styles.monitorUpdate]
    : styles.monitor;

  const modalText = availableUpdate
    ? isManifestCritical(availableUpdate?.manifest)
      ? 'Critical update available'
      : 'Update available'
    : 'No update available';

  const flexStyle = { flex: 1 };

  React.useEffect(() => {
    const interval = setInterval(() => checkForUpdate(), props.monitorInterval);
    return () => clearInterval(interval);
  }, [checkForUpdate, props.monitorInterval]);

  return (
    <View style={styles.monitorContainer}>
      <View style={flexStyle} />
      <Pressable onPress={() => setModalShowing(true)} style={monitorStyle} />
      {modalShowing ? (
        <Modal>
          <View style={styles.container}>
            <Text>{modalText}</Text>
            <Text style={styles.updateMessageText}>
              {manifestDescription(availableUpdate?.manifest)}
            </Text>
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
