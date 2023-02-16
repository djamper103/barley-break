import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {dw} from '../../../utils/dimensions';

interface ButtonContainerProps {
  text?: string;
  containerStyle?: any;
  buttonStyle?: ViewStyle;
  textStyle?: ViewStyle;
  onPress?: () => void;
}

export const ButtonContainer: FC<ButtonContainerProps> = ({
  text = 'Press me',
  containerStyle,
  buttonStyle,
  textStyle,
  onPress,
}) => {
  return (
    <View style={containerStyle && containerStyle}>
      <Pressable
        onPress={onPress}
        style={[
          styles.button,
          buttonStyle && buttonStyle,
          text.length > 10 && styles.buttonLong,
        ]}>
        <Text
          style={[
            styles.text,
            textStyle && textStyle,
            text.length > 10 && styles.textLong,
          ]}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.CERISE_RED,
    borderRadius: dw(20),
    marginBottom: dw(10),
  },
  buttonLong: {
    paddingVertical: 10,
  },
  textLong: {
    fontSize: 20,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
  },
});
