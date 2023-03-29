import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialCostState = {
  usedCost: 0,
  maxCost: 0
};

const costSlice = createSlice({
  name: 'cost',
  initialState: initialCostState,
  reducers: {
    set(state, action: PayloadAction<number>) {
      state.maxCost += state.maxCost - state.usedCost;
      state.maxCost += action.payload;
      state.usedCost = 0;
    },
    add(state, action: PayloadAction<number>) {
      state.usedCost += action.payload;
    },
    sub(state, action: PayloadAction<number>) {
      state.usedCost -= action.payload;
    },
  },
});

export const costActions = costSlice.actions;
// export const { set, add, sub } = costSlice.actions;
export default costSlice.reducer;