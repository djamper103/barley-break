import {soundFunc} from '../../../common/functions/soundFunc';
import {PositionType} from '../../../types/puzzle';
import {ArrayCurrentSlice} from '../reducers/arraySlice';
import {PositionSlice} from '../reducers/positionSlice';
import {AppDispatch} from '../store';

export const setPositionTarget =
  (value: any, array?: PositionType[]) => (dispatch: AppDispatch) => {
    dispatch(PositionSlice.actions.setPositionTarget(value));
    value.id !== undefined && soundFunc('DEFAULT_MOVE', 1);
    array &&
      setTimeout(() => {
        dispatch(PositionSlice.actions.setPositionTarget({}));
        dispatch(ArrayCurrentSlice.actions.setArrayCurrent(array));
      }, 700);
  };
