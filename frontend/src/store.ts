import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore(rootReducer);

export default store;