import { useState, useContext, useEffect } from "react"
// import { useSelector } from "react-redux"

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
  // const memberId = useSelector((state: RootState) => state.user.id);

  const token = sessionStorage.getItem("token");
  
  // 전체 카드 목록
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

  // 내가 선택한 카드
  const [deck, setDeck] = useState<Array<CardType>>([]);
  
  // 카드 5장 채웠는데 더 선택하려고 할 때 나타나는 shake 효과
  const [isShaking, setIsShaking] = useState(false);
  function shake() {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  }

  // 카드 클릭했을 때 카드 추가 or 경고
  const selectCard = (res: CardType) => {
    let flag = false;

    for (const i of deck) {
      if (i === res) {
        flag = true;
      }
    }

    if (!flag && deck.length < 5) {
      setDeck([...deck, res])
      console.log('cardseledted')
      console.log(deck)
    } else if (deck.length >= 5) {
      shake()
    }
  };
  
  // 선택한 카드 삭제
  const removeCard = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setDeck(deck.slice(0, index).concat(deck.slice(index + 1)));
    navigator.vibrate(200);
  };

  return (
    <div className={`${style.bg}`}>
      <div className={`${style.items}`}>
        <Cards cards={cards} selectCard={selectCard}/>
      </div>
      {/* 선택된 카드 덱 */}
      <div className={isShaking ? `${style.shake}`  : `${style.cardselectcontainer}`}>
      
      {/* <div className={`${style.cardselectcontainer}`}> */}
        <div 
          className={`${style.cardselect}`}
         
        >
          {deck.map((item: CardType, index: number) => (
           <div
            key={index}
            onClick={(event) => removeCard(event, index)}
           >{item.title}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default User;

