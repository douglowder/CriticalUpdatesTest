import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Demo from './src/Demo';

export default function App() {
  return (
    <PaperProvider>
      <Demo />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
