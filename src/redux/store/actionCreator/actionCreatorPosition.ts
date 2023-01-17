import {PositionType} from '../../../types/puzzle';
import {PositionSlice} from '../reducers/positionSlice';
import {AppDispatch} from '../store';

export const setPositionTarget = (value: Object) => (dispatch: AppDispatch) => {
  dispatch(PositionSlice.actions.setPositionTarget(value));
};

export const setPositionArray =
  (value: PositionType[]) => (dispatch: AppDispatch) => {
    dispatch(PositionSlice.actions.setPositionArray(value));
  };
