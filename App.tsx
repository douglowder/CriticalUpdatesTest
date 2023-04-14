import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Demo from './src/Demo';
import useTheme from './src/ui/paperStyles';

export default function App() {
  const theme = useTheme();
  return (
    <PaperProvider theme={theme}>
      <Demo />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
