import {ModalSlice} from '../reducers/modalSlice';
import {AppDispatch} from '../store';

export const setIsModal = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(ModalSlice.actions.setIsModal(value));
};
