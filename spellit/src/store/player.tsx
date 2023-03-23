import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

type PlayerType = 
  {
    memberId : number,
    hp : number,
    nickname : string,
    profileMsg: string,
    playCount : number,
    winCount : number,
    cost : number,
    gameCharacter : GameCharacterType,
    deck : Array<DeckType>,
    selectedCards : [],
    isFirst : 0 | 1,
    idx : 0 | 1,
    defence : boolean,
    myObj : Object
  }

type GameCharacterType = {
  id : Number,
  characterName : string,
  englishName : string,
  stand : string,
  hurt : string,
  attack : string,
  winner : string,
  combo : string,
}
type DeckType = {
  id : Number,
  code : string,
  title : string,
  spell : string,
  cost : Number,
  damage : Number,
  attribute : Number,
}
  

type initialPlayerType = {
  p1: PlayerType | null,
  p2: PlayerType | null
}

const initialPlayer: initialPlayerType = {
  p1: null,
  p2: null,
};

const playerSlice = createSlice({
  name: 'matching',
  initialState: initialPlayer,
  reducers: {
    setP1(state, action: PayloadAction<PlayerType>) {
      state.p1 = action.payload
    },
    setP2(state, action: PayloadAction<PlayerType>) {
      state.p2 = action.payload
    },
    
  },
});

export const playerActions = playerSlice.actions;

export default playerSlice.reducer;