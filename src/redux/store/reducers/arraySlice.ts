import {createSlice} from '@reduxjs/toolkit';
import {PositionType, PuzzleRenderArray} from '../../../types/puzzle';

interface ArrayState {
  arrayCurrent: any[];
  arrayRandomStart: any[];
  arrayLength: number;
  nullItem: PuzzleRenderArray | PositionType | any;
}

const initialState: ArrayState = {
  arrayCurrent: [],
  arrayRandomStart: [],
  arrayLength: 3,
  nullItem: {},
};

export const ArrayCurrentSlice = createSlice({
  name: 'currentState',
  initialState: initialState,
  reducers: {
    setArrayCurrent(state, action) {
      action.payload.nullItem === undefined
        ? (state.arrayCurrent = action.payload)
        : ((state.arrayCurrent = action.payload.array),
          (state.nullItem = action.payload.nullItem),
          (state.arrayLength = action.payload.arrayLength));
    },
    // setArrayRandomStart(state, action) {
    //   state.arrayRandomStart = action.payload;
    // },
    setNull(state, action) {
      state.nullItem = action.payload;
    },
    setArrayLength(state, action) {
      state.arrayLength = action.payload;
    },
  },
});

export default ArrayCurrentSlice.reducer;
