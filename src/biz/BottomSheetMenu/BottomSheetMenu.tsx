import * as React from 'react';
import { View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { ErrorCode, UIKitError } from '../../error';
import { useColors } from '../../hook';
import { usePaletteContext } from '../../theme';
import { SlideModal, SlideModalRef } from '../../ui/Modal';
import { Text } from '../../ui/Text';
import { gMaxItemCount } from './BottomSheetMenu.const';
import { useGetItems } from './BottomSheetMenu.hooks';

export type BottomSheetMenuRef = SlideModalRef & {
  startShowWithInit: (initItems: React.ReactElement[]) => void;
};
export type BottomSheetMenuProps = {
  onRequestModalClose: () => void;
  title?: string;
  /**
   * The maximum number should not exceed 6.
   */
  initItems: React.ReactElement[];
};

export const BottomSheetMenu = React.forwardRef<
  BottomSheetMenuRef,
  BottomSheetMenuProps
>(function (
  props: BottomSheetMenuProps,
  ref?: React.ForwardedRef<BottomSheetMenuRef>
) {
  const { onRequestModalClose, initItems, title } = props;
  const { colors } = usePaletteContext();
  const { bottom } = useSafeAreaInsets();
  const modalRef = React.useRef<SlideModalRef>({} as any);
  const { items, updateItems } = useGetItems(initItems);
  const { getColor } = useColors({
    bg1: {
      light: colors.neutral[98],
      dark: colors.neutral[1],
    },
    bg2: {
      light: colors.neutral[8],
      dark: colors.neutral[3],
    },
    c1: {
      light: colors.neutral[5],
      dark: colors.neutral[6],
    },
  });
  const isShow = React.useRef(false);

  React.useImperativeHandle(
    ref,
    () => {
      return {
        startHide: (onFinished?: () => void) => {
          isShow.current = false;
          modalRef?.current?.startHide?.(onFinished);
        },
        startShow: () => {
          isShow.current = true;
          modalRef?.current?.startShow?.();
        },
        startShowWithInit: (initItems: React.ReactElement[]) => {
          if (initItems !== items) {
            isShow.current = true;
            updateItems(initItems);
          } else {
            isShow.current = true;
            modalRef?.current?.startShow?.();
          }
        },
      };
    },
    [items, updateItems]
  );

  React.useEffect(() => {
    if (isShow.current === true) {
      modalRef?.current?.startShow?.();
    }
  }, [items]);

  if (initItems.length > gMaxItemCount) {
    throw new UIKitError({ code: ErrorCode.max_count });
  }

  return (
    <SlideModal
      propsRef={modalRef}
      modalAnimationType={'slide'}
      onRequestModalClose={onRequestModalClose}
    >
      <SafeAreaView
        style={{
          // height: 56 * 6 + 36 + 80,
          backgroundColor: getColor('bg1'),
          alignItems: 'center',
          width: '100%',
          // borderTopLeftRadius: 16,
          // borderTopRightRadius: 16,
        }}
      >
        {/* <View
          style={{
            width: 36,
            height: 5,
            marginVertical: 6,
            backgroundColor: getColor('bg2'),
            borderRadius: 2.5,
          }}
        /> */}

        {title ? (
          <View style={{ paddingVertical: 13, paddingHorizontal: 16 }}>
            <Text
              textType={'medium'}
              paletteType={'body'}
              style={{
                color: getColor('c1'),
              }}
            >
              {title}
            </Text>
          </View>
        ) : null}

        {items}

        <View style={{ height: bottom }} />
      </SafeAreaView>
    </SlideModal>
  );
});
