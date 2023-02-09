import {TimerSlice} from '../reducers/timerSlice';
import {AppDispatch} from '../store';

export const setIsTimer = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(TimerSlice.actions.setIsTimer(value));
};

export const setIsTimerStart = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(TimerSlice.actions.setIsTimerPlug(!value));
  dispatch(TimerSlice.actions.setIsTimerStart(value));
};

export const setResetTimer = () => (dispatch: AppDispatch) => {
  dispatch(TimerSlice.actions.setIsTimer(false));
  setTimeout(() => {
    dispatch(TimerSlice.actions.setIsTimer(true));
  }, 10);
};
