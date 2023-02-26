import {Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 380;
const guidelineBaseHeight = 800;

export const dw = (size: number) => (width / guidelineBaseWidth) * size;
export const dh = (size: number) => (height / guidelineBaseHeight) * size;

export const CELL_WIDTH = (COLUMN_COUNT: number, PADDING: number) =>
  Math.floor((width - PADDING * 2) / COLUMN_COUNT);
export const CELL_HEIGHT = (COLUMN_COUNT: number, PADDING: number) =>
  Math.floor((height - PADDING * 2) / COLUMN_COUNT);
