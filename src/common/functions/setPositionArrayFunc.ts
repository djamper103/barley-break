import {PositionType} from '../../types/puzzle';
import {findLineRowFunc} from './findLineRowFunc';
import {newArrayFunc} from './newArrayFunc';

export const setArrayCurrentFunc = (
  arrayCurrent: any[],
  valueTarget: PositionType,
  valueMove: any,
  valueNull: PositionType,
  arrayLength: number,
  setPositionTarget: (value: any, array: any) => void,
  setCurrentLine: (value: number[]) => void,
  dispatch: (value: any) => void,
) => {
  const {countLineTarget, countLineNull, rowTarget, rowNull, array} =
    findLineRowFunc(valueTarget, valueNull, arrayLength, arrayCurrent);

  const {arrCurrent, originLine} = newArrayFunc(
    [...array],
    valueTarget,
    valueNull,
  );

  const setPositionFunc = () => {
    dispatch(setCurrentLine(originLine));
  };

  const positionType =
    Math.abs(valueMove.translationX) > Math.abs(valueMove.translationY)
      ? 'x'
      : 'y';

  if (countLineTarget === countLineNull) {
    if (rowNull + 1 === rowTarget || rowNull - 1 === rowTarget) {
      if (
        positionType === 'x' &&
        valueMove.y < valueTarget.height &&
        ((valueNull.x - valueTarget.x > 0 && valueMove.translationX > 0) ||
          (valueNull.x - valueTarget.x < 0 && valueMove.translationX < 0))
      ) {
        dispatch(
          setPositionTarget(
            {
              id: valueTarget.id,
              x: valueNull.x - valueTarget.x,
              y: valueNull.y,
              positionType,
            },
            arrCurrent,
          ),
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
        positionType === 'y' &&
        valueMove.x < valueTarget.height &&
        ((valueNull.y - valueTarget.y > 0 && valueMove.translationY > 0) ||
          (valueNull.y - valueTarget.y < 0 && valueMove.translationY < 0))
      ) {
        dispatch(
          setPositionTarget(
            {
              id: valueTarget.id,
              x: valueNull.x,
              y: valueNull.y - valueTarget.y,
              positionType,
            },
            arrCurrent,
          ),
        );
        setPositionFunc();
      }
    }
  }
};
