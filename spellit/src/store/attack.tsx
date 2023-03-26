import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

type initialAttackType = {
  defaultHp: number,
  p1Hp: number,
  p2Hp : number,
  p1Deck: string[],
  p2Deck: string[],
  p1Damage: number[],
  p2Damage: number[],
}

const initialAttack: initialAttackType = {
  defaultHp: 385,   // hp 초기값
  p1Hp: 385,        // 남은 p1 hp
  p2Hp: 385,        // 남은 p2 hp
  p1Deck: [],       // p1 선택한 덱 리스트
  p2Deck: [],       // p2 선택한 덱 리스트
  p1Damage: [],     // p1 영창 후 각 주문의 맞은 단어에 대한 데미지
  p2Damage: [],     // p2 영창 후 각 주문의 맞은 단어에 대한 데미지 
};

const attackSlice = createSlice({
  name: 'attack',
  initialState: initialAttack,
  reducers: {
    // checkP1Hp(state, action: PayloadAction<number>) {
    //   state.p1Hp = action.payload;
    // },
    // checkP2Hp(state, action: PayloadAction<number>) {
    //   state.p2Hp = action.payload;
    // },
    p1DeckList(state, action: PayloadAction<string[]>) {
      state.p1Deck = action.payload;
    },
    p2DeckList(state, action: PayloadAction<string[]>) {
      state.p2Deck = action.payload;
    },
    p1Damage(state, action: PayloadAction<number[]>) {
      state.p1Damage = action.payload;
    },
    p2Damage(state, action: PayloadAction<number[]>) {
      state.p2Damage = action.payload;
    },
    p1Hit(state, action: PayloadAction<number>) {
      state.p1Hp = state.p1Hp - action.payload;
    },
    p2Hit(state, action: PayloadAction<number>) {
      state.p2Hp = state.p2Hp - action.payload;
    }
  },
});

export const attackActions = attackSlice.actions;

export default attackSlice.reducer;