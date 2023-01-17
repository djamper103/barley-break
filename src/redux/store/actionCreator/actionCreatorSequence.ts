import {SequenceOfArraySlice} from '../reducers/sequenceOfArraySlice';
import {AppDispatch} from '../store';

export const setOriginLine = (array: number[]) => (dispatch: AppDispatch) => {
  dispatch(SequenceOfArraySlice.actions.setOriginLine(array));
};

export const setCurrentLine =
  (currentLine: number[]) => (dispatch: AppDispatch) => {
    dispatch(SequenceOfArraySlice.actions.setCurrentLine(currentLine));
  };

export const setIsOriginLine =
  (originLine: number[], currentLine: number[]) => (dispatch: AppDispatch) => {
    const result = JSON.stringify(originLine) === JSON.stringify(currentLine);
    dispatch(SequenceOfArraySlice.actions.setIsOriginLine(result));
  };
