import { createSlice } from '@reduxjs/toolkit';

const userIndexState = {
  memberId: 1,
  nickname: null,
};

const userSlice = createSlice({
  name: 'index',
  initialState: userIndexState,
  reducers: {
    
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
