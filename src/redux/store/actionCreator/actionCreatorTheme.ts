import {ThemeSlice} from '../reducers/themeSlice';
import {AppDispatch} from '../store';

export const setIsTheme = (value: boolean) => (dispatch: AppDispatch) => {
  dispatch(ThemeSlice.actions.setIsTheme(!value));
};
