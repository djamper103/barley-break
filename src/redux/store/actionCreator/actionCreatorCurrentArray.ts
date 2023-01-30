import {randomArrayFunc} from '../../../common/functions/randomArray';
import {ArrayCurrentSlice} from '../reducers/arraySlice';
import {ModalSlice} from '../reducers/modalSlice';
import {AppDispatch} from '../store';

export const setArrayCurrent =
  (array: any[], type?: string, isArrayRandomStart?: boolean) =>
  (dispatch: AppDispatch) => {
    dispatch(ArrayCurrentSlice.actions.setArrayCurrent(array));
    isArrayRandomStart &&
      dispatch(ArrayCurrentSlice.actions.setArrayRandomStart([]));
    type === 'modal' && dispatch(ModalSlice.actions.setIsModal(false));
  };

export const setArrayStart =
  (
    arrayLength: number,
    imagePath: string,
    setOriginLine: any,
    dispatchCurrent: (value: number[]) => void,
  ) =>
  (dispatch: AppDispatch) => {
    const lineArray: any = [];
    const arrayGenerate = new Array(arrayLength * arrayLength)
      .fill(0)
      .map((_, index) => {
        lineArray.push(index);
        return {id: index, url: `${imagePath}${index}`};
      });
    dispatchCurrent(setOriginLine(lineArray));
    dispatch(
      ArrayCurrentSlice.actions.setArrayCurrent({
        array: arrayGenerate,
        nullItem: arrayGenerate[arrayGenerate.length - 1],
        arrayLength,
        imagePath,
      }),
    );
    dispatch(
      ArrayCurrentSlice.actions.setArrayRandomStart(
        randomArrayFunc([...arrayGenerate]),
      ),
    );
  };

export const setNull = (value: Object) => (dispatch: AppDispatch) => {
  dispatch(ArrayCurrentSlice.actions.setNull(value));
};
