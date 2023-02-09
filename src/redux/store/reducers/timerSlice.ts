import {createSlice} from '@reduxjs/toolkit';

interface TimerState {
  isTimer: boolean;
  isTimerStart: boolean | null;
  isTimerPlug: boolean | null;
}

const initialState: TimerState = {
  isTimer: false,
  isTimerStart: null,
  isTimerPlug: null,
};

export const TimerSlice = createSlice({
  name: 'timerSlice',
  initialState: initialState,
  reducers: {
    setIsTimer(state, action) {
      state.isTimer = action.payload;
    },
    setIsTimerStart(state, action) {
      state.isTimerStart = action.payload;
    },
    setIsTimerPlug(state, action) {
      state.isTimerPlug = action.payload;
    },
  },
});

export default TimerSlice.reducer;
