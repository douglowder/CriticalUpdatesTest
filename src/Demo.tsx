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
  ExpoGoLogo,
  Spacer,
  Switch,
  SelectOptions,
} from './ui';

const longCheckInterval = 3600000; // 1 hour
const shortCheckInterval = 10000; // 10 seconds

// Change these to modify the default values for the monitor settings

const defaultCheckInterval = longCheckInterval;
const defaultAutoLaunchCritical = false;
const defaultCheckOnForeground = false;
const defaultMonitorAlwaysVisible = false;

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

  const [monitorAlwaysVisible, setMonitorAlwaysVisible] = useState(defaultMonitorAlwaysVisible);
  const [autoLaunchCritical, setAutoLaunchCritical] = useState(defaultAutoLaunchCritical);
  const [checkOnForeground, setCheckOnForeground] = useState(defaultCheckOnForeground);
  const [updateCheckInterval, setUpdateCheckInterval] = useState(defaultCheckInterval);

  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);

  return (
    <Container>
      <UpdateMonitor
        updateCheckInterval={updateCheckInterval}
        autoLaunchCritical={autoLaunchCritical}
        checkOnForeground={checkOnForeground}
        alwaysVisible={monitorAlwaysVisible}
      />
      <Spacer />
      <ExpoGoLogo />
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
            { name: 'Check at 1 hour intervals', value: `${longCheckInterval}` },
            { name: 'Check at 10 second intervals', value: `${shortCheckInterval}` },
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
