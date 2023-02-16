import {createSlice} from '@reduxjs/toolkit';

interface ModalState {
  isModalRandom: boolean;
  isModalEnd: boolean;
}

const initialState: ModalState = {
  isModalRandom: false,
  isModalEnd: false,
};

export const ModalSlice = createSlice({
  name: 'modalSlice',
  initialState: initialState,
  reducers: {
    setIsModalRandom(state, action) {
      state.isModalRandom = action.payload;
    },
    setIsModalEnd(state, action) {
      state.isModalEnd = action.payload;
    },
  },
});

export default ModalSlice.reducer;
