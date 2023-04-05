import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';
import { RootState } from '@react-three/fiber';

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
    p1Combo: boolean,
    p2Combo: boolean,
    p1Deffense: boolean,
    p2Deffense: boolean,
    percentList: Array<number>,
    turnCount : number,
    trigger: boolean,
}

const initialSettle: initialSettleType = {
    p1Deffense: false,
    p2Deffense: false,
    p1Combo: false,
    p2Combo: false,
    percentList: [],
    turnCount: 0,
    trigger: true,
}

const settleSlice = createSlice({
    name: 'settle',
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
        }
    },
});

export const settleActions = settleSlice.actions;

export default settleSlice.reducer;