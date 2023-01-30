import React, {FC} from 'react';
import {GameSize} from '../common/gameSize';
import {sizeArrayClassic} from '../../constants/common';

interface ClassicGameProps {
  navigation?: any;
}

export const ClassicGame: FC<ClassicGameProps> = ({navigation}) => {
  return (
    <GameSize
      arraySize={sizeArrayClassic}
      imagePath={'none'}
      navigation={navigation}
    />
  );
};
