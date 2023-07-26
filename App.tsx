import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import Demo from './src/Demo';
import { useDemoTheme } from './src/ui';

export default function App() {
  const theme = useDemoTheme();
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
        <Demo />
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}
