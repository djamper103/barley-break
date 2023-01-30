import {PositionType} from '../../types/puzzle';

export const newArrayFunc = (
  arrCurrent: any[],
  value1: PositionType,
  value2: PositionType,
) => {
  let originLine: number[] = [];
  return {
    arrCurrent: arrCurrent.map((el: any) => {
      if (el.id === value1.id) {
        originLine.push(value2.id);
        return value2;
      } else if (el.id === value2.id) {
        originLine.push(value1.id);
        return value1;
      } else {
        originLine.push(el.id);
        return el;
      }
    }),
    originLine,
  };
};
