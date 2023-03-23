import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialMatching = {
  matched: false,
  p1: [],
  p2: [],
};

const matchingSlice = createSlice({
  name: 'matching',
  initialState: initialMatching,
  reducers: {
    connected(chooseCards, action: PayloadAction<string[]>) {
    },
  },
});

export const matchingActions = matchingSlice.actions;

export default matchingSlice.reducer;