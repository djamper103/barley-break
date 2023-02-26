import React, {FC, useEffect} from 'react';
import {GameSize} from '../common/gameSize';
import {sizeArrayClassic} from '../../constants/common';
import {setIsImageComponent} from '../../redux/store/actionCreator/actionCreatorImage';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';

interface ClassicGameProps {
  navigation?: any;
}

export const ClassicGame: FC<ClassicGameProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const {isImageComponent} = useAppSelector(reducer => reducer.imageSlice);

  useEffect(() => {
    isImageComponent && dispatch(setIsImageComponent(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImageComponent]);
  return (
    <GameSize
      arraySize={sizeArrayClassic}
      imagePath={'none'}
      navigation={navigation}
    />
  );
};
