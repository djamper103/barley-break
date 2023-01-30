import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {RenderTypeItem} from './renderTypeItem';
import {useAppSelector} from '../../../hooks/redux';
import {dh, dw} from '../../../utils/dimensions';

interface GameSizeProps {
  navigation?: any;
  imagePath?: string;
  arraySize?: number[];
}

export const GameSize: FC<GameSizeProps> = ({
  navigation,
  imagePath,
  arraySize = [3, 4],
}) => {
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const onPress = (value: number) => {
    navigation.push('Render start', {
      arrayLength: value,
      imagePath: imagePath,
    });
  };
  return (
    <View style={styles.container}>
      {arraySize.map((el: number) => {
        return (
          <RenderTypeItem
            data={el}
            key={el}
            isTheme={isTheme}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: dw(32),
    marginTop: dh(150),
  },
});
