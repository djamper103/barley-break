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
    console.log('1');
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
    width: 190,
    height: 190,
    backgroundColor: COLORS.BISCAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
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
    width: 190,
    height: 190,
    // resizeMode: 'contain',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
