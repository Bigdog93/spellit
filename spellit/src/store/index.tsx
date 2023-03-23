import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import useReducer from './user';
import sessionReduser from './session';
import costReducer from './cost';
import attackReducer from './attack';


const store = configureStore({
  reducer: {
    auth: authReducer, 
    user: useReducer, 
    // session: sessionReducer, 
    cost: costReducer,
    attack: attackReducer,},
});

export default store;
export type RootState = ReturnType<typeof store.getState>

