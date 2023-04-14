import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Demo from './src/Demo';
import { useDemoTheme } from './src/ui/theme';

export default function App() {
  const theme = useDemoTheme();
  return (
    <PaperProvider theme={theme}>
      <Demo />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
