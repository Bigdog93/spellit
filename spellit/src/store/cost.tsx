import { createSlice } from '@reduxjs/toolkit';

const initialCostState = {
  cost: 0,
};

const costSlice = createSlice({
  name: 'cost',
  initialState: initialCostState,
  reducers: {
    set(cost, action) {
      cost.cost = action.payload;
    },
    add(cost, action) {
      cost.cost += action.payload;
    },
    sub(cost, action) {
      cost.cost -= action.payload;
    },
  },
});

export const costActions = costSlice.actions;

export default costSlice.reducer;