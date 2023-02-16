import {Dimensions} from 'react-native';

export const {width, height, fontScale} = Dimensions.get('window');

const baseWidth = 400;
const baseHeight = 800;

export const dw = (size: number) => ((width / baseWidth) * size) / fontScale;
export const dh = (size: number) => ((height / baseHeight) * size) / fontScale;
