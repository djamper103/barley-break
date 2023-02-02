import React, {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {PositionType, PuzzleRenderArray} from '../../../../types/puzzle';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {COLORS} from '../../../../constants/colors';
import {dw} from '../../../../utils/dimensions';
import {IMAGES_3_BY_KEYS, IMAGES_4_BY_KEYS} from '../../../../constants/images';

interface RenderComponentProps {
  data: PuzzleRenderArray;
  isNullValue: boolean;
  positionTarget: any;
  imagePath: string;
  arrayLength: number;
  onPress: (data: PositionType, value: any) => void;
  setPositionTargetNull: () => void;
  setPositionNull: (value: PositionType) => void;
}

export const RenderComponent: FC<RenderComponentProps> = ({
  data,
  isNullValue,
  positionTarget,
  imagePath,
  arrayLength,
  onPress,
  setPositionTargetNull,
  setPositionNull,
}) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const aref = useAnimatedRef<any>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (positionTarget.id === data.id) {
      positionTarget.positionType === 'x'
        ? (offsetX.value = positionTarget.x)
        : (offsetY.value = positionTarget.y);
      setPositionTargetNull();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionTarget]);

  useEffect(() => {
    isNullValue &&
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
          pageX !== undefined &&
            setPositionNull({
              id: data.id,
              x: pageX,
              y: pageY,
              path: data.path,
              height,
            });
        },
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aref.current]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: isNullValue ? 0 : 1,
      transform: [
        {translateY: withSpring(offsetY.value)},
        {translateX: withSpring(offsetX.value)},
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onEnd(event => {
      onPressItem(event);
    });

  const onPressItem = (value?: any) => {
    aref.current.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        onPress(
          {
            id: data.id,
            x: pageX,
            y: pageY,
            path: data.path,
            height,
          },
          value,
        );
      },
    );
  };

  const sourceImage =
    arrayLength === 3
      ? IMAGES_3_BY_KEYS[`${imagePath}${data.id}`]
      : IMAGES_4_BY_KEYS[`${imagePath}${data.id}`];

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        ref={aref}
        style={[
          animatedStyle,
          styles.container,
          arrayLength === 4 && styles.containerSmall,
          arrayLength === 5 && styles.containerAverage,
          arrayLength === 6 && styles.containerBig,
          imagePath === 'none' && styles.containerNone,
        ]}>
        {imagePath === 'none' ? (
          <Text style={[styles.text, isNullValue && styles.textNull]}>
            {data.id}
          </Text>
        ) : (
          <Image
            style={[styles.image, arrayLength === 4 && styles.imageBig]}
            source={sourceImage}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dw(112),
    height: dw(112),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSmall: {
    width: dw(94),
    height: dw(94),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNone: {
    backgroundColor: COLORS.CLOUD_BURST,
  },
  containerAverage: {
    width: dw(74),
    height: dw(74),
  },
  containerBig: {
    width: dw(64),
    height: dw(64),
  },
  text: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
  textNull: {
    color: 'transparent',
  },
  image: {
    width: dw(112),
    height: dw(112),
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
  imageBig: {
    width: dw(94),
    height: dw(94),
  },
});
