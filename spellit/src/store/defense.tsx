import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'

const initialDefenseState = {
//   defenseStart: false,
  defenseEnd: false,
};

const defenseSlice = createSlice({
  name: 'defense',
  initialState: initialDefenseState,
  reducers: {
    // startDefense(state, action: PayloadAction<number>) {
    //   state.defenseStart = true
    // },
    endDefense(state) {
      console.log('endDefense 실행됨')
      state.defenseEnd = true
    },
    
  },
});

export const defenseActions = defenseSlice.actions;
// export const { set, add, sub } = costSlice.actions;
export default defenseSlice.reducer;