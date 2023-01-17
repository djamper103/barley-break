import {createSlice} from '@reduxjs/toolkit';
import {PositionType} from '../../../types/puzzle';

interface PositionState {
  positionTarget: Object;
  positionArray: PositionType[];
}

const initialState: PositionState = {
  positionTarget: {},
  positionArray: [],
};

export const PositionSlice = createSlice({
  name: 'positionSlice',
  initialState: initialState,
  reducers: {
    setPositionTarget(state, action) {
      state.positionTarget = action.payload;
    },
    setPositionArray(state, action) {
      state.positionArray = action.payload;
    },
  },
});

export default PositionSlice.reducer;
