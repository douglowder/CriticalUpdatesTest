/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import React from 'react';
import { useUpdates } from '@expo/use-updates';

import { currentlyRunningTitle, currentlyRunningDescription } from './utils/updateUtils';
import usePersistentDate from './utils/usePersistentDate';
import UpdateMonitor from './UpdateMonitor';
import { Container, Section, Item, Spacer } from './ui/theme';

export default function Demo() {
  const { currentlyRunning, error, lastCheckForUpdateTimeSinceRestart } = useUpdates();
  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);
  return (
    <Container>
      {/* Pass in the desired time between update checks, in seconds (default 3600 = 1 hour) */}
      <UpdateMonitor updateCheckInterval={10} />
      <Spacer />
      <Section title="Critical Updates Test">
        <Item
          title={currentlyRunningTitle(currentlyRunning)}
          description={currentlyRunningDescription(currentlyRunning)}
          descriptionNumberOfLines={5}
        />
        <Item
          title="Last update check:"
          description={lastCheckForUpdateTime?.toISOString() || ''}
        />
        <Item title="Last error:" description={error?.message || ''} />
      </Section>
      <Spacer />
    </Container>
  );
}
