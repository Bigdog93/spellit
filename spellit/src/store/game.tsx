import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { AttackType } from '@/utils/Types'
import { WebSocketContext } from '@/store/websocket'

type initialGameType = {
  game: boolean
  readyTurn: boolean,
  attackTurn: boolean,
  defenseTurn: boolean,
  settleTurn: boolean,
  attacks: AttackType[],
  idx: number,
  transcript: string,
  myAttackTurn: boolean|null,
  myDefense: boolean,
  otherDefense: boolean,
}
const initialGameState: initialGameType = {
  game: false,
  readyTurn: false,
  attackTurn: false,
  defenseTurn: false,
  settleTurn: false,
  attacks: [],
  idx: 0,
  transcript: '',
  myAttackTurn: null,
  myDefense: false,
  otherDefense: false,

};

const gameSlice = createSlice({
  name: 'authentication',
  initialState: initialGameState,
  reducers: {
    startGame(state) {
      state.game = true;
    },
    endGame(state) {
      state.game = false;
    },
    startReady(state) {
      state.readyTurn = true;
    },
    endReady(state) {
      state.readyTurn = false;
    },
    startAttack(state) {
      state.attackTurn = true;
    },
    endAttack(state) {
      state.attackTurn = false;
    },
    startDefense(state) {
      state.defenseTurn = true;
    },
    endDefense(state) {
      state.defenseTurn = false;
    },
    startSettle(state) {
      state.settleTurn = true;
    },
    endSettle(state) {
      state.settleTurn = false;
    },
    // toAttack에서 받아온 전체 attack 리스트 업뎃
    setAttacks(state, action: PayloadAction<Array<AttackType>>) {
      state.attacks = action.payload
      console.log(action.payload)
    },
    setIdx(state) {
      if (state.attackTurn){
        if (state.idx === state.attacks.length-1) {
          state.idx = 0
          // state.attackTurn = false
          // state.defenseTurn = true
          console.log('idx 끝')
        } else {
          state.idx += 1
          console.log('idx +1 해줌')
        }
      }
    },
    setTranscript(state, action: PayloadAction<string>){
      state.transcript = action.payload
    },
    setMyAttackTurn(state, action: PayloadAction<boolean>) {
      state.myAttackTurn = action.payload
      console.log('game reduer에서 setMyAttackTurn 찍는 isMine', state.myAttackTurn)
    },
    setMyDefense(state, action: PayloadAction<boolean>){
      state.myDefense = action.payload
    },
    setOtherDefense(state, action: PayloadAction<boolean>){
      state.otherDefense = action.payload
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
