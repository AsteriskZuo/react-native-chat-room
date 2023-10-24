import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  Chatroom,
  Icon,
  seqId,
  useColors,
  useDispatchContext,
  useIMListener,
  usePaletteContext,
} from 'react-native-chat-room';
import type { ChatRoom } from 'react-native-chat-sdk';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackgroundImageMemo } from '../BackgroundImage';
import { ChatroomTestMenu, ChatroomTestMenuRef } from '../ChatroomTestMenu';
import type { RootScreenParamsList } from '../routes';

type Props = NativeStackScreenProps<RootScreenParamsList>;
export function ChatroomScreen(props: Props) {
  const { navigation, route } = props;
  const room = (route.params as any).params.room as ChatRoom;
  const {} = useSafeAreaInsets();
  const testRef = React.useRef<View>({} as any);
  const menuRef = React.useRef<ChatroomTestMenuRef>({} as any);
  const chatroomRef = React.useRef<Chatroom>({} as any);
  const count = React.useRef(0);
  const { colors } = usePaletteContext();
  const { getColor } = useColors({
    bg: {
      light: colors.neutral[98],
      dark: colors.neutral[1],
    },
    bg2: {
      light: colors.barrage[2],
      dark: colors.barrage[2],
    },
    tintColor: {
      light: colors.barrage[8],
      dark: colors.barrage[8],
    },
  });

  const [pageY, setPageY] = React.useState(0);
  const { addListener, removeListener } = useDispatchContext();

  useIMListener(
    React.useMemo(() => {
      return {
        onError: (params) => {
          console.log('ChatroomScreen:onError:', JSON.stringify(params));
        },
      };
    }, [])
  );

  // !!! ERROR  Warning: React has detected a change in the order of Hooks called by HeaderConfig. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks
  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: ChatroomHeaderRight,
  //     // headerShadowVisible: false,
  //     // headerBackTitleVisible: false,
  //   });
  // }, [navigation]);

  React.useEffect(() => {
    const cb = () => {
      menuRef?.current?.startShow?.();
    };
    addListener(`_$${ChatroomHeaderRight?.name}`, cb);
    return () => {
      removeListener(`_$${ChatroomHeaderRight?.name}`, cb);
    };
  }, [addListener, removeListener]);

  const addGiftFloatingTask = () => {
    chatroomRef?.current?.getGiftFloatingRef()?.pushTask({
      model: {
        id: seqId('_gf').toString(),
        nickName: 'NickName',
        giftCount: 1,
        giftIcon: 'http://notext.png',
        content: 'send Agoraship',
      },
    });
  };
  const addMarqueeTask = () => {
    const content =
      'For several generations, stories from Africa have traditionally been passed down by word of mouth. ';
    const content2 = "I'm fine.";
    chatroomRef?.current?.getMarqueeRef()?.pushTask?.({
      model: {
        id: count.current.toString(),
        content: count.current % 2 === 0 ? content : content2,
      },
    });
    ++count.current;
  };

  const showMemberList = () => {
    chatroomRef?.current?.getMemberListRef()?.startShow();
  };

  return (
    <View
      ref={testRef}
      style={{ flex: 1 }}
      onLayout={() => {
        testRef.current?.measure(
          (
            _x: number,
            _y: number,
            _width: number,
            _height: number,
            _pageX: number,
            pageY: number
          ) => {
            // console.log(
            //   'Sub:Sub:measure:',
            //   _x,
            //   _y,
            //   _width,
            //   _height,
            //   _pageX,
            //   pageY
            // );
            setPageY(pageY);
          }
        );
        testRef.current?.measureInWindow(
          (_x: number, _y: number, _width: number, _height: number) => {
            // console.log('Sub:Sub:measureInWindow:', _x, _y, _width, _height);
          }
        );
      }}
    >
      {/* <BackgroundImageMemo /> */}
      <Chatroom
        ref={chatroomRef}
        // containerStyle={{ transform: [{ translateY: -pageY }] }}
        // messageList={{
        //   props: {
        //     visible: true,
        //     containerStyle: {
        //       position: 'absolute',
        //       top: 100,
        //     },
        //   },
        // }}
        // gift={{
        //   props: {
        //     visible: true,
        //     containerStyle: {
        //       position: 'absolute',
        //       top: 100,
        //     },
        //   },
        // }}
        backgroundView={<BackgroundImageMemo />}
        // backgroundView={<View style={{ flex: 1, backgroundColor: 'blue' }} />}
        // marquee={{
        //   props: {
        //     visible: true,
        //     containerStyle: {
        //       position: 'absolute',
        //       top: 100,
        //     },
        //   },
        // }}
        input={{
          props: {
            keyboardVerticalOffset: Platform.OS === 'ios' ? pageY : 0,
            after: [
              <TouchableOpacity
                style={{
                  borderRadius: 38,
                  backgroundColor: getColor('bg2'),
                  width: 38,
                  height: 38,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'ellipsis_vertical'}
                  resolution={'3x'}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: getColor('tintColor'),
                  }}
                />
              </TouchableOpacity>,
              <TouchableOpacity
                style={{
                  borderRadius: 38,
                  backgroundColor: getColor('bg2'),
                  width: 38,
                  height: 38,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon
                  name={'gift_color'}
                  style={{ width: 30, height: 30, tintColor: undefined }}
                />
              </TouchableOpacity>,
            ],
          },
        }}
        memberList={{
          props: {
            onSearch: (memberType) => {
              navigation.push('TestSearchMember', { params: { memberType } });
            },
          },
        }}
        roomId={room.roomId}
        ownerId={room.owner}
        onError={(e) => {
          console.log('ChatroomScreen:onError:2', e.toString());
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: 150,
            height: 300,
            // backgroundColor: 'red',
            // bottom: 100,
            top: 100,
            right: 20,
          }}
        >
          <TouchableOpacity
            style={{
              height: 30,
              width: 150,
              backgroundColor: '#fff8dc',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              addMarqueeTask();
            }}
          >
            <Text>{'add import message'}</Text>
          </TouchableOpacity>
          <View style={{ height: 1 }} />
          <TouchableOpacity
            style={{
              height: 30,
              width: 150,
              backgroundColor: '#fff8dc',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              addGiftFloatingTask();
            }}
          >
            <Text>{'add gift message'}</Text>
          </TouchableOpacity>
        </View>
      </Chatroom>
      <ChatroomTestMenu
        ref={menuRef}
        onRequestModalClose={() => {
          menuRef?.current?.startHide?.();
        }}
        addGiftFloatingTask={addGiftFloatingTask}
        addMarqueeTask={addMarqueeTask}
        showMemberList={showMemberList}
      />
    </View>
  );
}

export const ChatroomHeaderRight = () => {
  const { emit } = useDispatchContext();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          emit(`_$${ChatroomHeaderRight.name}`, {});
        }}
        // style={{ backgroundColor: 'red' }}
      >
        <Icon name={'plus_in_circle'} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  );
};
