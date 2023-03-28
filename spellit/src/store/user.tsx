import API from '@/utils/API';
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

type GameCharacterType = {
  id : number,
  characterName : string,
  englishName : string,
  stand : string,
  hurt : string,
  attack : string,
  winner : string,
  combo : string,
}

type userInitialType = {
  deck: Array<DeckType>,
  email: string,
  exp: number,
  gameCharacter: GameCharacterType | null,
  id: number | null,
  level: number,
  nickname: string,
  playCount: number,
  winCount: number,
  looseCount: number,
  drawCount: number,
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
  looseCount: 0,
  drawCount: 0
}

const token = sessionStorage.getItem("token");
const userSlice = createSlice({
  name: 'index',
  initialState: userInitialState,
  reducers: {
    setMyInfo(state, action: PayloadAction<userInitialType>) {
      state.deck = action.payload.deck
      state.email = action.payload.email
      state.exp = action.payload.exp
      state.gameCharacter = action.payload.gameCharacter
      state.id = action.payload.id
      state.level = action.payload.level
      state.nickname = action.payload.nickname
      state.playCount = action.payload.playCount
      state.winCount = action.payload.winCount
      state.looseCount = action.payload.looseCount
      state.drawCount = action.payload.drawCount
    },
    setDeck(state, action: PayloadAction<Array<DeckType>>) {
      state.deck = action.payload
      /* API 요청 */
      API.post('member/deck',
      state.deck,
      { headers: { Authorization: `Bearer ${token}` } })
    },
    addCard(state, action: PayloadAction<DeckType>) {
      state.deck?.push(action.payload)
      /* API 요청 */
      API.post('member/deck',
      state.deck,
      { headers: { Authorization: `Bearer ${token}` } })
    },
    removeCard(state, action: PayloadAction<number>) {
      state.deck = state.deck.slice(0, action.payload).concat(state.deck.slice(action.payload + 1))
      console.log(state.deck)
      /* API 요청 */
      API.post('member/deck',
      state.deck,
      { headers: { Authorization: `Bearer ${token}` } })
    },
    setCharacter(state, action: PayloadAction<GameCharacterType>) {
      state.gameCharacter = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
