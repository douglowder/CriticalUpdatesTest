/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import React, { useState } from 'react';
import { useUpdates } from 'expo-updates';

import {
  currentlyRunningTitle,
  currentlyRunningDescription,
  errorDescription,
} from './utils/updateUtils';
import usePersistentDate from './utils/usePersistentDate';
import UpdateMonitor from './UpdateMonitor';
import {
  ActivityIndicator,
  Container,
  Section,
  Item,
  Spacer,
  Switch,
  SelectOptions,
} from './ui/theme';

const defaultCheckInterval = 3600000; // 1 hour

export default function Demo() {
  const {
    currentlyRunning,
    initializationError,
    checkError,
    downloadError,
    isChecking,
    isDownloading,
    lastCheckForUpdateTimeSinceRestart,
  } = useUpdates();
  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);

  const [monitorAlwaysVisible, setMonitorAlwaysVisible] = useState(false);

  const [autoLaunchCritical, setAutoLaunchCritical] = useState(false);
  const [checkOnForeground, setCheckOnForeground] = useState(false);
  const [updateCheckInterval, setUpdateCheckInterval] = useState(defaultCheckInterval);

  return (
    <Container>
      <UpdateMonitor
        updateCheckInterval={updateCheckInterval}
        autoLaunchCritical={autoLaunchCritical}
        checkOnForeground={checkOnForeground}
        alwaysVisible={monitorAlwaysVisible}
      />
      <Section title="Updates API Demo">
        <Item
          title={currentlyRunningTitle(currentlyRunning)}
          description={currentlyRunningDescription(currentlyRunning, lastCheckForUpdateTime)}
          descriptionNumberOfLines={6}
        />
        <Item
          title="Errors:"
          description={errorDescription(initializationError, checkError, downloadError)}
        />
        <Item title="Monitor settings" />
        <Switch
          value={monitorAlwaysVisible}
          label="Monitor always visible"
          onValueChange={() => setMonitorAlwaysVisible(!monitorAlwaysVisible)}
        />
        <Switch
          value={autoLaunchCritical}
          label="Download and launch critical updates"
          onValueChange={() => setAutoLaunchCritical(!autoLaunchCritical)}
        />
        <Switch
          value={checkOnForeground}
          label="Check when app foregrounds"
          onValueChange={() => setCheckOnForeground(!checkOnForeground)}
        />
        <SelectOptions
          options={[
            { name: 'Check at 1 hour intervals', value: `${defaultCheckInterval}` },
            { name: 'Check at 10 second intervals', value: '10000' },
          ]}
          defaultValue={`${defaultCheckInterval}`}
          onValueChange={(newValue) => setUpdateCheckInterval(parseInt(newValue, 10))}
        />
      </Section>
      <Spacer />
      <ActivityIndicator active={isChecking || isDownloading} />
    </Container>
  );
}
