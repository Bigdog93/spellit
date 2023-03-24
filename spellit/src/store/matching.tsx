import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

type initialMatchingType = {
  matched: boolean,
  done: boolean,
  p1Loading: boolean,
  p2Loading: boolean,
  p1: [],
  p2: [],
};
const initialMatchingState: initialMatchingType = {
  matched: false,
  done: false,
  p1Loading: false,
  p2Loading: false,
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
    end1PLoading(state) {
      state.p1Loading = true
    },
    end2PLoading(state) {
      state.p1Loading = true
    },
  },
});

export const matchingActions = matchingSlice.actions;

export default matchingSlice.reducer;