import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialAttack = {
  chooseCards: [""],
};

const attackSlice = createSlice({
  name: 'attack',
  initialState: initialAttack,
  reducers: {
    attackStart(chooseCards, action: PayloadAction<string[]>) {
        chooseCards.chooseCards = action.payload;
    },
  },
});

export const attackActions = attackSlice.actions;

export default attackSlice.reducer;