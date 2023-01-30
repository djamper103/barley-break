import {combineReducers, configureStore} from '@reduxjs/toolkit';
import currentArrayReducer from './reducers/arraySlice';
import sequenceOfArrayReducer from './reducers/sequenceOfArraySlice';
import modalReducer from './reducers/modalSlice';
import positionReducer from './reducers/positionSlice';
import themeReducer from './reducers/themeSlice';

const rootReducer = combineReducers({
  currentArrayReducer,
  sequenceOfArrayReducer,
  modalReducer,
  positionReducer,
  themeReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
