import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

type initialSpellState = {
  transcript: string,
};
const initialSpellState = {
  transcript: '',
};

const spellSlice = createSlice({
  name: 'spell',
  initialState: initialSpellState,
  reducers: {
    setOtherSpell(state, action: PayloadAction<string>) {
      state.transcript = action.payload;
      console.log('sepll reducer에 있는 setOtherSpell에서 찍히는', action.payload)
    },
  },
});

export const aspellActions = spellSlice.actions;

export default spellSlice.reducer;
