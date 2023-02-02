import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {PressableTextView} from '../../common/pressableTextView';
import {IMAGES_BY_KEYS} from '../../constants/images';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  setAmountArray,
  setIsImageComponent,
  setNumberOfImage,
} from '../../redux/store/actionCreator/actionCreatorImage';
import {dh, dw} from '../../utils/dimensions';

interface CategoriesProps {
  navigation?: any;
}

export const ChooseImage: FC<CategoriesProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {imageRandomAmount, imageAmountArray} = useAppSelector(
    reducer => reducer.imageSlice,
  );
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  useEffect(() => {
    dispatch(setAmountArray(imageRandomAmount));
    dispatch(setIsImageComponent(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPress = (value: {id: number}) => {
    dispatch(setNumberOfImage(value.id));
    navigation.push('Game size');
  };
  return (
    <View style={styles.container}>
      {imageAmountArray.length > 0 &&
        imageAmountArray.map((el: any) => {
          return (
            <PressableTextView
              key={el.id}
              data={el}
              type={'image'}
              isTheme={isTheme}
              imageIcon={IMAGES_BY_KEYS[el.id]}
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
    paddingHorizontal: dw(20),
    marginTop: dh(150),
  },
});
