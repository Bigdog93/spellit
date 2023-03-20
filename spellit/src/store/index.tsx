import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import useReducer from './user';
import sessionReduser from './session';
import costReducer from './cost';


const store = configureStore({
  reducer: { auth: authReducer, user: useReducer, session: sessionReduser, cost: costReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>

