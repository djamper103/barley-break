import React, {FC, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {randomArrayFunc} from '../../common/functions/randomArray';
import {setArrayCurrentFunc} from '../../common/functions/setPositionArrayFunc';
import {ModalContainer} from '../../common/modal';
import {IMAGES_BY_KEYS} from '../../constants/images';
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
import {dh, dw} from '../../utils/dimensions';
import {BigImageComponent} from '../bigImageComponent';
import {ButtonContainer} from '../common/button';
import {TaimerComponent} from '../timer';
import {ZoomImageComponent} from '../zoomImageComponent';
import {RenderComponent} from './components/renderComponent';
import {useIsFocused} from '@react-navigation/native';

interface RenderPageProps {
  changeImageFunc?: () => void;
}

export const RenderPage: FC<RenderPageProps> = ({changeImageFunc}) => {
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

  const {isModalRandom} = useAppSelector(reducer => reducer.modalReducer);

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
    isOriginLine &&
      (Alert.alert('Congratulation you won this game'),
      dispatch(setIsTimer(false)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOriginLine]);

  useEffect(() => {
    !isFocused && dispatch(setIsTimer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onRandomArray = () => {
    dispatch(setArrayCurrent(randomArrayFunc([...arrayCurrent]), 'modal'));
    resetTimer();
  };

  const setPositionTargetNull = () => {
    dispatch(setPositionTarget({}));
  };

  const setPositionNull = (value: PositionType) => {
    dispatch(setNull(value));
  };

  const onImage = (value?: boolean) => {
    setIsModalImageCurrent(value !== undefined ? value : false);
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
      <ModalContainer
        isModal={isModalImageCurrent}
        onPress={onImage}
        containerStyle={[
          styles.containerModal,
          isTheme && styles.containerModalTheme,
        ]}>
        <ZoomImageComponent
          imageIcon={IMAGES_BY_KEYS[numberOfImage]}
          containerStyle={styles.containerZoomImage}
        />
      </ModalContainer>

      <ModalContainer isModal={isModalRandom}>
        <ButtonContainer
          onPress={onRandomArray}
          text={'Random array'}
          containerStyle={[
            styles.containerModal,
            isTheme && styles.containerModalTheme,
          ]}
        />
      </ModalContainer>

      <View style={styles.containerTop}>
        {isImageComponent && (
          <BigImageComponent
            isTheme={isTheme}
            imageIcon={IMAGES_BY_KEYS[numberOfImage]}
            onPress={onImage}
          />
        )}
        <View style={styles.containerTopRight}>
          {isImageComponent && !isImageChoose && (
            <ButtonContainer onPress={changeImageFunc} text={'Change image'} />
          )}
          <ButtonContainer onPress={onRandomArray} text={'Random array'} />
        </View>
      </View>
      <FlatList
        data={arrayCurrent}
        renderItem={RenderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={arrayLength}
        key={arrayLength}
        contentContainerStyle={styles.containerFlatList}
      />
      <TaimerComponent
        isTimer={isTimer}
        isTimerStart={isTimerStart}
        isTimerPlug={isTimerPlug}
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
    marginTop: dh(20),
  },
  containerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerTopRight: {
    flexDirection: 'column',
  },
  containerModal: {
    backgroundColor: 'rgba(57, 50, 54, 0.4)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModalTheme: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  containerZoomImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dw(400),
    height: dh(300),
  },
});
