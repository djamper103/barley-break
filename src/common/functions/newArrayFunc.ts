import {PositionType} from '../../types/puzzle';

export const newArrayFunc = (
  arrCurrent: any,
  value1: PositionType,
  value2: PositionType,
) => {
  let originLine: number[] = [];
  return {
    arrCurrent: arrCurrent.map((el: any) => {
      if (el.id === value1.id) {
        originLine.push(value2.id);
        return {
          id: value2.id,
          x: el.x,
          y: el.y,
          url: value2.url,
          height: el.height,
        };
      } else if (el.id === value2.id) {
        originLine.push(value1.id);
        return {
          id: value1.id,
          x: el.x,
          y: el.y,
          url: value1.url,
          height: el.height,
        };
      } else {
        originLine.push(el.id);
        return el;
      }
    }),
    originLine,
  };
};
