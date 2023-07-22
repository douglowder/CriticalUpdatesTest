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
import { Container, Section, Item, Spacer, Switch } from './ui/theme';

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

  return (
    <Container>
      {/* Pass in the desired time between update checks, in ms (default 3600000 = 1 hour) */}
      <UpdateMonitor
        updateCheckInterval={3600000}
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
      </Section>
      <Spacer />
    </Container>
  );
}
