import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

import { CardType, AttackType } from '@/utils/Types'


type initialAttackType = {
  attacks: AttackType[] | null
}

const initialAttackState: initialAttackType = {
  attacks: []
};

const attackSlice1 = createSlice({
  name: 'attack',
  initialState: initialAttackState,
  reducers: {
    setAttacks(state, action: PayloadAction<Array<AttackType>>) {
      state.attacks = action.payload
      console.log(action.payload)
    },
  },
});

export const attackActions1 = attackSlice1.actions;

export default attackSlice1.reducer;