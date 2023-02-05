import {createSlice} from '@reduxjs/toolkit';

interface ModalState {
  isModalRandom: boolean;
}

const initialState: ModalState = {
  isModalRandom: false,
};

export const ModalSlice = createSlice({
  name: 'modalSlice',
  initialState: initialState,
  reducers: {
    setIsModalRandom(state, action) {
      state.isModalRandom = action.payload;
    },
  },
});

export default ModalSlice.reducer;
