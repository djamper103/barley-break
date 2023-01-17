import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {randomArrayFunc} from '../common/functions/randomArray';
import {setArrayCurrentFunc} from '../common/functions/setPositionArrayFunc';
import {ModalContainer} from '../common/modal';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
  setArrayCurrent,
  setArrayStart,
} from '../redux/store/actionCreator/actionCreatorCurrentArray';
import {setIsModal} from '../redux/store/actionCreator/actionCreatorModal';
import {
  setPositionArray,
  setPositionTarget,
} from '../redux/store/actionCreator/actionCreatorPosition';

import {
  setCurrentLine,
  setIsOriginLine,
  setOriginLine,
} from '../redux/store/actionCreator/actionCreatorSequence';
import {PositionType, PuzzleRenderArray} from '../types/puzzle';
import {ButtonContainer} from './common/button';

import {RenderComponent} from './renderComponent';

interface PuzzleGameProps {
  arrayLength?: number;
  imagePath?: string;
}

export const PuzzleGame: FC<PuzzleGameProps> = ({}) => {
  const dispatch = useAppDispatch();

  const {arrayCurrent, nullItem, arrayLength, imagePath} = useAppSelector(
    reducer => reducer.currentArrayReducer,
  );

  const {originLine, currentLine, isOriginLine} = useAppSelector(
    reducer => reducer.sequenceOfArrayReducer,
  );

  const {positionTarget, positionArray} = useAppSelector(
    reducer => reducer.positionReducer,
  );

  const {isModal} = useAppSelector(reducer => reducer.modalReducer);

  const [positionArrayCurrent, setPositionArrayCurrent] = useState<
    PositionType[]
  >([]);

  useEffect(() => {
    dispatch(setArrayStart(arrayLength, imagePath, setOriginLine, dispatch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentLine.length > 0) {
      dispatch(setIsOriginLine(originLine, currentLine));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine]);

  useEffect(() => {
    if (
      positionArrayCurrent.length !== 0 &&
      positionArrayCurrent.length === arrayCurrent.length
    ) {
      dispatch(setPositionArray(positionArrayCurrent));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionArrayCurrent]);

  const onRandomArray = () => {
    dispatch(setPositionArray([]));
    dispatch(setArrayCurrent(randomArrayFunc([...arrayCurrent])));
    dispatch(setIsModal(false));
  };

  const positionArrayFunc = (value: any) => {
    if (positionArray.length !== arrayCurrent.length) {
      if (value.x !== undefined || value.y !== undefined) {
        setPositionArrayCurrent((state: any) => [...state, value]);
      }
    }
  };

  const setPositionTargetNull = () => {
    dispatch(setPositionTarget({}));
  };

  const arrayCurrentFunc = () => {
    setTimeout(() => {
      dispatch(setArrayCurrent(positionArray));
    }, 600);
  };

  const onPress = (value: PuzzleRenderArray) => {
    setArrayCurrentFunc(
      value,
      nullItem,
      arrayLength,
      positionArray,
      setPositionArray,
      setPositionTarget,
      setCurrentLine,
      dispatch,
    );
  };

  console.log(isOriginLine && isOriginLine);

  const RenderItem: any = (data: any) => {
    return (
      <RenderComponent
        data={data.item}
        isNullValue={data.item.id === arrayCurrent.length - 1}
        positionTarget={positionTarget}
        onPress={onPress}
        positionArrayFunc={positionArrayFunc}
        setPositionTargetNull={setPositionTargetNull}
        setArrayCurrentFunc={arrayCurrentFunc}
      />
    );
  };
  return (
    <View>
      {isModal && (
        <ModalContainer isModal={isModal}>
          <ButtonContainer onPress={onRandomArray} text={'Random array'} />
        </ModalContainer>
      )}
      <FlatList
        data={arrayCurrent}
        renderItem={RenderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={arrayLength}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
    paddingVertical: 10,
    borderColor: 'green',
    borderWidth: 2,
  },
  text: {
    color: 'transparent',
  },
  image: {
    width: 70,
    height: 70,
  },
});