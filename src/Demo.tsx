/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import React from 'react';
import { useUpdates } from 'expo-updates';

import {
  currentlyRunningTitle,
  currentlyRunningDescription,
  errorDescription,
} from './utils/updateUtils';
import usePersistentDate from './utils/usePersistentDate';
import UpdateMonitor from './UpdateMonitor';
import { Container, Section, Item, Spacer } from './ui/theme';

export default function Demo() {
  const {
    currentlyRunning,
    initializationError,
    checkError,
    downloadError,
    lastCheckForUpdateTimeSinceRestart,
  } = useUpdates();
  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);
  return (
    <Container>
      {/* Pass in the desired time between update checks, in ms (default 3600000 = 1 hour) */}
      <UpdateMonitor
        updateCheckInterval={3600000}
        autoLaunchCritical={false}
        checkOnForeground={true}
      />
      <Spacer />
      <Section title="Critical Updates Test">
        <Item
          title={currentlyRunningTitle(currentlyRunning)}
          description={currentlyRunningDescription(currentlyRunning)}
          descriptionNumberOfLines={8}
        />
        <Item
          title="Errors:"
          description={errorDescription(initializationError, checkError, downloadError)}
        />
        <Item
          title="Last update check:"
          description={lastCheckForUpdateTime?.toISOString() || ''}
        />
      </Section>
      <Spacer />
    </Container>
  );
}
