import {PositionType} from '../../../types/puzzle';
import {ArrayCurrentSlice} from '../reducers/arraySlice';
import {PositionSlice} from '../reducers/positionSlice';
import {AppDispatch} from '../store';

export const setPositionTarget =
  (value: Object, array?: PositionType[]) => (dispatch: AppDispatch) => {
    dispatch(PositionSlice.actions.setPositionTarget(value));
    array &&
      setTimeout(() => {
        dispatch(ArrayCurrentSlice.actions.setArrayCurrent(array));
      }, 500);
  };

export const setPositionArray =
  (value: PositionType[]) => (dispatch: AppDispatch) => {
    dispatch(PositionSlice.actions.setPositionArray(value));
  };
