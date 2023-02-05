import React, {FC} from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {dh, dw} from '../../utils/dimensions';

interface PressableTextViewProps {
  data?: any;
  isTheme?: boolean;
  type?: string;
  imageIcon?: any;
  imageStyle?: ImageStyle;
  containerStyle?: any;
  containerThemeStyle?: ViewStyle;
  textStyle?: ViewStyle;
  textThemeStyle?: ViewStyle;
  onPress: (value: any) => void;
}

export const PressableTextView: FC<PressableTextViewProps> = ({
  data = 3,
  isTheme = false,
  type = 'double',
  imageIcon,
  imageStyle,
  containerStyle,
  containerThemeStyle,
  textStyle,
  textThemeStyle,
  onPress,
}) => {
  const onPressItem = () => {
    onPress(data);
  };
  return (
    <Pressable
      onPress={onPressItem}
      style={[
        styles.container,
        isTheme && styles.containerTheme,
        containerStyle && containerStyle,
        containerThemeStyle && containerThemeStyle,
      ]}>
      {type === 'double' ? (
        <Text
          style={[
            styles.text,
            isTheme && styles.textTheme,
            textStyle && textStyle,
            textThemeStyle && textThemeStyle,
          ]}>{`${data} x ${data}`}</Text>
      ) : (
        <Image style={[styles.image, imageStyle]} source={imageIcon} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dw(170),
    height: dw(170),
    backgroundColor: COLORS.SAN_MARINO,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dh(40),
  },
  containerTheme: {
    backgroundColor: COLORS.WHITE,
  },
  text: {
    fontSize: 32,
    color: COLORS.WHITE,
  },
  textTheme: {
    color: COLORS.BLACK,
  },
  image: {
    width: dw(184),
    height: dw(184),
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
