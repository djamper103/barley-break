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
import {IMAGES_3_BY_KEYS, IMAGES_4_BY_KEYS} from '../../../../constants/images';
import {CELL_WIDTH, dw} from '../../../../utils/dimensions';

interface RenderComponentProps {
  data: PuzzleRenderArray;
  isNullValue: boolean;
  positionTarget: any;
  imagePath: string;
  arrayLength: number;
  withSpringOptions?: Object;
  onPress: (data: PositionType, value: any) => void;
  setPositionNull: (value: PositionType) => void;
}

export const RenderComponent: FC<RenderComponentProps> = ({
  data,
  isNullValue,
  positionTarget,
  imagePath,
  arrayLength,
  withSpringOptions = {
    damping: 11,
    stiffness: 50,
  },
  onPress,
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
        {
          translateY: withSpring(offsetY.value, withSpringOptions),
        },
        {translateX: withSpring(offsetX.value, withSpringOptions)},
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
        positionTarget.id === undefined &&
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
          <Image style={styles.image} source={sourceImage} />
        )}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CELL_WIDTH(3, dw(10)),
    height: CELL_WIDTH(3, dw(10)),
  },
  containerBig: {
    width: CELL_WIDTH(6, dw(10)),
    height: CELL_WIDTH(6, dw(10)),
  },
  containerAverage: {
    width: CELL_WIDTH(5, dw(10)),
    height: CELL_WIDTH(5, dw(10)),
  },
  containerSmall: {
    width: CELL_WIDTH(4, dw(10)),
    height: CELL_WIDTH(4, dw(10)),
  },
  containerNone: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BISCAY,
  },
  text: {
    fontSize: 18,
    color: COLORS.WHITE,
  },
  textNull: {
    color: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
