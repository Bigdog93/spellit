import { createSlice } from '@reduxjs/toolkit';

const sessionState = {
  temp: 0,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionState,
  reducers: {
    
  },
});

export const sessionAction = sessionSlice.actions;

export default sessionSlice.reducer;
