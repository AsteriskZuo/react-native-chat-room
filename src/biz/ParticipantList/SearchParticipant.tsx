import * as React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useColors } from '../../hook';
import type { UserServiceData } from '../../room';
import { usePaletteContext } from '../../theme';
import { Image } from '../../ui/Image';
import type { PropsWithError, PropsWithTest } from '../types';
import { useSearchParticipantListAPI } from './ParticipantList.hooks';
import {
  ParticipantListItemMemo,
  ParticipantListItemProps,
} from './ParticipantList.item';
import { Search } from './Search';
import type { ParticipantListType } from './types';

/**
 * Properties of the `ParticipantList` component.
 */
export type SearchParticipantProps = {
  /**
   * List type. {@link ParticipantListType}
   */
  memberType: ParticipantListType;
  /**
   * Callback function when cancel button is clicked.
   */
  onRequestClose: () => void;
  /**
   * Search type.
   */
  searchType?: keyof UserServiceData;
} & PropsWithTest &
  PropsWithError;

/**
 * Search member components.
 * @param props {@link SearchParticipantProps}
 * @returns JSX.Element
 */
export function SearchParticipant(props: SearchParticipantProps) {
  const { onRequestClose, memberType, searchType } = props;
  const [value, setValue] = React.useState('');
  const { colors } = usePaletteContext();
  const { getColor } = useColors({
    backgroundColor: {
      light: colors.neutral[98],
      dark: colors.neutral[1],
    },
    backgroundColor2: {
      light: colors.neutral[8],
      dark: colors.neutral[3],
    },
  });
  const { _data, deferSearch } = useSearchParticipantListAPI({
    memberType,
    searchType,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: getColor('backgroundColor'),
      }}
    >
      <Search
        value={value}
        onChangeText={(v) => {
          setValue(v);
          deferSearch(v);
        }}
        onCancel={function () {
          onRequestClose();
        }}
      />
      <FlatList
        data={_data}
        renderItem={(info: ListRenderItemInfo<ParticipantListItemProps>) => {
          const { item } = info;
          return <ParticipantListItemMemo {...item} />;
        }}
        keyExtractor={(item: ParticipantListItemProps) => {
          return item.id;
        }}
        ListEmptyComponent={EmptyBlank}
      />
    </SafeAreaView>
  );
}

const EmptyBlank = () => {
  const { height: winHeight } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: winHeight - 94,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/bg/blank.png')}
        style={{ height: 140 }}
        resizeMode={'contain'}
      />
    </View>
  );
};