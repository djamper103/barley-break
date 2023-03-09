import React, {FC} from 'react';
import {BackHandler, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {arrayMenu} from '../../constants/common';
import {useAppSelector} from '../../hooks/redux';

interface MenuProps {
  navigation?: any;
}

export const Menu: FC<MenuProps> = ({navigation}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  //push to the selected section
  const onPress = (value: string) => {
    navigation.push(value);
  };
  return (
    <View style={styles.container}>
      {arrayMenu.map((el: any) => {
        return (
          <Pressable
            onPress={() =>
              el === 'Close app' ? BackHandler.exitApp() : onPress(el)
            }
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
    marginTop: '50%',
  },
  containerButton: {
    margin: 12,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 1,
    textShadowRadius: 1,
    fontFamily: 'georgia',
    textTransform: 'capitalize',
  },
  textTheme: {
    color: COLORS.WHITE,
  },
});
