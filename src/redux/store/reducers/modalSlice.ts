import {createSlice} from '@reduxjs/toolkit';

interface ModalState {
  isModal: boolean;
}

const initialState: ModalState = {
  isModal: true,
};

export const ModalSlice = createSlice({
  name: 'modalSlice',
  initialState: initialState,
  reducers: {
    setIsModal(state, action) {
      state.isModal = action.payload;
    },
  },
});

export default ModalSlice.reducer;
