import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

// import type { PayloadAction } from '@reduxjs/toolkit'
// import { useNavigate } from 'react-router-dom';


type initialMatchingType = {
  connected: boolean,
  game: boolean,
  p1Loading: boolean,
  p2Loading: boolean,
  p1Ready: boolean,
  p2Ready: boolean,
  otherReady: boolean,
};

const initialMatchingState: initialMatchingType = {
  connected: false, // 게임 상대 찾았는지 여부
  game: false,  // 게임을 시작할지 여부
  p1Loading: false, // 나 동전던지기 끝났는지 여부
  p2Loading: false, // 상대 동전던지기 끝났는지 여부
  p1Ready: false,   // 나 게임 준비 여부
  p2Ready: false,    // 상대 게임 준비 여부
  otherReady: false,
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
      state.game = !state.game;
      // navigate('/attack');
    },
    p1Loading(state) {
      console.log('p1Loading in store')
      state.p1Loading = true
    },
    p2Loading(state) {
      state.p2Loading = true
      // navigate('/ready');
    },
    // p1 p2 준비에 대한 함수 체크필
    p1Ready(state) {
      state.p1Ready = true;
      // dispatch(matchingActions.p2Ready());
    },
    p2Ready(state) {
      state.p2Ready = true;
      // dispatch(matchingActions.startGame());
    },
    setOtherReady(state,  action: PayloadAction<boolean>) {
      state.otherReady = action.payload;
    },
    // setOtherReady(state) {
    //   state.otherReady = true;
    // },
  },
});

export const matchingActions = matchingSlice.actions;

export default matchingSlice.reducer;