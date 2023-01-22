import React, {FC, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
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
import {dh} from '../utils/dimensions';
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

  const {originLine, isOriginLine, currentLine} = useAppSelector(
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
    setPositionArrayCurrent([]);
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

  const onPress = (data: PuzzleRenderArray, valueMove: any) => {
    setArrayCurrentFunc(
      data,
      valueMove,
      nullItem,
      arrayLength,
      positionArray,
      setPositionArray,
      setPositionTarget,
      setCurrentLine,
      dispatch,
    );
  };

  useEffect(() => {
    isOriginLine && Alert.alert('Congratulation you won this game');
  }, [isOriginLine]);

  const RenderItem: any = (data: any) => {
    return (
      <RenderComponent
        data={data.item}
        isNullValue={data.item.id === arrayCurrent.length - 1}
        positionTarget={positionTarget}
        onPress={onPress}
        positionArrayFunc={positionArrayFunc}
        setPositionTargetNull={setPositionTargetNull}
      />
    );
  };
  return (
    <View>
      {isModal && (
        <ModalContainer isModal={isModal}>
          <ButtonContainer
            onPress={onRandomArray}
            text={'Random array'}
            containerStyle={styles.containerModal}
          />
        </ModalContainer>
      )}
      <GestureHandlerRootView>
        <FlatList
          data={arrayCurrent}
          renderItem={RenderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={arrayLength}
          contentContainerStyle={styles.container}
        />
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: dh(240),
    // paddingVertical: 10,
    // borderColor: 'green',
    // borderWidth: 2,
  },
  containerModal: {
    backgroundColor: 'rgba(57, 50, 54, 0.4)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'transparent',
  },
  image: {
    width: 70,
    height: 70,
  },
});
