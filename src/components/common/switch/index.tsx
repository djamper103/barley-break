import React, {FC} from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {COLORS} from '../../../constants/colors';
import {THEME_DARK_ICON, THEME_LIGHT_ICON} from '../../../constants/images';

interface SwitchComponentProps {
  isTheme?: any;
  containerStyle?: any;
  onPress: () => void;
}

export const SwitchComponent: FC<SwitchComponentProps> = ({
  isTheme = false,
  containerStyle,
  onPress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(isTheme ? 60 : 0, {
            duration: 500,
          }),
        },
      ],
    };
  });
  return (
    <Pressable
      style={[
        styles.container,
        isTheme && styles.containerTheme,
        containerStyle && containerStyle,
      ]}
      onPress={onPress}>
      <Animated.View style={[animatedStyle]}>
        <Image
          style={[styles.image, isTheme && styles.imageTheme]}
          source={isTheme ? THEME_DARK_ICON : THEME_LIGHT_ICON}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: 100,
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: COLORS.ALUMINIUM_OPACITY_04,
  },
  containerTheme: {
    backgroundColor: COLORS.BISCAY,
  },
  image: {
    resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
    tintColor: COLORS.DUNE,
  },
  imageTheme: {
    tintColor: COLORS.WHITE,
  },
});
