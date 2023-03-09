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
  // search for line and row position number target and null
  const {countLineTarget, countLineNull, rowTarget, rowNull, array} =
    findLineRowFunc(valueTarget, valueNull, arrayLength, arrayCurrent);

  // new array with target replacemented by null, array originLine with start positions
  const {arrCurrent, originLine} = newArrayFunc(
    [...array],
    valueTarget,
    valueNull,
  );

  // set line position
  const setPositionFunc = () => {
    dispatch(setCurrentLine(originLine));
  };

  // motion detection, x or y axis
  const positionType =
    Math.abs(valueMove.translationX) > Math.abs(valueMove.translationY)
      ? 'x'
      : 'y';
  // checking null and target on the same line or not
  if (countLineTarget === countLineNull) {
    // checking null and target are close or not
    if (rowNull + 1 === rowTarget || rowNull - 1 === rowTarget) {
      // checking for the possibility of movement depending on movement
      if (
        positionType === 'x' &&
        valueMove.y < valueTarget.height &&
        ((valueNull.x - valueTarget.x > 0 && valueMove.translationX > 0) ||
          (valueNull.x - valueTarget.x < 0 && valueMove.translationX < 0))
      ) {
        // set position target item
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
    // checking null and target are close or not
    if (
      countLineNull + 1 === countLineTarget ||
      countLineNull - 1 === countLineTarget
    ) {
      // checking for the possibility of movement depending on movement
      if (
        positionType === 'y' &&
        valueMove.x < valueTarget.height &&
        ((valueNull.y - valueTarget.y > 0 && valueMove.translationY > 0) ||
          (valueNull.y - valueTarget.y < 0 && valueMove.translationY < 0))
      ) {
        // set position target item
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
