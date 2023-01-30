import React, {FC, useEffect} from 'react';
import {useAppDispatch} from '../../hooks/redux';
import {setIsModal} from '../../redux/store/actionCreator/actionCreatorModal';
import {RenderPage} from '../renderPage';
import {setArrayStart} from '../../redux/store/actionCreator/actionCreatorCurrentArray';
import {setOriginLine} from '../../redux/store/actionCreator/actionCreatorSequence';

interface RenderStartProps {
  route?: any;
  props?: any;
}

export const RenderStart: FC<RenderStartProps> = (...props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setArrayStart(
        props[0].route.params.arrayLength,
        props[0].route.params.imagePath,
        setOriginLine,
        dispatch,
      ),
    );
    dispatch(setIsModal(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <RenderPage />;
};
