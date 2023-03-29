import React from 'react';
import * as Updates from 'expo-updates';

const { UpdatesProvider } = Updates.Provider;

import UpdatesDemo from './src/UpdatesDemo';

export default function App() {
  return (
    <UpdatesProvider>
      <UpdatesDemo />
    </UpdatesProvider>
  );
}
