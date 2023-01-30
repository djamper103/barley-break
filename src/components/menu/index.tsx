import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {arrayMenu} from '../../constants/common';
import {useAppSelector} from '../../hooks/redux';
import {dh} from '../../utils/dimensions';

interface MenuProps {
  navigation?: any;
}

export const Menu: FC<MenuProps> = ({navigation}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const onPress = (value: string) => {
    navigation.push(value);
  };
  return (
    <View style={styles.container}>
      {arrayMenu.map((el: any) => {
        return (
          <Pressable
            onPress={() => onPress(el)}
            key={el}
            style={styles.containerButton}>
            <Text style={[styles.text, isTheme && styles.textTheme]}>{el}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: dh(200),
  },
  containerButton: {
    margin: dh(10),
  },
  text: {
    color: COLORS.DUNE,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '400',
  },
  textTheme: {
    color: COLORS.WHITE,
  },
});
