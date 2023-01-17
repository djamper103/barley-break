import {PositionType, PuzzleRenderArray} from '../../types/puzzle';

export const findLineRowFunc = (
  value: PuzzleRenderArray | PositionType,
  nullItem: any,
  arrayLength: number,
  positionArray: PositionType[],
) => {
  let valueTarget: any = {};
  let valueNull: any = {};
  const array = [...positionArray];

  let countCurrentLine: number = 0;
  let countLineTarget: number = 0;
  let countLineNull: number = 0;

  let countCorrentRow: number = 0;
  let rowTarget: number = 0;
  let rowNull: number = 0;

  let currentArrayLength = arrayLength;

  array.forEach((el, index) => {
    if (index < currentArrayLength) {
      countCorrentRow = countCorrentRow + 1;
    } else {
      currentArrayLength = currentArrayLength + arrayLength;
      countCurrentLine = countCurrentLine + 1;
      countCorrentRow = 0;
    }
    value.id === el.id &&
      ((countLineTarget = countCurrentLine),
      (valueTarget = el),
      (rowTarget =
        countCurrentLine === 0 ? countCorrentRow - 1 : countCorrentRow));
    nullItem.id === el.id &&
      ((countLineNull = countCurrentLine),
      (valueNull = el),
      (rowNull =
        countCurrentLine === 0 ? countCorrentRow - 1 : countCorrentRow));
  });

  return {
    countLineTarget,
    countLineNull,
    rowTarget,
    rowNull,
    valueTarget,
    valueNull,
    array,
  };
};
