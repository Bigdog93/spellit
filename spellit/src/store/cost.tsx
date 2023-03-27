import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialCostState = {
  currentCost: 0,
  maxCost: 0,
};

const costSlice = createSlice({
  name: "cost",
  initialState: initialCostState,
  reducers: {
    set(state, action: PayloadAction<number>) {
      state.currentCost += action.payload;
      state.maxCost = state.currentCost;
    },
    add(state, action: PayloadAction<number>) {
      state.currentCost += action.payload;
    },
    sub(state, action: PayloadAction<number>) {
      state.currentCost -= action.payload;
    },
  },
});

export const costActions = costSlice.actions;
// export const { set, add, sub } = costSlice.actions;
export default costSlice.reducer;
