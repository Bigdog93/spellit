import { createSlice } from '@reduxjs/toolkit';

const initialIndexState = {
  temp: 0,
};

const indexSlice = createSlice({
  name: 'index',
  initialState: initialIndexState,
  reducers: {
    
  },
});

export const indxActions = indexSlice.actions;

export default indexSlice.reducer;