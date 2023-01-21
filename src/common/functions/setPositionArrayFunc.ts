import {PositionType, PuzzleRenderArray} from '../../types/puzzle';
import {findLineRowFunc} from './findLineRowFunc';
import {newArrayFunc} from './newArrayFunc';

export const setArrayCurrentFunc = (
  data: PuzzleRenderArray | PositionType,
  valueMove: any,
  nullItem: PuzzleRenderArray | PositionType | any,
  arrayLength: number,
  positionArray: PositionType[],
  setPositionArray: (value: any) => void,
  setPositionTarget: (value: any) => void,
  setCurrentLine: (value: number[]) => void,
  dispatch: (value: any) => void,
) => {
  const positionType =
    Math.abs(valueMove.x) > Math.abs(valueMove.y) ? 'x' : 'y';
  const {
    countLineTarget,
    countLineNull,
    rowTarget,
    rowNull,
    valueTarget,
    valueNull,
    array,
  } = findLineRowFunc(data, nullItem, arrayLength, positionArray);

  const {arrCurrent, originLine} = newArrayFunc(array, valueTarget, valueNull);

  const setPositionFunc = () => {
    dispatch(setCurrentLine(originLine));
    dispatch(setPositionArray(arrCurrent));
  };

  if (countLineTarget === countLineNull) {
    if (rowNull + 1 === rowTarget || rowNull - 1 === rowTarget) {
      if (
        (positionType === 'x' &&
          valueNull.x - valueTarget.x > 0 &&
          valueMove.x > 0) ||
        (valueNull.x - valueTarget.x < 0 && valueMove.x < 0)
      ) {
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
    }
  } else {
    if (
      countLineNull + 1 === countLineTarget ||
      countLineNull - 1 === countLineTarget
    ) {
      if (
        (positionType === 'y' &&
          valueNull.y - valueTarget.y > 0 &&
          valueMove.y > 0) ||
        (valueNull.y - valueTarget.y < 0 && valueMove.y < 0)
      ) {
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
  }
};
