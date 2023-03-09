import React, {FC, useEffect} from 'react';
import {GameSize} from '../common/gameSize';
import {sizeArrayImages} from '../../constants/common';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  setIsImageChoose,
  setIsImageComponent,
} from '../../redux/store/actionCreator/actionCreatorImage';

interface RandomImageGameProps {
  navigation?: any;
}

export const RandomImageGame: FC<RandomImageGameProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {isImageChoose, isImageComponent} = useAppSelector(
    reducer => reducer.imageSlice,
  );

  //setting field type image
  useEffect(() => {
    isImageChoose && dispatch(setIsImageChoose(false));
    !isImageComponent && dispatch(setIsImageComponent(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GameSize
      arraySize={sizeArrayImages}
      imagePath={'IMAGES_BY_KEYS'}
      navigation={navigation}
    />
  );
};
