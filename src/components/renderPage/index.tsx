import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {randomArrayFunc} from '../../common/functions/randomArray';
import {setArrayCurrentFunc} from '../../common/functions/setPositionArrayFunc';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  setArrayCurrent,
  setNull,
} from '../../redux/store/actionCreator/actionCreatorCurrentArray';
import {setPositionTarget} from '../../redux/store/actionCreator/actionCreatorPosition';
import {
  setCurrentLine,
  setIsOriginLine,
} from '../../redux/store/actionCreator/actionCreatorSequence';
import {
  setIsTimer,
  setIsTimerStart,
  setResetTimer,
} from '../../redux/store/actionCreator/actionCreatorTimer';
import {PositionType} from '../../types/puzzle';
import {TaimerComponent} from '../timer';
import {RenderComponent} from './components/renderComponent';
import {useIsFocused} from '@react-navigation/native';
import {RenderPageHeader} from './components/header';
import {RenderPageModal} from './components/modal';
import {setIsModalEnd} from '../../redux/store/actionCreator/actionCreatorModal';
import {dh} from '../../utils/dimensions';

interface RenderPageProps {
  navigation?: any;
  changeImageFunc?: () => void;
}

export const RenderPage: FC<RenderPageProps> = ({
  navigation,
  changeImageFunc,
}) => {
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  const {arrayCurrent, nullItem, arrayLength} = useAppSelector(
    reducer => reducer.currentArrayReducer,
  );

  const {imagePath, numberOfImage, isImageComponent, isImageChoose} =
    useAppSelector(reducer => reducer.imageSlice);

  const {isTheme} = useAppSelector(reducer => reducer.themeReducer);

  const {originLine, isOriginLine, currentLine} = useAppSelector(
    reducer => reducer.sequenceOfArrayReducer,
  );

  const {positionTarget} = useAppSelector(reducer => reducer.positionReducer);

  const {isModalRandom, isModalEnd} = useAppSelector(
    reducer => reducer.modalReducer,
  );

  const {isTimer, isTimerStart, isTimerPlug} = useAppSelector(
    reducer => reducer.timerSlice,
  );

  const [isModalImageCurrent, setIsModalImageCurrent] = useState(false);

  useEffect(() => {
    if (currentLine.length > 0) {
      dispatch(setIsOriginLine(originLine, currentLine));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine]);

  useEffect(() => {
    isOriginLine && isModalEndFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOriginLine]);

  useEffect(() => {
    !isFocused && dispatch(setIsTimer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onRandomArray = () => {
    dispatch(setArrayCurrent(randomArrayFunc([...arrayCurrent]), 'modal'));
    dispatch(setIsModalEnd(false));
    resetTimer();
  };

  const setPositionTargetNull = () => {
    dispatch(setPositionTarget({}));
  };

  const setPositionNull = (value: PositionType) => {
    dispatch(setNull(value));
  };

  const modalImageFunc = () => {
    setIsModalImageCurrent(!isModalImageCurrent);
  };

  const resetTimer = () => {
    dispatch(setResetTimer());
  };

  const startTimer = () => {
    dispatch(setIsTimerStart(true));
  };

  const stopTimer = () => {
    dispatch(setIsTimerStart(false));
  };

  const onPress = (data: PositionType, valueMove: any) => {
    setArrayCurrentFunc(
      arrayCurrent,
      data,
      valueMove,
      nullItem,
      arrayLength,
      setPositionTarget,
      setCurrentLine,
      dispatch,
    );
  };

  const goToMainFunc = () => {
    isModalEndFunc();
    navigation.push('Menu');
  };

  const isModalEndFunc = () => {
    dispatch(setIsModalEnd(!isModalEnd));
  };

  const RenderItem: any = (data: any) => {
    return (
      <RenderComponent
        data={data.item}
        isNullValue={data.item.id === arrayCurrent.length - 1}
        positionTarget={positionTarget}
        imagePath={imagePath}
        arrayLength={arrayLength}
        onPress={onPress}
        setPositionTargetNull={setPositionTargetNull}
        setPositionNull={setPositionNull}
      />
    );
  };

  return (
    <GestureHandlerRootView>
      <RenderPageModal
        isTheme={isTheme}
        isModalRandom={isModalRandom}
        isModalEnd={isModalEnd}
        isModalImageCurrent={isModalImageCurrent}
        numberOfImage={numberOfImage}
        onRandomArray={onRandomArray}
        modalImageFunc={modalImageFunc}
        changeImageFunc={changeImageFunc}
        goToMainFunc={goToMainFunc}
        isModalEndFunc={isModalEndFunc}
      />
      <RenderPageHeader
        isImageChoose={isImageChoose}
        isImageComponent={isImageComponent}
        isTheme={isTheme}
        numberOfImage={numberOfImage}
        changeImageFunc={changeImageFunc}
        modalImageFunc={modalImageFunc}
        onRandomArray={onRandomArray}
      />
      <FlatList
        data={arrayCurrent}
        renderItem={RenderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={arrayLength}
        key={arrayLength}
        contentContainerStyle={[
          styles.containerFlatList,
          imagePath === 'none' && styles.containerNone,
        ]}
      />
      <TaimerComponent
        isTimer={isTimer}
        isTimerStart={isTimerStart}
        isTimerPlug={isTimerPlug}
        isTheme={isTheme}
        resetTimer={resetTimer}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  containerFlatList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNone: {
    marginVertical: dh(30),
  },
});
