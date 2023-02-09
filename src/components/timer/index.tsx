import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {dh, dw} from '../../utils/dimensions';
import {COLORS} from '../../constants/colors';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {AnimatedCircleComponent} from '../animatedCircle';

interface TaimerComponentProps {
  isTimer: boolean;
  isTimerStart: boolean | null;
  isTimerPlug: boolean | null;
  buttonTextReset?: string;
  buttonTextStart?: string;
  buttonTextStop?: string;
  containerStyle?: any;
  resetTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;
}

export const TaimerComponent: FC<TaimerComponentProps> = ({
  isTimer = false,
  isTimerStart = false,
  isTimerPlug = false,
  buttonTextReset = 'Reset timer',
  buttonTextStart = 'Start timer',
  buttonTextStop = 'Stop timer',
  resetTimer,
  startTimer,
  stopTimer,
}) => {
  const [stateInterval, setStateInterval] = useState<any>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (isTimer) {
      setStateInterval(
        setInterval(() => {
          setSeconds(el => (el < 60 ? el + 1 : 1));
        }, 1000),
      );
    } else {
      setSeconds(0);
      setMinutes(0);
      clearInterval(stateInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimer]);

  useEffect(() => {
    isTimerStart
      ? (clearInterval(stateInterval),
        setSeconds(el => el + 1),
        setStateInterval(
          setInterval(() => {
            setSeconds(el => (el < 60 ? el + 1 : 1));
          }, 1000),
        ))
      : clearInterval(stateInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerPlug]);

  useEffect(() => {
    setIsAnimated(!isAnimated);
    seconds === 60 && setMinutes(el => el + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    minutes === 59 && setMinutes(0);
  }, [minutes]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(isAnimated ? COLORS.RED : COLORS.DUNE),
      // opacity: withSpring(isAnimated ? 1 : 0),
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle, styles.containerAnimate]}>
        <Text style={styles.text}>
          {minutes < 10 ? `0${minutes}` : minutes} :
          {seconds < 10 ? `0${seconds}` : seconds === 60 ? '00' : seconds}
        </Text>
      </Animated.View>
      <View style={styles.containerButton}>
        <Pressable onPress={resetTimer} style={styles.button}>
          <Text style={styles.text}>{buttonTextReset}</Text>
        </Pressable>
        <Pressable onPress={startTimer} style={styles.button}>
          <Text style={styles.text}>{buttonTextStart}</Text>
        </Pressable>
        <Pressable onPress={stopTimer} style={styles.button}>
          <Text style={styles.text}>{buttonTextStop}</Text>
        </Pressable>
      </View>
      {/* <AnimatedCircleComponent progressValue={second} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: dw(200),
    height: dh(60),
    flexDirection: 'row',
    marginLeft: 100,
    marginTop: 10,
  },
  containerButton: {
    width: dw(250),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerAnimate: {
    justifyContent: 'center',
    width: dw(100),
    height: dw(100),
    borderRadius: dw(50),
    borderWidth: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.DUNE,
  },
  button: {
    width: dw(100),
    height: dh(80),
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.GHOST,
    borderRadius: 20,
  },
});
