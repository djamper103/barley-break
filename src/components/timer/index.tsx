import React, {FC, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {dh, dw} from '../../utils/dimensions';
import {COLORS} from '../../constants/colors';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface TaimerComponentProps {
  isTimer: boolean;
  isTimerStart: boolean | null;
  isTimerPlug: boolean | null;
  isTheme?: boolean;
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
  isTheme = false,
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
      borderColor: withTiming(isAnimated ? COLORS.CERISE_RED : COLORS.DUNE),
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle, styles.containerAnimate]}>
        <Text style={[styles.text, isTheme && styles.textTheme]}>
          {minutes < 10 ? `0${minutes}` : minutes} :
          {seconds < 10 ? `0${seconds}` : seconds === 60 ? '00' : seconds}
        </Text>
      </Animated.View>
      <View style={styles.containerButton}>
        <Pressable onPress={startTimer} style={styles.button}>
          <Text style={[styles.text, styles.textButton]}>
            {buttonTextStart}
          </Text>
        </Pressable>
        <Pressable onPress={stopTimer} style={styles.button}>
          <Text style={[styles.text, styles.textButton]}>{buttonTextStop}</Text>
        </Pressable>
        <Pressable onPress={resetTimer} style={styles.button}>
          <Text style={[styles.text, styles.textButton]}>
            {buttonTextReset}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: dh(10),
  },
  containerButton: {
    justifyContent: 'space-between',
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
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.BLACK,
  },
  textTheme: {
    color: COLORS.WHITE,
  },
  textButton: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: '700',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.CERISE_RED,
    borderRadius: 20,
    marginBottom: 10,
  },
});
