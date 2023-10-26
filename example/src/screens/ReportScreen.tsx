import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import {
  Report,
  ReportItemModel,
  seqId,
  SimulativeModalRef,
} from 'react-native-chat-room';

import type { RootScreenParamsList } from '../routes';

type Props = NativeStackScreenProps<RootScreenParamsList>;
export function ReportScreen(props: Props) {
  const {} = props;
  const ref = React.useRef<SimulativeModalRef>({} as any);
  const testRef = React.useRef<View>({} as any);
  const [pageY, setPageY] = React.useState(Platform.OS === 'ios' ? 94 : 56);
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
            console.log(
              'Sub:Sub:measure:r',
              _x,
              _y,
              _width,
              _height,
              _pageX,
              pageY
            );
            setPageY(pageY);
          }
        );
        testRef.current?.measureInWindow(
          (_x: number, _y: number, _width: number, _height: number) => {
            console.log('Sub:Sub:measureInWindow:r', _x, _y, _width, _height);
          }
        );
      }}
    >
      <Report
        ref={ref}
        data={data}
        maskStyle={{ transform: [{ translateY: -pageY }] }} // !!! Correct the offset.
        onReport={function (_result?: ReportItemModel): void {
          console.log('onReport:');
        }}
      />
      <View
        style={{
          position: 'absolute', // !!! must
          marginTop: 100,
          height: 60,
          width: 300,
          backgroundColor: 'red',
          // padding: 10,
        }}
      >
        <Pressable
          style={{ height: 60, width: 300, backgroundColor: 'white' }}
          onPress={() => {
            ref.current?.startShow();
          }}
        >
          <Text>{'show report list'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const data = [
  {
    id: seqId('_rp').toString(),
    title: 'Unwelcome commercial content or spam',
    checked: false,
  },
  {
    id: seqId('_rp').toString(),
    title: 'Pornographic or explicit content',
    checked: false,
  },
  {
    id: seqId('_rp').toString(),
    title: 'Child abuse',
    checked: false,
  },
  {
    id: seqId('_rp').toString(),
    title: 'Hate speech or graphic violence',
    checked: false,
  },
  {
    id: seqId('_rp').toString(),
    title: 'Promote terrorism',
    checked: false,
  },
  {
    id: seqId('_rp').toString(),
    title: 'Harassment or bullying',
    checked: false,
  },
  {
    id: seqId('_rp').toString(),
    title: 'Harassment or bullying',
    checked: false,
  },
  {
    id: seqId('_rp').toString(),
    title: 'Harassment or bullying',
    checked: false,
  },
];
