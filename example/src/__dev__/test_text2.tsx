import * as React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text as RNText,
  View,
} from 'react-native';
import {
  createDarkTheme,
  createLightTheme,
  createPresetPalette,
  PaletteContextProvider,
  Text,
  ThemeContextProvider,
} from 'react-native-chat-room';

export function TextComponent(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}
    >
      <Text
        textType={'large'}
        paletteType={'headline'}
        onTextLayout={(e) => {
          console.log('test:onTextLayout:', e.nativeEvent.lines);
        }}
        onLayout={(e) => {
          console.log('test:onLayout:', e.nativeEvent.layout);
        }}
      >
        headline - large
      </Text>
    </View>
  );
}

export function TextComponent2(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
      }}
    >
      <View
        style={{
          backgroundColor: 'blue',
        }}
      >
        <Text
          textType={'large'}
          paletteType={'headline'}
          style={{ fontSize: 40 }}
        >
          headline - large
        </Text>
      </View>
      <RNText
        style={[
          {
            fontFamily: undefined,
            fontSize: 20,
            fontWeight: '600',
            lineHeight: 28,
          },
          { fontSize: 40 },
        ]}
      >
        RN headline - large
      </RNText>
    </View>
  );
}

export function TextComponent3() {
  const countRef = React.useRef(0);
  const [text, setText] = React.useState('test');
  const onPress = () => {
    setText(countRef.current % 2 === 0 ? 'test' : 'test test');
    countRef.current++;
  };
  return (
    <View
      style={{ top: 100, width: 100, height: 100, backgroundColor: 'red' }}
      onTouchEnd={onPress}
    >
      <Text
        style={{
          backgroundColor: 'green',
          alignSelf: 'flex-start',
        }}
      >
        {text}
      </Text>
    </View>
  );
}

export function TextComponent4() {
  const [text] = React.useState(
    'TextComponen t4TextComponen t4TextComponent4Teonent4T eonent4Teo nent4Teonen t4Teonent4Teonent4 Teonent4Te onent4Teonent4Tex tCom ponent4Tex tCompo nent4Tex tComponent4'
  );
  return (
    <View>
      <ScrollView
        style={{ top: 100, width: 100, height: 100, backgroundColor: 'red' }}
        // onPress={onPress}
      >
        {/* <ScrollView> */}
        <Text
          style={{
            backgroundColor: 'green',
            alignSelf: 'flex-start',
            flexWrap: 'wrap',
            // width: 100,
            // height: 100,
          }}
          numberOfLines={undefined}
        >
          {text}
        </Text>
        {/* </ScrollView> */}
      </ScrollView>
    </View>
  );
}

const ScrollableText = () => {
  return (
    <View style={styles.v}>
      <Pressable
        onPress={() => {
          console.log('Outer Pressable clicked');
        }}
      >
        <ScrollView style={styles.container}>
          <Pressable
            onPress={() => {
              console.log('Inner Pressable clicked');
            }}
            onLongPress={() => {
              console.log('Inner Pressable long clicked');
            }}
          >
            <Text style={styles.text}>
              {/* 在这里添加长文本内容 */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Pressable>
        </ScrollView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  v: {
    flex: 0,
    top: 100,
    backgroundColor: 'blue',
  },
  container: {
    // flex: 1,
    height: 100,
    // backgroundColor: 'lightgrey',
  },
  text: {
    fontSize: 16,
    padding: 10,
    width: 100,
    // backgroundColor: 'white',
  },
});

export default function test_text() {
  const palette = createPresetPalette();
  const light = createLightTheme(palette);
  const dark = createDarkTheme(palette);
  const theme = light ? dark : dark;
  return (
    <ThemeContextProvider value={theme}>
      <PaletteContextProvider value={palette}>
        <ScrollableText />
      </PaletteContextProvider>
    </ThemeContextProvider>
  );
}
