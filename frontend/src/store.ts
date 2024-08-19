import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;