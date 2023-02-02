import {createSlice} from '@reduxjs/toolkit';

interface ImageState {
  imagePath: string;
  numberOfImage: number;
  imageRandomAmount: number;
  imageAmountArray: number[];
  isImageComponent: boolean;
}

const initialState: ImageState = {
  imagePath: 'IMAGES_BY_KEYS',
  numberOfImage: 1,
  imageRandomAmount: 4,
  imageAmountArray: [],
  isImageComponent: false,
};

export const ImageSlice = createSlice({
  name: 'imageState',
  initialState: initialState,
  reducers: {
    setImage(state, action) {
      state.imagePath = action.payload;
    },
    setAmountArray(state, action) {
      state.imageAmountArray = action.payload;
    },
    setNumberOfImage(state, action) {
      state.numberOfImage = action.payload;
    },
    setIsImageComponent(state, action) {
      state.isImageComponent = action.payload;
    },
  },
});

export default ImageSlice.reducer;
