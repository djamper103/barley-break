import React, {FC, useEffect} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {randomArrayFunc} from '../../common/functions/randomArray';
import {setArrayCurrentFunc} from '../../common/functions/setPositionArrayFunc';
import {ModalContainer} from '../../common/modal';
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
import {PositionType} from '../../types/puzzle';
import {dh} from '../../utils/dimensions';
import {ButtonContainer} from '../common/button';

import {RenderComponent} from './components/renderComponent';

interface RenderPageProps {}

export const RenderPage: FC<RenderPageProps> = ({}) => {
  const dispatch = useAppDispatch();

  const {
    arrayCurrent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    arrayRandomStart,
    nullItem,
    arrayLength,
  } = useAppSelector(reducer => reducer.currentArrayReducer);

  const {imagePath} = useAppSelector(reducer => reducer.imageSlice);

  const {originLine, isOriginLine, currentLine} = useAppSelector(
    reducer => reducer.sequenceOfArrayReducer,
  );

  const {positionTarget} = useAppSelector(reducer => reducer.positionReducer);

  const {isModal} = useAppSelector(reducer => reducer.modalReducer);

  useEffect(() => {
    if (currentLine.length > 0) {
      dispatch(setIsOriginLine(originLine, currentLine));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine]);

  useEffect(() => {
    isOriginLine && Alert.alert('Congratulation you won this game');
  }, [isOriginLine]);

  const onRandomArray = () => {
    // arrayRandomStart.length > 0
    //   ? dispatch(setArrayCurrent(arrayRandomStart, 'modal', true))
    //   :
    dispatch(setArrayCurrent(randomArrayFunc([...arrayCurrent]), 'modal'));
  };

  const setPositionTargetNull = () => {
    dispatch(setPositionTarget({}));
  };

  const setPositionNull = (value: PositionType) => {
    dispatch(setNull(value));
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
          key={arrayLength}
          contentContainerStyle={styles.container}
        />
      </GestureHandlerRootView>
      <ButtonContainer onPress={onRandomArray} text={'Random array'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: dh(150),
  },
  containerModal: {
    backgroundColor: 'rgba(57, 50, 54, 0.4)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
