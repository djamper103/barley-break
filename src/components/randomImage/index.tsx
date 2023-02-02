import React, {FC, useEffect} from 'react';
import {GameSize} from '../common/gameSize';
import {sizeArrayImages} from '../../constants/common';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {setIsImageComponent} from '../../redux/store/actionCreator/actionCreatorImage';

interface RandomImageGameProps {
  navigation?: any;
}

export const RandomImageGame: FC<RandomImageGameProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {isImageComponent} = useAppSelector(reducer => reducer.imageSlice);

  useEffect(() => {
    isImageComponent && dispatch(setIsImageComponent(false));
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
