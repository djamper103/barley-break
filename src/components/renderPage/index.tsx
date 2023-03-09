import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
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
import {dw, width} from '../../utils/dimensions';

interface RenderPageProps {
  navigation?: any;
  changeImageFunc?: () => void;
  isModalEndFunc: () => void;
}

export const RenderPage: FC<RenderPageProps> = ({
  navigation,
  changeImageFunc,
  isModalEndFunc,
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

  //for timer
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  //comparing whether the current array sequence is the original array
  useEffect(() => {
    if (currentLine.length > 0) {
      dispatch(setIsOriginLine(originLine, currentLine));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine]);

  //if current array equals origin then show modal end
  useEffect(() => {
    isOriginLine && isModalEndFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOriginLine]);

  //when unmounting a component stop and reset timer
  useEffect(() => {
    !isFocused && dispatch(setIsTimer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  //random current array
  const onRandomArray = () => {
    dispatch(setArrayCurrent(randomArrayFunc([...arrayCurrent]), 'modal'));
    dispatch(setIsModalEnd(false));
    resetTimer();
  };

  //set null position coordinates
  const setPositionNull = (value: PositionType) => {
    dispatch(setNull(value));
  };

  //set image modal boolean value
  const modalImageFunc = () => {
    setIsModalImageCurrent(!isModalImageCurrent);
  };

  //reset timer
  const resetTimer = () => {
    dispatch(setResetTimer());
  };

  //start timer
  const startTimer = () => {
    dispatch(setIsTimerStart(true));
  };

  //stop timer
  const stopTimer = () => {
    dispatch(setIsTimerStart(false));
  };

  //called when you swipe an array cell
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

  //push to main menu
  const goToMainFunc = () => {
    dispatch(setIsModalEnd(false));
    isModalEndFunc();
    navigation.push('Menu');
  };

  //render array cell
  const RenderItem: any = (data: any) => {
    return (
      <RenderComponent
        data={data.item}
        isNullValue={data.item.id === arrayCurrent.length - 1}
        positionTarget={positionTarget}
        imagePath={imagePath}
        arrayLength={arrayLength}
        onPress={onPress}
        setPositionNull={setPositionNull}
      />
    );
  };

  return (
    <View style={[styles.container, isImageComponent && styles.containerImage]}>
      <RenderPageModal
        isTheme={isTheme}
        isModalRandom={isModalRandom}
        isModalEnd={isModalEnd}
        isModalImageCurrent={isModalImageCurrent}
        numberOfImage={numberOfImage}
        seconds={seconds}
        minutes={minutes}
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
        contentContainerStyle={[styles.containerFlatList]}
      />
      <TaimerComponent
        isTimer={isTimer}
        isTimerStart={isTimerStart}
        isTimerPlug={isTimerPlug}
        isTheme={isTheme}
        seconds={seconds}
        minutes={minutes}
        setSeconds={setSeconds}
        setMinutes={setMinutes}
        resetTimer={resetTimer}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: dw(10),
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: '29%',
  },
  containerImage: {
    height: '100%',
    paddingBottom: '4%',
  },
  containerFlatList: {
    height: '100%',
    justifyContent: 'center',
  },
});
