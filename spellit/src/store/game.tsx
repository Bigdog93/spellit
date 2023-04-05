import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { AttackType } from '@/utils/Types'
import { useDispatch } from 'react-redux';

type initialGameType = {
  game: boolean
  readyTurn: boolean,
  attackTurn: boolean,
  defenseTurn: boolean,
  settleTurn: boolean,
  resultTurn: boolean,
  attacks: AttackType[],
  idx: number,
  accuracy: number,
  combo: boolean,
  attackCheck: boolean,
  transcript: string,
  myAttackTurn: boolean|null,
  myDefense: boolean,
  otherDefense: boolean,
  result: string,
}
const initialGameState: initialGameType = {
  game: false,
  readyTurn: false,
  attackTurn: false,
  defenseTurn: false,
  settleTurn: false,
  resultTurn: false,
  attacks: [],
  idx: 0,
  accuracy: 0,
  combo: false,
  attackCheck: true, // idx가 다시 0이 됐을 때, 실행되는 것 방지하는 용도
  transcript: '',
  myAttackTurn: null,
  myDefense: false,
  otherDefense: false,
  result: '',
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
    startResult(state) {
      state.resultTurn = true;
    },
    endResult(state) {
      state.resultTurn = false;
    },
    // toAttack에서 받아온 전체 attack 리스트 업뎃
    setAttacks(state, action: PayloadAction<Array<AttackType>>) {
      state.attacks = action.payload
      console.log(action.payload)
    },
    setIdx(state) {
      // if (state.attackTurn){
        if (state.idx === state.attacks.length-1) {
          state.idx = 0;
          state.attackCheck = false;
          // state.attackTurn = false
          // state.defenseTurn = true
          console.log('idx 끝')
        } else {
          state.idx += 1;
          console.log('idx +1 해줌')
        }
      // }
    },
    setAttackCheck(state){
      state.attackCheck = true
      console.log('setAttackCheckTrue에서 찍는다', state.attackCheck)
    },
    // setAttackCheckFalse(state){
    //   state.attackCheck = false
    //   console.log('setAttackCheckFalse에서 찍는다', state.attackCheck)
    // },
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
    setResult(state, action: PayloadAction<string>){
      state.result = action.payload
    },
    addAccuracy(state, action: PayloadAction<number>){
      state.accuracy += action.payload
    },
    clearAccuracy(state){
      state.accuracy = 0
    },
    setCombo(state) {
      state.combo = true;
    },
    clearCombo(state) {
      state.combo = false;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
