import {ImageSlice} from '../reducers/imageSlice';
import {AppDispatch} from '../store';

export const setAmountArray = (value: number) => (dispatch: AppDispatch) => {
  const arrayGenerate = new Array(value).fill(0).map((_, index) => {
    return {id: index + 1};
  });
  dispatch(ImageSlice.actions.setAmountArray(arrayGenerate));
};

export const setImage = (value: string) => (dispatch: AppDispatch) => {
  dispatch(ImageSlice.actions.setImage(value));
};

export const setNumberOfImage = (value: number) => (dispatch: AppDispatch) => {
  dispatch(ImageSlice.actions.setNumberOfImage(value));
};

export const setIsImageComponent =
  (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(ImageSlice.actions.setIsImageComponent(value));
  };

export const setIsImageChoose = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(ImageSlice.actions.setIsImageChoose(value));
};
