import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import type { TextProps } from './Text';

export type PresetCalcTextWidthProps = {
  content: string;
  textProps: Omit<TextProps, 'children'>;
  onWidth: (width: number) => void;
};
/**
 * This component is used to calculate the width of the displayed string. No ellipses will be generated due to width. The component is not visible. But it is also recommended to put it at the bottom.
 *
 * **Note**: The string does not wrap, it is only displayed on one line, and the test calculation is performed without displaying the ellipsis.
 */
export function PresetCalcTextWidth(props: PresetCalcTextWidthProps) {
  const {
    content,
    onWidth,
    textProps: { onLayout, ...others },
  } = props;
  return (
    <View
      style={{
        position: 'absolute',
        width: 1,
        opacity: 0,
      }}
    >
      <ScrollView horizontal={true}>
        <Text
          onLayout={(e) => {
            onWidth(e.nativeEvent.layout.width);
            onLayout?.(e);
          }}
          {...others}
        >
          {content}
        </Text>
      </ScrollView>
    </View>
  );
}