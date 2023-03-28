import { createSlice } from '@reduxjs/toolkit';

const initialGameState = {
  readyTurn: false,
  attackTurn: false,
  defenseTurn: false,
  settleTurn: false,
};

const gameSlice = createSlice({
  name: 'authentication',
  initialState: initialGameState,
  reducers: {
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
    
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
