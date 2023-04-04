import { useRef, useEffect, useState } from 'react';
// import { useEffect } from 'react';
import useSound from 'use-sound';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { RootState } from '@/store'
import Card from './Card'
import style from './index.module.css'
import { userActions } from '@/store/user';

interface CardType {
  attribute: number;
  code: string;
  cost: number;
  damage: number;
  id: number;
  spell: string;
  title: string
}
interface PropsType {
  cards: Array<CardType>;
  selectCard: (res: CardType) => void;
};

const Cards = ({cards, selectCard}: PropsType) => {

  const dispatch = useDispatch();

  const onSelectCard = (data:any)=>{
    selectCard(data);
    console.log(data)
  }
  

  // const myDeck = useSelector((state: RootState) => state.user.deck)
  // const notMyDeck = cards.filter((c) => {
  //   c.id in 
  // })
  // const notMyDeck = useSelector((state: RootState) => state.user.notMyDeck)

  // useEffect(() => {
  //   dispatch(userActions.setNotMyDeck())
  // }, [myDeck])
  // CardFlip Sound Effect
  const CardFlip = require("../../assets/soundeffect/CardFlip.mp3");
  const [playFlip, {stop}] = useSound(CardFlip)


  return (
    <div className={`${style.cardItems}`}>
      { cards.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`} onMouseEnter={() => playFlip()} onMouseLeave={() => stop()}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
    </div>
  )
}

export default Cards;