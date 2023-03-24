import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
type initialMatchingType = {
  matched: boolean,
  done: boolean,
  p1: [],
  p2: [],
};
const initialMatchingState: initialMatchingType = {
  matched: false,
  done: false,
  p1: [],
  p2: [],
};

const matchingSlice = createSlice({
  name: 'matching',
  initialState: initialMatchingState,
  reducers: {
    endMatching(state) {
      state.done = !state.done
    },
  },
});

export const matchingActions = matchingSlice.actions;

export default matchingSlice.reducer;