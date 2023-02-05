import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {setIsModalRandom} from '../../redux/store/actionCreator/actionCreatorModal';
import {RenderPage} from '../renderPage';
import {setArrayStart} from '../../redux/store/actionCreator/actionCreatorCurrentArray';
import {setOriginLine} from '../../redux/store/actionCreator/actionCreatorSequence';
import {randomInteger} from '../../common/functions/randomInteger';
import {setNumberOfImage} from '../../redux/store/actionCreator/actionCreatorImage';

interface RenderStartProps {
  route?: any;
  props?: any;
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
  return <RenderPage changeImageFunc={changeImageFunc} />;
};
