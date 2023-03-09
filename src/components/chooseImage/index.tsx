import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {PressableTextView} from '../../common/pressableTextView';
import {IMAGES_BY_KEYS} from '../../constants/images';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  setAmountArray,
  setIsImageChoose,
  setIsImageComponent,
  setNumberOfImage,
} from '../../redux/store/actionCreator/actionCreatorImage';
import {dw} from '../../utils/dimensions';

interface CategoriesProps {
  navigation?: any;
}

export const ChooseImage: FC<CategoriesProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {imageRandomAmount, imageAmountArray, isImageComponent, isImageChoose} =
    useAppSelector(reducer => reducer.imageSlice);
  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  useEffect(() => {
    //setting the size of the array that is displayed to select the size of the field and its type
    dispatch(setAmountArray(imageRandomAmount));
    !isImageChoose && dispatch(setIsImageChoose(true));
    !isImageComponent && dispatch(setIsImageComponent(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //select image number and switch to field size selection
  const onPress = (value: {id: number}) => {
    dispatch(setNumberOfImage(value.id));
    navigation.push('Game size', {type: 'wadw'});
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
              containerStyle={isTheme && styles.containerStyleTheme}
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
    paddingHorizontal: dw(10),
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  containerStyleTheme: {
    elevation: 5,
  },
});
