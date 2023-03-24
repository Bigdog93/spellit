import { useState, useContext, useEffect } from "react"
// import { useSelector } from "react-redux"

import { WebSocketContext } from '@/store/websocket'
// import { RootState } from "@/store/";
import API from "@/utils/API";

import Cards from './Cards'
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

const User = () => {
  const { send } = useContext(WebSocketContext);
  // const memberId = useSelector((state: RootState) => state.user.id);
  const token = sessionStorage.getItem("token");
  console.log(token)
  const [cards, setCards] = useState<Array<CardType>>([]);
  useEffect(() => {
    API.get(
      'game/card',
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(({data}) => {
      console.log(data)
      setCards(data)
      console.log(cards)
    }).catch((err) => console.log(err))
    return () => {}
  }, [])

  return (
    <div className={`${style.bg}`}>
      <div className={`${style.items}`}>
        <Cards cards={cards} />
      </div>
      <div className={`${style.cardselectcontainer}`}>
        <div className={`${style.cardselect}`}>
        </div>
      </div>
    </div>
  )
}

export default User;