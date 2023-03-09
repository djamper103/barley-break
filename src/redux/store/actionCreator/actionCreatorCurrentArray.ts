import {randomArrayFunc} from '../../../common/functions/randomArray';
import {ArrayCurrentSlice} from '../reducers/arraySlice';
import {ImageSlice} from '../reducers/imageSlice';
import {ModalSlice} from '../reducers/modalSlice';
import {AppDispatch} from '../store';

//set array current if type = modal show modal random
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
    type?: string,
  ) =>
  (dispatch: AppDispatch) => {
    const lineArray: any = [];

    //generate new array with current length
    const arrayGenerate = new Array(arrayLength * arrayLength)
      .fill(0)
      .map((_, index) => {
        lineArray.push(index);
        return {id: index, path: `${imagePath}${index}`};
      });

    //set origin array sequence
    dispatchCurrent(setOriginLine(lineArray));

    if (type !== undefined && type === 'new image') {
      //change image
      const newImage = randomArrayFunc([...arrayGenerate]);
      dispatch(
        ArrayCurrentSlice.actions.setArrayCurrent({
          array: newImage,
          nullItem: newImage[newImage.length - 1],
          arrayLength,
        }),
      );
    } else {
      //set start array
      dispatch(
        ArrayCurrentSlice.actions.setArrayCurrent({
          array: arrayGenerate,
          nullItem: arrayGenerate[arrayGenerate.length - 1],
          arrayLength,
        }),
      );
    }

    dispatch(ImageSlice.actions.setImage(imagePath));
  };

export const setNull = (value: Object) => (dispatch: AppDispatch) => {
  dispatch(ArrayCurrentSlice.actions.setNull(value));
};

export const setArrayLength = (value: number) => (dispatch: AppDispatch) => {
  dispatch(ArrayCurrentSlice.actions.setArrayLength(value));
};
