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
}

const initialSettle: initialSettleType = {
    p1Deffense: false,
    p2Deffense: false,
    p1Combo: false,
    p2Combo: false,
    percentList: [],
    turnCount: 0,
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
            state.turnCount = state.turnCount + 1;
        },
        setTurnCount(state) {
            state.turnCount = 0;
        }
    },
});

export const settleActions = settleSlice.actions;

export default settleSlice.reducer;