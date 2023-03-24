import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit' 

type DeckType = {
  id : number,
  code : string,
  title : string,
  spell : string,
  cost : number,
  damage : number,
  attribute : number,
}

type userInitialType = {
  deck: Array<DeckType>,
  email: string,
  exp: number,
  gameCharacter:string | null,
  id: number | null,
  level: number
  nickname: string,
  playCount: number,
  winCount: number,
}

// type userInitialType = userInfo

const userInitialState: userInitialType = {
  deck: [],
  email: 'string',
  exp: 0,
  gameCharacter: null,
  id: null,
  level: 0,
  nickname: '',
  playCount: 0,
  winCount: 0,
}


const userSlice = createSlice({
  name: 'index',
  initialState: userInitialState,
  reducers: {
    setMyInfo(state, action:PayloadAction<userInitialType>) {
      console.log(action.payload)
      state.deck = action.payload.deck
      state.email = action.payload.email
      state.exp = action.payload.exp
      state.gameCharacter = action.payload.gameCharacter
      state.id = action.payload.id
      state.level = action.payload.level
      state.nickname = action.payload.nickname
      state.playCount = action.payload.playCount
      state.winCount = action.payload.winCount
      console.log(state)
    }
    
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
