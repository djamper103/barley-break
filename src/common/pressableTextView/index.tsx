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
import {CELL_WIDTH, dh, dw} from '../../utils/dimensions';

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
    width: CELL_WIDTH(2, dw(15)),
    height: CELL_WIDTH(2, dw(15)),
    backgroundColor: COLORS.BISCAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dh(15),

    shadowColor: COLORS.BISCAY,
    elevation: 15,
  },
  containerTheme: {
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.WHITE,
    elevation: 10,
  },
  text: {
    fontSize: 36,
    color: COLORS.WHITE,
    fontWeight: '400',
    textShadowRadius: 4,
  },
  textTheme: {
    color: COLORS.DUNE,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.TRANSPARENT,
  },
});
