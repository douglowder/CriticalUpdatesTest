/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import React from 'react';
import { List, useTheme } from 'react-native-paper';
import { SafeAreaView, View } from 'react-native';
import { useUpdates } from '@expo/use-updates';

import { currentlyRunningTitle, currentlyRunningDescription } from './utils/updateUtils';
import usePersistentDate from './utils/usePersistentDate';
import UpdateMonitor from './UpdateMonitor';
import type { DemoTheme } from './ui/theme';

export default function Demo() {
  const { styles } = useTheme<DemoTheme>();
  const { currentlyRunning, error, lastCheckForUpdateTimeSinceRestart } = useUpdates();
  const lastCheckForUpdateTime = usePersistentDate(lastCheckForUpdateTimeSinceRestart);
  return (
    <SafeAreaView style={styles.container}>
      <UpdateMonitor monitorInterval={10} />
      <View style={styles.spacer} />
      <List.Section
        style={styles.listSection}
        title="Critical Updates Test"
        titleStyle={styles.listSectionTitleText}>
        <List.Item
          style={styles.listItem}
          title={currentlyRunningTitle(currentlyRunning)}
          titleStyle={styles.listItemTitleText}
          description={currentlyRunningDescription(currentlyRunning)}
          descriptionNumberOfLines={5}
          descriptionStyle={styles.listItemDescriptionText}
        />
        <List.Item
          style={styles.listItem}
          title="Last update check:"
          titleStyle={styles.listItemTitleText}
          description={lastCheckForUpdateTime?.toISOString() || ''}
          descriptionStyle={styles.listItemDescriptionText}
        />
        <List.Item
          style={styles.listItem}
          title="Last error:"
          titleStyle={styles.listItemTitleText}
          description={error?.message || ''}
          descriptionStyle={styles.listItemDescriptionText}
        />
      </List.Section>
      <View style={styles.spacer} />
    </SafeAreaView>
  );
}
