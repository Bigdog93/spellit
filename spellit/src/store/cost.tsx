import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialCostState = {
  cost: 30,
};

const costSlice = createSlice({
  name: 'cost',
  initialState: initialCostState,
  reducers: {
    set(cost, action: PayloadAction<number>) {
      cost.cost = action.payload;
    },
    add(cost, action: PayloadAction<number>) {
      cost.cost += action.payload;
    },
    sub(cost, action: PayloadAction<number>) {
      cost.cost -= action.payload;
    },
  },
});

export const costActions = costSlice.actions;
// export const { set, add, sub } = costSlice.actions;
export default costSlice.reducer;