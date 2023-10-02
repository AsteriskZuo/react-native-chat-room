import * as React from 'react';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { SimulativeModal, SimulativeModalRef } from 'react-native-chat-room';

export function ModalComponent() {
  const ref = React.useRef<SimulativeModalRef>({} as any);
  const { width } = useWindowDimensions();
  return (
    <View
      style={{ flex: 1, paddingTop: 100 }}
      onLayout={(e) => {
        console.log('test:onLayout:', e.nativeEvent.layout);
      }}
    >
      <Pressable
        onPress={() => {
          ref.current.startShow();
        }}
      >
        <View style={{ width: width, height: 50, backgroundColor: 'orange' }} />
      </Pressable>
      <SimulativeModal
        propsRef={ref}
        modalAnimationType="slide"
        backgroundColor={'rgba(1,1,1, 0.2)'}
        backgroundTransparent={false}
      >
        <View
          style={{ height: 400, backgroundColor: 'yellow' }}
          // onPress={() => {
          //   ref.current.startHide();
          // }}
        />
      </SimulativeModal>
    </View>
  );
}

export function AlertComponent() {
  const ref = React.useRef<SimulativeModalRef>({} as any);
  const { width } = useWindowDimensions();
  return (
    <View
      style={{ flex: 1, paddingTop: 100 }}
      onLayout={(e) => {
        console.log('test:onLayout:', e.nativeEvent.layout);
      }}
    >
      <Pressable
        onPress={() => {
          ref.current.startShow();
        }}
      >
        <View style={{ width: width, height: 50, backgroundColor: 'orange' }} />
      </Pressable>
      <SimulativeModal
        propsRef={ref}
        modalAnimationType="fade"
        backgroundColor={'rgba(1,1,1, 0.2)'}
        backgroundTransparent={false}
        modalStyle={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Pressable
          style={{ height: 200, width: 200, backgroundColor: 'yellow' }}
          onPress={() => {
            ref.current.startHide();
          }}
        />
      </SimulativeModal>
    </View>
  );
}

export default function test_modal_simulative() {
  return <ModalComponent />;
}
