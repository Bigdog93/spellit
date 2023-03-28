export type CardType = {
    id : number,
    code : string,
    title : string,
    spell : string,
    cost : number,
    damage : number,
    attribute : number,
  };

  export type AttackType = {
    isMine: boolean,
    card: CardType,
  }