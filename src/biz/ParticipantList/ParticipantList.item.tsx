import * as React from 'react';
import { View } from 'react-native';

import { g_flatlist_border_bottom_width } from '../../const';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { IconButton } from '../../ui/Button';
import { Image } from '../../ui/Image';
import { Text } from '../../ui/Text';
import { Avatar } from '../Avatar';
import { gParticipantListItemHeight } from './ParticipantList.const';
import type { ParticipantListIteModel } from './types';

export type ParticipantListItemActions = {
  onClicked?: () => void;
};
export type ParticipantListItemProps = {
  id: string;
  userInfo: ParticipantListIteModel;
  actions?: ParticipantListItemActions;
};

export function ParticipantListItem(props: ParticipantListItemProps) {
  const { colors } = usePaletteContext();
  const { getColor } = useColors({
    backgroundColor: {
      light: colors.neutral[98],
      dark: colors.neutral[1],
    },
    color: {
      light: colors.neutral[1],
      dark: colors.neutral[98],
    },
    color2: {
      light: colors.neutral[6],
      dark: colors.neutral[5],
    },
    color3: {
      light: colors.neutral[9],
      dark: colors.neutral[2],
    },
  });
  const { id, userInfo, actions } = props;
  return (
    <View
      key={id}
      style={{
        backgroundColor: getColor('backgroundColor'),
        paddingHorizontal: 10,
        width: '100%',
        height: gParticipantListItemHeight,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {userInfo?.identify ? (
          <>
            <Image
              style={{
                width: 22,
                height: 22,
                // tintColor: 'orange',
                margin: 4,
              }}
              source={{ uri: userInfo.identify, cache: 'default' }}
            />
            <View style={{ width: 12 }} />
          </>
        ) : null}

        <Avatar url={userInfo.avatarURL} size={40} />
        <View style={{ width: 12 }} />
        <View style={{ marginVertical: 10 }}>
          <Text
            textType={'medium'}
            paletteType={'title'}
            style={{
              color: getColor('color'),
            }}
          >
            {userInfo.nickName === undefined ||
            userInfo.nickName.trim().length === 0
              ? userInfo.userId
              : userInfo.nickName}
          </Text>
          {/* <Text
            textType={'medium'}
            paletteType={'body'}
            style={{
              color: getColor('color2'),
            }}
          >
            {'Role'}
          </Text> */}
        </View>
        <View style={{ flex: 1 }} />
        <IconButton
          iconName={'ellipsis_vertical'}
          style={{
            tintColor: getColor('color2'),
            width: 24,
            height: 24,
            margin: 4,
          }}
          onPress={actions?.onClicked}
        />
      </View>
      <View
        style={{
          backgroundColor: getColor('color2'),
          height: g_flatlist_border_bottom_width,
          marginLeft: userInfo?.identify ? 90 : 50,
        }}
      />
    </View>
  );
}

export const ParticipantListItemMemo = React.memo(ParticipantListItem);