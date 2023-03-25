import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

const initialAttack = {
  chooseCards: [""],
  defaultHp: 385,
  firstHp: 385,
  secondHp: 385,
};

const attackSlice = createSlice({
  name: 'attack',
  initialState: initialAttack,
  reducers: {
    attackStart(chooseCards, action: PayloadAction<string[]>) {
        chooseCards.chooseCards = action.payload;
    },
    firstHit(hp, action: PayloadAction<number>) {
      hp.firstHp = hp.firstHp - action.payload;
    },
    secondHit(hp, action: PayloadAction<number>) {
      hp.secondHp = hp.secondHp - action.payload;
    },
  },
});

export const attackActions = attackSlice.actions;

export default attackSlice.reducer;