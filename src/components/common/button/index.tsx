import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';

interface ButtonContainerProps {
  text?: string;
  containerStyle?: ViewStyle;
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
    marginTop: 200,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  buttonLong: {
    paddingVertical: 10,
  },
  textLong: {
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
});
