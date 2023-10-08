// ref: https://github.com/GetStream/stream-chat-react-native/blob/23ac2215fc790e309d75b7b503a05d52973fcb24/package/src/components/KeyboardCompatibleView/KeyboardCompatibleViewFC.tsx

import * as React from 'react';
import { View } from 'react-native';
import {
  Chatroom,
  Container,
  createDarkTheme,
  createLightTheme,
  createPresetPalette,
  DispatchContextProvider,
  IconButton,
  PaletteContextProvider,
  ThemeContextProvider,
  usePaletteContext,
  useThemeContext,
} from 'react-native-chat-room';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function ChatroomFC() {
  const { colors } = usePaletteContext();
  const { style } = useThemeContext();
  return (
    <Chatroom
      after={[
        <View
          style={{
            borderRadius: 38,
            backgroundColor:
              style === 'light' ? colors.barrage[2] : colors.barrage[2],
            width: 38,
            height: 38,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            iconName={'ellipsis_vertical'}
            iconResolution={'3x'}
            style={{
              width: 30,
              height: 30,
              tintColor:
                style === 'light' ? colors.barrage[8] : colors.barrage[8],
            }}
            onPress={() => {
              console.log('test:zuoyu:press');
            }}
          />
        </View>,
        <View
          style={{
            borderRadius: 38,
            backgroundColor:
              style === 'light' ? colors.barrage[2] : colors.barrage[2],
            width: 38,
            height: 38,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            iconName={'gift_color'}
            style={{ width: 30, height: 30, tintColor: undefined }}
            onPress={() => {
              console.log('test:zuoyu:press');
            }}
          />
        </View>,
      ]}
    />
  );
}

export function TestChatroom() {
  const pal = createPresetPalette();
  const dark = createDarkTheme(pal);
  const light = createLightTheme(pal);

  return (
    <SafeAreaProvider>
      <DispatchContextProvider>
        <PaletteContextProvider value={pal}>
          <ThemeContextProvider value={light ? dark : dark}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'green',
                // marginTop: 100,
              }}
            >
              <ChatroomFC />
            </View>
          </ThemeContextProvider>
        </PaletteContextProvider>
      </DispatchContextProvider>
    </SafeAreaProvider>
  );
}

export function TestChatroom2() {
  const pal = createPresetPalette();
  const dark = createDarkTheme(pal);
  const light = createLightTheme(pal);
  return (
    <Container
      appKey="sdf"
      isDevMode={true}
      palette={pal}
      theme={light ? light : dark}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'green',
          // marginTop: 100,
        }}
      >
        <ChatroomFC />
      </View>
    </Container>
  );
}

export default function test_chatroom() {
  return <TestChatroom2 />;
}
