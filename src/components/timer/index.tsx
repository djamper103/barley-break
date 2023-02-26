import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ButtonContainer} from '../common/button';
import {height, width} from '../../utils/dimensions';

interface TaimerComponentProps {
  isTimer: boolean;
  isTimerStart: boolean | null;
  isTimerPlug: boolean | null;
  isTheme?: boolean;
  seconds?: number;
  minutes?: number;
  buttonTextReset?: string;
  buttonTextStart?: string;
  buttonTextStop?: string;
  containerStyle?: any;
  resetTimer: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  setSeconds: (value: any) => void;
  setMinutes: (value: any) => void;
}

export const TaimerComponent: FC<TaimerComponentProps> = ({
  isTimer = false,
  isTimerStart = false,
  isTimerPlug = false,
  isTheme = false,
  seconds = 0,
  minutes = 0,
  buttonTextReset = 'Reset timer',
  buttonTextStart = 'Start timer',
  buttonTextStop = 'Stop timer',
  resetTimer,
  startTimer,
  stopTimer,
  setSeconds,
  setMinutes,
}) => {
  const [stateInterval, setStateInterval] = useState<any>(null);
  // const [seconds, setSeconds] = useState<number>(0);
  // const [minutes, setMinutes] = useState<number>(0);

  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (isTimer) {
      setStateInterval(
        setInterval(() => {
          setSeconds((el: number) => (el < 60 ? el + 1 : 1));
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
        setSeconds((el: number) => el + 1),
        setStateInterval(
          setInterval(() => {
            setSeconds((el: number) => (el < 60 ? el + 1 : 1));
          }, 1000),
        ))
      : clearInterval(stateInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerPlug]);

  useEffect(() => {
    setIsAnimated(!isAnimated);
    seconds === 60 && setMinutes((el: number) => el + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    minutes === 59 && setMinutes(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ButtonContainer
          onPress={startTimer}
          text={buttonTextStart}
          buttonStyle={styles.button}
          textStyle={[styles.textButton]}
        />
        <ButtonContainer
          onPress={stopTimer}
          text={buttonTextStop}
          buttonStyle={styles.button}
          textStyle={[styles.textButton]}
        />
        <ButtonContainer
          onPress={resetTimer}
          text={buttonTextReset}
          buttonStyle={styles.button}
          textStyle={[styles.textButton]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: height / 6,
    // height: '18%',
    alignItems: 'center',
  },
  containerButton: {
    justifyContent: 'space-between',
    alignContent: 'space-between',
    width: width / 1.55,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    paddingVertical: '3%',
  },
  containerButtonImage: {
    paddingVertical: '3%',
  },
  containerAnimate: {
    justifyContent: 'center',
    width: width / 3.6,
    height: width / 3.6,
    borderRadius: width / 3.6,
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
    fontWeight: '500',
  },
  button: {
    width: width / 3.2,
    paddingHorizontal: 0,
    paddingVertical: height / 80,
  },
});
