import {soundFunc} from '../../../common/functions/soundFunc';
import {ModalSlice} from '../reducers/modalSlice';
import {SequenceOfArraySlice} from '../reducers/sequenceOfArraySlice';
import {TimerSlice} from '../reducers/timerSlice';
import {AppDispatch} from '../store';

export const setIsModalRandom = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(ModalSlice.actions.setIsModalRandom(value));
};

export const setIsModalEnd = (value: boolean) => (dispatch: AppDispatch) => {
  if (value) {
    dispatch(TimerSlice.actions.setIsTimer(false));
    dispatch(SequenceOfArraySlice.actions.setIsOriginLine(false));
    soundFunc('DEFAULT_END', 1);
  }
  dispatch(ModalSlice.actions.setIsModalEnd(value));
};
