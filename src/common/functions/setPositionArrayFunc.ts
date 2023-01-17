import {PositionType, PuzzleRenderArray} from '../../types/puzzle';
import {findLineRowFunc} from './findLineRowFunc';
import {newArrayFunc} from './newArrayFunc';

export const setArrayCurrentFunc = (
  value: PuzzleRenderArray | PositionType,
  nullItem: PuzzleRenderArray | PositionType | any,
  arrayLength: number,
  positionArray: PositionType[],
  setPositionArray: (value: any) => void,
  setPositionTarget: (value: any) => void,
  setCurrentLine: (value: number[]) => void,
  dispatch: (value: any) => void,
) => {
  const {
    countLineTarget,
    countLineNull,
    rowTarget,
    rowNull,
    valueTarget,
    valueNull,
    array,
  } = findLineRowFunc(value, nullItem, arrayLength, positionArray);

  const {arrCurrent, originLine} = newArrayFunc(array, valueTarget, valueNull);

  const setPositionFunc = () => {
    dispatch(setCurrentLine(originLine));
    dispatch(setPositionArray(arrCurrent));
  };

  if (countLineTarget === countLineNull) {
    if (rowNull + 1 === rowTarget || rowNull - 1 === rowTarget) {
      const positionType = 'x';
      dispatch(
        setPositionTarget({
          id: valueTarget.id,
          x: valueNull.x - valueTarget.x,
          y: valueNull.y,
          positionType,
        }),
      );
      setPositionFunc();
    }
  } else if (rowNull === rowTarget) {
    if (
      countLineNull + 1 === countLineTarget ||
      countLineNull - 1 === countLineTarget
    ) {
      const positionType = 'y';
      dispatch(
        setPositionTarget({
          id: valueTarget.id,
          x: valueNull.x,
          y: valueNull.y - valueTarget.y,
          positionType,
        }),
      );
      setPositionFunc();
    }
  }
};
