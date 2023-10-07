import * as React from 'react';
import { Pressable, View } from 'react-native';

import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { Icon } from '../../ui/Image';
import { Text } from '../../ui/Text';

export function SearchStyle({ onPress }: { onPress: () => void }) {
  const { colors } = usePaletteContext();
  const { getColor } = useColors({
    backgroundColor: {
      light: colors.neutral[95],
      dark: colors.neutral[2],
    },
    color: {
      light: colors.neutral[6],
      dark: colors.neutral[4],
    },
  });
  return (
    <View
      style={{
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 4,
      }}
    >
      <Pressable onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            borderRadius: 18,
            height: 36,
            paddingVertical: 7,
            width: '100%',
            backgroundColor: getColor('backgroundColor'),
            justifyContent: 'center',
          }}
        >
          <Icon
            name={'magnifier'}
            style={{
              width: 22,
              height: 22,
              tintColor: getColor('color'),
            }}
          />
          <View style={{ width: 4 }} />
          <Text
            textType={'large'}
            paletteType={'body'}
            style={{
              color: getColor('color'),
            }}
          >
            {'Search'}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}