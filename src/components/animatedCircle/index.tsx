import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
// import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';
import {COLORS} from '../../constants/colors';
import {dh, dw, height, width} from '../../utils/dimensions';

interface AnimatedCircleComponentProps {
  circleLength?: number;
  radius?: number;
  strokeWidthView?: number;
  strokeWidthAnimatedView?: number;
  strokeViewColor?: any;
  strokeAnimatedViewColor?: any;
  cx?: number;
  cy?: number;
  progressValue?: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AnimatedCircleComponent: FC<AnimatedCircleComponentProps> = ({
  circleLength = 400,
  radius = circleLength / (2 * Math.PI),
  strokeWidthView = 30,
  strokeWidthAnimatedView = 15,
  strokeViewColor = COLORS.APPLE,
  strokeAnimatedViewColor = COLORS.MAROON_FLUSH,
  cx = width / 4,
  cy = height / 9,
  progressValue = 0.5,
}) => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circleLength * (1 - progress.value),
  }));

  useEffect(() => {
    console.log(progressValue / 100);
    progress.value = withTiming(progressValue === 60 ? 0 : progressValue / 59, {
      duration: progressValue === 60 ? 1000 : 2000,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressValue]);

  const progressText = useDerivedValue(() => {
    return `${progressValue === 60 ? 0 : progressValue}`;
  });

  return (
    <View style={styles.container}>
      <Svg>
        <ReText style={styles.progressText} text={progressText} />
        {/* <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={strokeViewColor}
          strokeWidth={strokeWidthView}
          //   strokeDasharray={6}
        /> */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke={strokeAnimatedViewColor}
          strokeWidth={strokeWidthAnimatedView}
          strokeDasharray={circleLength}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: dh(200),
    width: dw(200),
    backgroundColor: COLORS.TRANSPARENT,
  },
  progressText: {
    fontSize: 80,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
