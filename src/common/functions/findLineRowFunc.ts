import {PositionType} from '../../types/puzzle';

export const findLineRowFunc = (
  value: PositionType,
  nullItem: PositionType,
  arrayLength: number,
  currentArray: PositionType[],
) => {
  const array = [...currentArray];

  let countCurrentLine: number = 0;
  let countLineTarget: number = 0;
  let countLineNull: number = 0;

  let countCorrentRow: number = 0;
  let rowTarget: number = 0;
  let rowNull: number = 0;

  let currentArrayLength = arrayLength;

  // search for line and row position number target and null

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
      (rowTarget =
        countCurrentLine === 0 ? countCorrentRow - 1 : countCorrentRow));
    nullItem.id === el.id &&
      ((countLineNull = countCurrentLine),
      (rowNull =
        countCurrentLine === 0 ? countCorrentRow - 1 : countCorrentRow));
  });

  return {
    countLineTarget,
    countLineNull,
    rowTarget,
    rowNull,
    array,
  };
};
