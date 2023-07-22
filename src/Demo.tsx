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
import { Container, Section, Item, Spacer, Switch, SelectOptions } from './ui/theme';

const defaultCheckInterval = 3600000; // 1 hour

export default function Demo() {
  const {
    currentlyRunning,
    initializationError,
    checkError,
    downloadError,
    lastCheckForUpdateTimeSinceRestart,
  } = useUpdates();
  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);
  const [autoLaunchCritical, setAutoLaunchCritical] = useState(false);
  const [checkOnForeground, setCheckOnForeground] = useState(true);
  const [monitorAlwaysVisible, setMonitorAlwaysVisible] = useState(false);
  const [updateCheckInterval, setUpdateCheckInterval] = useState(defaultCheckInterval);

  return (
    <Container>
      {/* Pass in the desired time between update checks, in ms (default 3600000 = 1 hour) */}
      <UpdateMonitor
        updateCheckInterval={updateCheckInterval}
        autoLaunchCritical={autoLaunchCritical}
        checkOnForeground={checkOnForeground}
        alwaysVisible={monitorAlwaysVisible}
      />
      <Spacer />
      <Section title="Critical Updates Test">
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
          value={autoLaunchCritical}
          label="Auto download and launch critical updates"
          onValueChange={() => setAutoLaunchCritical(!autoLaunchCritical)}
        />
        <Switch
          value={checkOnForeground}
          label="Check for updates when app foregrounds"
          onValueChange={() => setCheckOnForeground(!checkOnForeground)}
        />
        <Switch
          value={monitorAlwaysVisible}
          label="Monitor always visible"
          onValueChange={() => setMonitorAlwaysVisible(!monitorAlwaysVisible)}
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
    </Container>
  );
}
