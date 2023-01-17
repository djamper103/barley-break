import {ArrayCurrentSlice} from '../reducers/arraySlice';
import {AppDispatch} from '../store';

export const setArrayCurrent = (array: any[]) => (dispatch: AppDispatch) => {
  dispatch(ArrayCurrentSlice.actions.setArrayCurrent(array));
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
      }),
    );
  };
