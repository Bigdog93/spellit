import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

type initialMatchingType = {
  connected: boolean,
  game: boolean,
  p1Loading: boolean,
  p2Loading: boolean,
  p1: [],
  p2: [],
};
const initialMatchingState: initialMatchingType = {
  connected: false, // 게임 상대 찾았는지 여부
  game: false,  // 게임을 시작할지 여부
  p1Loading: false, // 나 동전던지기 끝났는지 여부
  p2Loading: false, // 상대 동전던지기 끝났는지 여부
  p1: [],
  p2: [],
};

const matchingSlice = createSlice({
  name: 'matching',
  initialState: initialMatchingState,
  reducers: {
    connected(state){
      // state.connected = !state.connected
      state.connected = true
    },
    startGame(state) {
      state.game = !state.game
    },
    p1Loading(state) {
      console.log('p1Loading in store')
      console.log(state.p1)
      state.p1Loading = true
    },
    p2Loading(state) {
      state.p1Loading = true
    },
  },
});

export const matchingActions = matchingSlice.actions;

export default matchingSlice.reducer;