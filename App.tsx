import React from 'react';
import { UpdatesProvider } from './expo-updates-provider';

import UpdatesDemo from './src/UpdatesDemo';

export default function App() {
  return (
    <UpdatesProvider>
      <UpdatesDemo />
    </UpdatesProvider>
  );
}
