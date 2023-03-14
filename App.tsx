import React from 'react';
import { UpdatesProvider } from 'expo-updates';

import UpdatesDemo from './UpdatesDemo';

export default function App() {
  return (
    <UpdatesProvider>
      <UpdatesDemo />
    </UpdatesProvider>
  );
}
