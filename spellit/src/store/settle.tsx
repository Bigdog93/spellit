import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';

type initialSettleType = {
    p1Deffense: boolean,
    p2Deffense: boolean,

}

const initialSettle: initialSettleType = {
    p1Deffense: false,
    p2Deffense: false,
}

const settleSlice = createSlice({
    name: 'settle',
    initialState: initialSettle,
    reducers: {
    }
})

export const settleActions = settleSlice.actions;

export default settleSlice.reducer;