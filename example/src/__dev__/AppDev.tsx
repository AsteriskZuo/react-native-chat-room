import * as React from 'react';
import { View } from 'react-native';

import { default as Test } from './test_marquee_prototype2';

// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

export function AppDev(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <Test />
    </View>
  );
}
