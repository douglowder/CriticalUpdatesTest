/**
 * Test app demonstrating
 * - demo React context and provider for updates
 * - critical updates
 * - passing user-facing messages into the update manifest
 */
import React from 'react';
import { List } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useUpdates } from './UseUpdatesWithPersistentDate';
import { currentlyRunningTitle, currentlyRunningDescription } from './Utils';
import UpdateMonitor from './UpdateMonitor';

export default function Demo() {
  const { currentlyRunning, error, lastCheckForUpdateTime } = useUpdates();
  return (
    <SafeAreaView style={styles.container}>
      <UpdateMonitor monitorInterval={10} />
      <View style={styles.spacer} />
      <List.Section title="Critical Updates Test" titleStyle={styles.listSectionTitleText}>
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

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
  },
  listSectionTitleText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  listItem: {
    margin: 10,
  },
  listItemTitleText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  listItemDescriptionText: {
    fontSize: 12,
  },
});
