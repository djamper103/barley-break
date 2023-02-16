import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {
  setIsModalEnd,
  setIsModalRandom,
} from '../../redux/store/actionCreator/actionCreatorModal';
import {RenderPage} from '../renderPage';
import {setArrayStart} from '../../redux/store/actionCreator/actionCreatorCurrentArray';
import {setOriginLine} from '../../redux/store/actionCreator/actionCreatorSequence';
import {randomInteger} from '../../common/functions/randomInteger';
import {setNumberOfImage} from '../../redux/store/actionCreator/actionCreatorImage';
import {setResetTimer} from '../../redux/store/actionCreator/actionCreatorTimer';

interface RenderStartProps {
  route?: any;
  props?: any;
  navigation?: any;
}

export const RenderStart: FC<RenderStartProps> = (...props) => {
  const {arrayLength} = useAppSelector(reducer => reducer.currentArrayReducer);
  const {imagePath} = useAppSelector(reducer => reducer.imageSlice);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setArrayStart(arrayLength, imagePath, setOriginLine, dispatch));
    dispatch(setIsModalRandom(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const changeImageFunc = () => {
    dispatch(setResetTimer());
    dispatch(setIsModalEnd(false));
    let numberOfImageLocal = randomInteger(1, 4);
    dispatch(
      setArrayStart(
        arrayLength,
        `${props[0].route.params.imagePathFirstFigure}${numberOfImageLocal}`,
        setOriginLine,
        dispatch,
      ),
    );
    dispatch(setNumberOfImage(numberOfImageLocal));
  };
  return (
    <RenderPage
      navigation={props[0].navigation}
      changeImageFunc={changeImageFunc}
    />
  );
};
