import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { WebSocketContext } from './websocket';

const ws = useContext(WebSocketContext);
ws.current.onmessage = (event: MessageEvent) => {
  const data = JSON.parse(event.data);
  const type = data.type;
  const info = data.info;
}

type initialMatchingType = {
  connected: boolean,
  game: boolean,
  p1Loading: boolean,
  p2Loading: boolean,
  p1: [],
  p2: [],
  p1Ready: boolean,
  p2Ready: boolean,
};

const initialMatchingState: initialMatchingType = {
  connected: false, // 게임 상대 찾았는지 여부
  game: false,  // 게임을 시작할지 여부
  p1Loading: false, // 나 동전던지기 끝났는지 여부
  p2Loading: false, // 상대 동전던지기 끝났는지 여부
  p1: [],
  p2: [],
  p1Ready: false,   // 나 게임 준비 여부
  p2Ready: false    // 상대 게임 준비 여부
};

const navigate = useNavigate();
const dispatch = useDispatch();

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
      navigate('/attack');
    },
    p1Loading(state) {
      console.log('p1Loading in store')
      console.log(state.p1)
      state.p1Loading = true
    },
    p2Loading(state) {
      state.p2Loading = true
      navigate('/ready');
    },
    // p1 p2 준비에 대한 함수 체크필
    p1Ready(state) {
      state.p1Ready = true;
      dispatch(matchingActions.p2Ready());
    },
    p2Ready(state) {
      state.p2Ready = true;
      dispatch(matchingActions.startGame());
    },
  },
});

export const matchingActions = matchingSlice.actions;

export default matchingSlice.reducer;