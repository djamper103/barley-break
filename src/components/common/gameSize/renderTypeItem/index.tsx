import React, {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {dh, dw} from '../../../../utils/dimensions';

interface ClassicGameTypeItemProps {
  data?: number;
  isTheme?: boolean;
  onPress: (value: number) => void;
}

export const RenderTypeItem: FC<ClassicGameTypeItemProps> = ({
  data = 3,
  isTheme = false,
  onPress,
}) => {
  const onPressItem = () => {
    onPress(data);
  };
  return (
    <Pressable
      onPress={onPressItem}
      style={[styles.container, isTheme && styles.containerTheme]}>
      <Text style={[styles.text, isTheme && styles.textTheme]}>
        {data} x {data}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dw(150),
    height: dh(150),
    backgroundColor: COLORS.SAN_MARINO,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dh(50),
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
});
