/* eslint-disable @typescript-eslint/no-unused-vars */
import {randomArrayFunc} from '../../../common/functions/randomArray';
import {randomInteger} from '../../../common/functions/randomInteger';
import {ArrayCurrentSlice} from '../reducers/arraySlice';
import {ImageSlice} from '../reducers/imageSlice';
import {ModalSlice} from '../reducers/modalSlice';
import {AppDispatch} from '../store';

export const setArrayCurrent =
  (array: any[], type?: string) => (dispatch: AppDispatch) => {
    dispatch(ArrayCurrentSlice.actions.setArrayCurrent(array));
    type === 'modal' && dispatch(ModalSlice.actions.setIsModalRandom(false));
  };

export const setArrayStart =
  (
    arrayLength: number,
    imagePath: string,
    setOriginLine: any,
    dispatchCurrent: (value: number[]) => void,
    changeImage?: string,
  ) =>
  (dispatch: AppDispatch) => {
    const lineArray: any = [];
    const arrayGenerate = new Array(arrayLength * arrayLength)
      .fill(0)
      .map((_, index) => {
        lineArray.push(index);
        return {id: index, path: `${imagePath}${index}`};
      });
    dispatchCurrent(setOriginLine(lineArray));
    dispatch(
      ArrayCurrentSlice.actions.setArrayCurrent({
        array: arrayGenerate,
        nullItem: arrayGenerate[arrayGenerate.length - 1],
        arrayLength,
      }),
    );
    dispatch(ImageSlice.actions.setImage(imagePath));
  };

export const setNull = (value: Object) => (dispatch: AppDispatch) => {
  dispatch(ArrayCurrentSlice.actions.setNull(value));
};

export const setArrayLength = (value: number) => (dispatch: AppDispatch) => {
  dispatch(ArrayCurrentSlice.actions.setArrayLength(value));
};
