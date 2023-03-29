import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';

import { CardType, AttackType } from '@/utils/Types'
import { gameActions } from './game';



type initialAttackType = {
  attacks: AttackType[]
  idx: number
}

const initialAttackState: initialAttackType = {
  attacks: [],
  idx: 0,
};

const attackSlice1 = createSlice({
  name: 'attack',
  initialState: initialAttackState,
  reducers: {
    setAttacks(state, action: PayloadAction<Array<AttackType>>) {
      state.attacks = action.payload
      console.log(action.payload)
    },
    setIdx(state) {
      if (state.idx === state.attacks.length-1) {
        state.idx = 0
        console.log('idx 끝')
      } else {
        state.idx += 1
        console.log('idx +1 해줌')
      }
    }
  },
});

export const attackActions1 = attackSlice1.actions;

export default attackSlice1.reducer;