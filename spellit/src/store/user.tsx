import API from '@/utils/API';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit' 
import { DeckType } from '@/utils/Types'
import { stringify } from 'querystring';


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

export type userInitialType = {
  deck: Array<DeckType>,
  notMyDeck: Array<DeckType>,
  email: string,
  exp: number,
  gameCharacter: GameCharacterType | null,
  id: number | null,
  level: number,
  nickname: string,
  playCount: number,
  winCount: number,
  loseCount: number,
  drawCount: number,
  isOnline: boolean,
}

// type userInitialType = userInfo

const userInitialState: userInitialType = {
  deck: [],
  notMyDeck: [],
  email: 'string',
  exp: 0,
  gameCharacter: null,
  id: null,
  level: 0,
  nickname: '',
  playCount: 0,
  winCount: 0,
  loseCount: 0,
  drawCount: 0,
  isOnline: false,
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
      state.isOnline = action.payload.isOnline
      state.loseCount = action.payload.loseCount
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
    setNotMyDeck(state) {
      state.notMyDeck = [];
      API.get(
        'game/card',
        { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(({data}) => {
          console.log('user store data', data)
          for (const d of data){
            console.log('d ', d)
            for (const m of d) {
              console.log('m', m)
            }
            // if(state.deck.includes(d.toString())){
            //   console.log('IF user store setNotMyDeck')
            // } else {
            //   console.log('ELSE user store setNotMyDeck')
            //   state.notMyDeck.push(d)
            // }
          }
        })
        .catch((err) => {console.log('err이무니다', err)})
    },
    logout(state) {
      state.deck = []
      state.email = ""
      state.exp = 0
      state.gameCharacter = null
      state.id = 0
      state.level = 1
      state.nickname = ""
      state.playCount = 0
      state.winCount = 0
      state.isOnline = false
      state.loseCount = 0
      state.drawCount = 0
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
