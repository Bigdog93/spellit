import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialAttack = {
  chooseCards: [""],
  firstHp: 500,
  secondHp: 500,
};

const attackSlice = createSlice({
  name: 'attack',
  initialState: initialAttack,
  reducers: {
    attackStart(chooseCards, action: PayloadAction<string[]>) {
        chooseCards.chooseCards = action.payload;
    },
    // settleHp(firstHp, secondHp, action: PayloadAction<number>) {
    //   firstHp.firstHp = action.payload;
    //   secondHp.secondHp = action.payload;
    // }
  },
});

export const attackActions = attackSlice.actions;

export default attackSlice.reducer;