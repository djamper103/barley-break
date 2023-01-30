import React, {FC} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {COLORS} from '../../../constants/colors';
import {THEME_DARK_ICON, THEME_LIGHT_ICON} from '../../../constants/images';
import {dw} from '../../../utils/dimensions';

interface SwitchComponentProps {
  isTheme?: any;
  onPress: () => void;
}

export const SwitchComponent: FC<SwitchComponentProps> = ({
  isTheme = false,
  onPress,
}) => {
  const offsetX = useSharedValue(isTheme ? 48 : 0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(offsetX.value)}],
    };
  });
  const onPressItem = () => {
    offsetX.value = isTheme ? offsetX.value - 48 : offsetX.value + 48;
    onPress();
  };
  return (
    <View style={[styles.container, isTheme && styles.containerTheme]}>
      <Animated.View style={[animatedStyle, styles.containerAnimate]}>
        <Pressable onPress={onPressItem}>
          <Image
            style={[styles.image, isTheme && styles.imageTheme]}
            source={isTheme ? THEME_DARK_ICON : THEME_LIGHT_ICON}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: dw(90),
    borderRadius: dw(15),
    paddingVertical: dw(3),
    paddingHorizontal: dw(5),
    backgroundColor: COLORS.GHOST,
  },
  containerTheme: {
    backgroundColor: COLORS.SAN_MARINO,
  },
  containerAnimate: {},
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
    tintColor: COLORS.DUNE,
  },
  imageTheme: {
    tintColor: COLORS.WHITE,
  },
});
