import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {setArrayLength} from '../../../redux/store/actionCreator/actionCreatorCurrentArray';
import {
  setImage,
  setNumberOfImage,
} from '../../../redux/store/actionCreator/actionCreatorImage';
import {PressableTextView} from '../../../common/pressableTextView';
import {randomInteger} from '../../../common/functions/randomInteger';
import {dw} from '../../../utils/dimensions';

interface GameSizeProps {
  navigation?: any;
  imagePath?: string;
  arraySize?: number[];
}

export const GameSize: FC<GameSizeProps> = ({
  navigation,
  imagePath = 'IMAGES_BY_KEYS',
  arraySize = [3, 4],
}) => {
  const dispatch = useAppDispatch();

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);
  const {numberOfImage, isImageChoose} = useAppSelector(
    reducer => reducer.imageSlice,
  );

  const onPress = (value: number) => {
    //random image selection
    let numberOfImageLocal = randomInteger(1, 4);
    isImageChoose === false && dispatch(setNumberOfImage(numberOfImageLocal));
    //field size selection
    dispatch(setArrayLength(value));
    //image path selection
    dispatch(
      setImage(
        imagePath === 'none'
          ? 'none'
          : `${value}${isImageChoose ? numberOfImage : numberOfImageLocal}`,
      ),
    );
    navigation.push('Render start', {
      imagePathFirstFigure: value,
      isStart: true,
    });
  };

  return (
    <View style={[styles.container]}>
      {arraySize.map((el: number) => {
        return (
          <PressableTextView
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
    alignContent: 'center',
    paddingHorizontal: dw(10),
    width: '100%',
    height: '100%',
  },
});
