import {createSlice} from '@reduxjs/toolkit';

interface PositionState {
  positionTarget: Object;
}

const initialState: PositionState = {
  positionTarget: {},
};

export const PositionSlice = createSlice({
  name: 'positionSlice',
  initialState: initialState,
  reducers: {
    setPositionTarget(state, action) {
      state.positionTarget = action.payload;
    },
  },
});

export default PositionSlice.reducer;
