import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "@react-three/fiber";

// type DeckType = {
//     id : number,
//     code : string,
//     title : string,
//     spell : string,
//     cost : number,
//     damage : number,
//     attribute : number,
//   }

// type DamageInfo = {
//     percent: number,
// }

type initialSettleType = {
  p1Combo: number;
  p2Combo: number;
  p1Deffense: boolean;
  p2Deffense: boolean;
  percentList: Array<number>;
  turnCount: number;
  trigger: boolean;
  endSpell: boolean;
};

const initialSettle: initialSettleType = {
  p1Deffense: false,
  p2Deffense: false,
  p1Combo: 0,
  p2Combo: 0,
  percentList: [],
  turnCount: 0,
  trigger: true,
  endSpell: false,
};

const settleSlice = createSlice({
  name: "settle",
  initialState: initialSettle,
  reducers: {
    percentList(state, action: PayloadAction<number>) {
      state.percentList.push(action.payload);
    },
    percentListClear(state) {
      state.percentList = [];
    },
    addTurnCount(state) {
      state.turnCount++;
    },
    setTurnCount(state) {
      state.turnCount = 0;
    },
    setTrigger(state) {
      state.trigger = !state.trigger;
    },
    setP1Combo(state, action: PayloadAction<number>) {
      state.p1Combo = action.payload;
    },
    setP2Combo(state, action: PayloadAction<number>) {
      state.p2Combo = action.payload;
    },
    clearP1Combo(state) {
      state.p1Combo = 0;
    },
    clearP2Combo(state) {
      state.p2Combo = 0;
    },
    setEndSpell(state) {
      state.endSpell = !state.endSpell;
    },
  },
});

export const settleActions = settleSlice.actions;

export default settleSlice.reducer;
