import {ModalSlice} from '../reducers/modalSlice';
import {AppDispatch} from '../store';

export const setIsModalRandom = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(ModalSlice.actions.setIsModalRandom(value));
};
