import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {setIsModal} from '../../redux/store/actionCreator/actionCreatorModal';
import {RenderPage} from '../renderPage';
import {setArrayStart} from '../../redux/store/actionCreator/actionCreatorCurrentArray';
import {setOriginLine} from '../../redux/store/actionCreator/actionCreatorSequence';

interface RenderStartProps {
  route?: any;
  props?: any;
}

export const RenderStart: FC<RenderStartProps> = ({}) => {
  const {arrayLength} = useAppSelector(reducer => reducer.currentArrayReducer);
  const {imagePath} = useAppSelector(reducer => reducer.imageSlice);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setArrayStart(arrayLength, imagePath, setOriginLine, dispatch));
    dispatch(setIsModal(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RenderPage />;
};
