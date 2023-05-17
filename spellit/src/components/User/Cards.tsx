import { useRef, useEffect, useState, useContext } from "react";
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { RootState } from '@/store'
import { MusicProvider, Sound } from '@/store/music';
import Card from './Card'
import style from './index.module.css'
import { userActions } from '@/store/user';
import CardFlip from '@/assets/soundeffect/CardFlip.mp3';

interface CardType {
  attribute: number;
  code: string;
  cost: number;
  damage: number;
  id: number;
  spell: string;
  title: string;
}
interface PropsType {
  cards: Array<CardType>;
  selectCard: (res: CardType) => void;
}

const Cards = ({cards, selectCard}: PropsType) => {

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
  // const CardFlip = require("../../assets/soundeffect/CardFlip.mp3");
  // const [playFlip, { stop }] = useSound(CardFlip)
  
  // const { cardFlip, cardFlipOpt } = useContext(MusicContext);
  const { cardFlip, cardFlipOpt } = Sound();


  return (
    <div className={`${style.cardItems}`}>
      { cards.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`} onMouseEnter={() => cardFlip()} onMouseLeave={() => cardFlipOpt.stop()}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
    </div>
  );
};

export default Cards;
