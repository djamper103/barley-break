import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PuzzleRenderArray} from '../../types/puzzle';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {PAZZLE_IMAGES_BY_KEYS} from '../../constants/images';

interface RenderComponentProps {
  data: PuzzleRenderArray;
  isNullValue: boolean;
  positionTarget: any;
  onPress: (data: PuzzleRenderArray, value: any) => void;
  positionArrayFunc: (value: any) => void;
  setPositionTargetNull: () => void;
}

export const RenderComponent: FC<RenderComponentProps> = ({
  data,
  isNullValue,
  positionTarget,
  onPress,
  positionArrayFunc,
  setPositionTargetNull,
}) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const aref = useAnimatedRef<any>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (positionTarget.id === data.id) {
      // console.log(positionTarget);
      positionTarget.positionType === 'x'
        ? (offsetX.value = positionTarget.x)
        : (offsetY.value = positionTarget.y);
      setPositionTargetNull();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionTarget]);

  useEffect(() => {
    if (aref && aref.current) {
      aref.current.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setCount(1);
          positionArrayFunc({
            x: pageX,
            y: pageY,
            id: data.id,
            url: data.url,
            height,
          });
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aref.current]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      //   backgroundColor: isNullValue ? 'transparent' : 'red',
      opacity: isNullValue ? 0 : 1,
      transform: [
        {translateY: withSpring(offsetY.value)},
        {translateX: withSpring(offsetX.value)},
      ],
    };
  });

  const onPressItem = (value?: any) => {
    onPress(data, value);
  };

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onEnd(event => {
      onPressItem(event);
    });

  return (
    <Animated.View style={[animatedStyle, styles.container]} ref={aref}>
      <GestureDetector gesture={panGesture}>
        {/* <Text style={[isNullValue && styles.text]}>{data.url}</Text> */}
        <Image style={styles.image} source={PAZZLE_IMAGES_BY_KEYS[data.id]} />
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'transparent',
  },
  image: {
    width: 100,
    height: 100,
  },
});
