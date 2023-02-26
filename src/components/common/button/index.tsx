import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {height, width} from '../../../utils/dimensions';

interface ButtonContainerProps {
  text?: string;
  containerStyle?: any;
  buttonStyle?: any;
  textStyle?: any;
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
        style={[styles.button, buttonStyle && buttonStyle]}>
        <Text style={[styles.text, textStyle && textStyle]}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: width / 20,
    paddingVertical: height / 80,
    justifyContent: 'center',
    backgroundColor: COLORS.CERISE_RED,
    borderRadius: 20,
  },
  text: {
    color: COLORS.WHITE,
    fontSize: 24,
    textAlign: 'center',
  },
});
