import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { getCacheTimeoutSetting, setCacheTimeoutSetting } from './Utils';

export default function CacheTimeout() {
  // Cache timeout handling
  const [cacheTimeoutValue, setCacheTimeoutValue] = useState<number | null>(null);

  const getCacheTimeoutText = () => {
    if (cacheTimeoutValue === -1) {
      return '0';
    }
    if (Number.isNaN(cacheTimeoutValue)) {
      return '0';
    }
    return `${cacheTimeoutValue}`;
  };

  const setCacheTimeoutText = (timeout: string) => {
    let value = 0;
    try {
      const newTimeout = parseInt(timeout, 10);
      if (newTimeout >= 0 && newTimeout <= 5000) {
        value = newTimeout;
      }
    } catch (_: any) {}
    setCacheTimeoutSetting(value);
    setCacheTimeoutValue(value);
  };

  useEffect(() => {
    if (cacheTimeoutValue === null) {
      setCacheTimeoutValue(getCacheTimeoutSetting());
    }
  }, [cacheTimeoutValue]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ alignItems: 'center' }}>
      <Text>Cache timeout</Text>
      <TextInput
        aria-label="Cache timeout"
        value={getCacheTimeoutText()}
        onChangeText={(text) => setCacheTimeoutText(text)}
      />
    </View>
  );
}
