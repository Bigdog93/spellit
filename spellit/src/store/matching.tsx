import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialMatching = {
  matched: false,
  done: false,
  p1: [],
  p2: [],
};

const matchingSlice = createSlice({
  name: 'matching',
  initialState: initialMatching,
  reducers: {
    endMatching(state) {
      state.done = true
    },
  },
});

export const matchingActions = matchingSlice.actions;

export default matchingSlice.reducer;