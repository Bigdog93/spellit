import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type roomType = {
    cost: number,
    isReady: Array<boolean>,
    randomCost: number,
    roomId: number,
    totalTurn: number,
    turn: number
}

const roomInitialState: roomType = {
    cost: 0,
    isReady: [],
    randomCost: 0,
    roomId: 0,
    totalTurn: 0,
    turn: 0
};

const roomSlice = createSlice({
  name: 'room',
  initialState: roomInitialState,
  reducers: {
    setRoom(state, action: PayloadAction<any>) {
        state.cost = action.payload.cost
        state.isReady = action.payload.isReady
        state.randomCost = action.payload.randomCost
        state.roomId = action.payload.roomId
        state.totalTurn = action.payload.totalTurn
        state.turn = action.payload.turn
    },
    
  },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
