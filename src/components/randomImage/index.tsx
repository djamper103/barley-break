import React, {FC} from 'react';
import {GameSize} from '../common/gameSize';
import {sizeArrayImages} from '../../constants/common';

interface RandomImageGameProps {
  navigation?: any;
}

export const RandomImageGame: FC<RandomImageGameProps> = ({navigation}) => {
  const randomFigure: number = 1;
  return (
    <GameSize
      arraySize={sizeArrayImages}
      imagePath={`PAZZLE_ICON_${randomFigure}_`}
      navigation={navigation}
    />
  );
};
