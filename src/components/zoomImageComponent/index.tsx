import React, {FC} from 'react';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {dh, dw, height, width} from '../../utils/dimensions';
import {COLORS} from '../../constants/colors';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface ZoomImageComponentProps {
  imageIcon: any;
  containerStyle?: any;
}

const AnimatedImage = Animated.createAnimatedComponent(Image);

export const ZoomImageComponent: FC<ZoomImageComponentProps> = ({
  imageIcon,
  containerStyle,
}) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <TouchableWithoutFeedback>
        <Animated.View
          style={[styles.container, containerStyle && containerStyle]}>
          <AnimatedImage style={[rStyle, styles.image]} source={imageIcon} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: dw(400),
    height: dh(250),
  },
  image: {
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
