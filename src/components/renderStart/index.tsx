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
  const {isModalEnd} = useAppSelector(reducer => reducer.modalReducer);

  const dispatch = useAppDispatch();

  //set start array and random arrat button
  useEffect(() => {
    dispatch(setArrayStart(arrayLength, imagePath, setOriginLine, dispatch));
    dispatch(setIsModalRandom(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //set modal end value
  const isModalEndFunc = (value?: boolean) => {
    dispatch(setIsModalEnd(value === undefined ? !isModalEnd : value));
  };

  //set new image, reset and stop timer
  const changeImageFunc = () => {
    isModalEndFunc(false);
    dispatch(setResetTimer());
    dispatch(setIsModalEnd(false));
    let numberOfImageLocal = randomInteger(1, 4);
    dispatch(
      setArrayStart(
        arrayLength,
        `${props[0].route.params.imagePathFirstFigure}${numberOfImageLocal}`,
        setOriginLine,
        dispatch,
        'new image',
      ),
    );
    dispatch(setNumberOfImage(numberOfImageLocal));
  };
  return (
    <RenderPage
      navigation={props[0].navigation}
      changeImageFunc={changeImageFunc}
      isModalEndFunc={isModalEndFunc}
    />
  );
};
