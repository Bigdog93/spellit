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

type PlayersDeckType = {
  isMine: boolean,
  card: DeckType,
}

type initialAttackType = {
  startGame: boolean,
  defaultHp: number,
  p1Hp: number,
  p2Hp : number,
  playersDeck: PlayersDeckType[],
  p1Deck: object[],
  p2Deck: object[],
  p1Damage: number[],
  p2Damage: number[],
  onTimer: boolean,
  transcript: string,
  myTurn: boolean,
  sec: number,
  movePageCnt: number,
  endStt: boolean,
}

const initialAttack: initialAttackType = {
  startGame: false,
  defaultHp: 600,   // hp 초기값
  p1Hp: 385,        // 남은 p1 hp
  p2Hp: 385,        // 남은 p2 hp
  playersDeck: [],  // 플레이어의 카드 선택 정보가 담긴 리스트
  p1Deck: [],       // p1 선택한 덱 리스트
  p2Deck: [],       // p2 선택한 덱 리스트
  p1Damage: [],     // p1 영창 후 각 주문의 맞은 단어에 대한 데미지
  p2Damage: [],     // p2 영창 후 각 주문의 맞은 단어에 대한 데미지
  onTimer: false,   // timer On / Off 유무
  transcript: "",   // 주문 영창 실시간 데이터
  myTurn: false,    // 본인 주문영창인지
  sec: 0,           // 타이머
  movePageCnt: 0,   // attack 내 컴포넌트 이동 회수 파악
  endStt: false,   // 한 턴 종료
};

const attackSlice = createSlice({
  name: 'attack',
  initialState: initialAttack,
  reducers: {
    // checkP1Hp(state, action: PayloadAction<number>) {
    //   state.p1Hp = action.payload;
    // },
    // checkP2Hp(state, action: PayloadAction<number>) {
    //   state.p2Hp = action.payload;
    // },
    startGame(state) {
      state.startGame = true;
    },
    playersDeckList(state, action: PayloadAction<[]>) {
      state.playersDeck = action.payload;
    },
    p1DeckList(state, action: PayloadAction<object[]>) {
      state.p1Deck = action.payload;
    },
    p2DeckList(state, action: PayloadAction<object[]>) {
      state.p2Deck = action.payload;
    },
    p1Damage(state, action: PayloadAction<number[]>) {
      state.p1Damage = action.payload;
    },
    p2Damage(state, action: PayloadAction<number[]>) {
      state.p2Damage = action.payload;
    },
    p1Hit(state, action: PayloadAction<number>) {
      state.p1Hp = state.p1Hp - action.payload;
    },
    p2Hit(state, action: PayloadAction<number>) {
      state.p2Hp = state.p2Hp - action.payload;
    },
    onTimer(state) {
      state.onTimer = !state.onTimer;
    },
    attackInfo(state, action: PayloadAction<string>) {
      state.transcript = action.payload;
    },
    myTurn(state, action: PayloadAction<boolean>) {
      state.myTurn = action.payload;
    },
    setSec(state, action: PayloadAction<number>) {
      state.sec = action.payload;
    },
    movePageCnt(state, action: PayloadAction<number>) {
      state.movePageCnt = action.payload;
    },
    endStt(state, action: PayloadAction<boolean>) {
      state.endStt = action.payload;
    }
  },
});

export const attackActions = attackSlice.actions;

export default attackSlice.reducer;