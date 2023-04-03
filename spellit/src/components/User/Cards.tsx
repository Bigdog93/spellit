import { useRef, useEffect, useState } from 'react';
// import { useEffect } from 'react';
import useSound from 'use-sound';
import { useSelector } from 'react-redux';
import _ from 'lodash'
import { RootState } from '@/store'
import { DeckType } from '@/utils/Types';
import Card from './Card'
import style from './index.module.css'

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
  const onSelectCard = (data:any)=>{
    selectCard(data);
    console.log(data)
  }
  
  // const myDeck = useSelector((state: RootState) => (state.user.deck))

  // const [myDeckId, setMyDeckId] = useState<Array<number>>([]);
  // useEffect(() => {
  //   for (const m of myDeck) {
  //     setMyDeckId([...myDeckId, m.id])
  //     // myDeckId.push(m.id)
  //   }
  // }, myDeck)
  // const mine = cards.filter(c => myDeck.includes(c))
  // const [notMine, setNotMine] = useState<Array<DeckType>>([]);
  // let notMine = useRef<Array<DeckType>>([]);

  // useEffect(() => {
  //   notMine.current = []
  //   for (const card of cards) {
  //     for (const m of myDeck) {
  //       console.log(m.title)
  //       if (card.id !== m.id) {
  //         notMine.current.push(card)
  //         console.log(notMine)
  //       } else {
  //         const index = notMine.current.indexOf(card)
  //         notMine.current.slice(0, index).concat(notMine.current.slice(index + 1))
  //       }
  //       break
  //     }
  //   }
  // }, [myDeck])

  // const [notMine, setNotMine] = useState<Array<DeckType>>([]);

  // useEffect(() => {
  
  //   for (const card of cards) {
  //     for (const m of myDeck) {
  //       console.log(m.title)
  //       if (card.id !== m.id) {
  //         setNotMine([...notMine, card])
  //         // notMine.push(card)
  //         console.log(notMine)
  //       } else {
  //         const index = notMine.indexOf(card)
  //         notMine.slice(0, index).concat(notMine.slice(index + 1))
  //       }
  //       break
  //     }
  //   }
  // }, [myDeck])

  // console.log('myDeck ', myDeck)
  // console.log('notMine ', notMine)


  // CardFlip Sound Effect
  const CardFlip = require("../../assets/soundeffect/CardFlip.mp3");
  const [playFlip, {stop}] = useSound(CardFlip)
  return (
    <div className={`${style.cardItems}`}>
      {/* { myDeck.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))} */}
      {/* { notMine.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))} */}
      {/* { notMine.current.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`}>
          <Card key={index} card={card.code}/>
        </div>
      ))} */}
      { cards.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)} className={`${style.cardContainer}`} onMouseEnter={() => playFlip()} onMouseLeave={() => stop()}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
    </div>
  )
}

export default Cards;