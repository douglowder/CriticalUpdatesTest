import React from 'react';
import { UpdatesProvider } from 'expo-updates';

// import UpdatesDemo from './src/UpdatesDemoWithoutProvider';
import UpdatesDemo from './src/UpdatesDemo';

export default function App() {
  return (
    <UpdatesProvider>
      <UpdatesDemo />
    </UpdatesProvider>
  );
}
