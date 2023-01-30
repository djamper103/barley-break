import {createSlice} from '@reduxjs/toolkit';

interface ThemeState {
  isTheme: boolean;
}

const initialState: ThemeState = {
  isTheme: false,
};

export const ThemeSlice = createSlice({
  name: 'themeSlice',
  initialState: initialState,
  reducers: {
    setIsTheme(state, action) {
      state.isTheme = action.payload;
    },
  },
});

export default ThemeSlice.reducer;
