import {createSlice} from '@reduxjs/toolkit';

interface SequenceState {
  originLine: number[];
  currentLine: number[];
  isOriginLine: boolean;
}

const initialState: SequenceState = {
  originLine: [],
  currentLine: [],
  isOriginLine: false,
};

export const SequenceOfArraySlice = createSlice({
  name: 'sequenceOfArraySlice',
  initialState: initialState,
  reducers: {
    setOriginLine(state, action) {
      state.originLine = action.payload;
    },
    setCurrentLine(state, action) {
      state.currentLine = action.payload;
    },
    setIsOriginLine(state, action) {
      state.isOriginLine = action.payload;
    },
  },
});

export default SequenceOfArraySlice.reducer;
