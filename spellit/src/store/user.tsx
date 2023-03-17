import { createSlice } from '@reduxjs/toolkit';

const userIndexState = {
  temp: 0,
};

const userSlice = createSlice({
  name: 'index',
  initialState: userIndexState,
  reducers: {
    
  },
});

export const userAction = userSlice.actions;

export default userSlice.reducer;