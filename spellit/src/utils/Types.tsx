export type CardType = {
  id : number,
  code : string,
  title : string,
  spell : string,
  cost : number,
  damage : number,
  attribute : number,
}
export type DeckType = {
  id : number,
  code : string,
  title : string,
  spell : string,
  cost : number,
  damage : number,
  attribute : number,
}
  
export type GameCharacterType = {
  id : number,
  characterName : string,
  englishName : string,
  stand : string,
  hurt : string,
  attack : string,
  winner : string,
  combo : string,
}
  
export type UserType = {
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
  profileMsg: string,
  isOnline: boolean,
}


export type AttackType = {
  isMine: boolean,
  card: CardType,
}
