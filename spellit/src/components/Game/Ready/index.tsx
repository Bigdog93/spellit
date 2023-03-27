import { useState, useContext, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import './index.css'

import { WebSocketContext } from '@/store/websocket'
import { RootState } from "@/store"
import { costActions } from "@/store/cost"
import { attackActions } from "@/store/attack"
import { matchingActions } from "@/store/matching"

import ConfirmBtn from '../../../assets/ui/ReadyConfirmBtn.png'
import Frame from '../../../assets/ui/Frame.png'
import { State } from "howler"

interface CardType {
  id: number;
  code: string;
  title: string
  spell: string;
  cost: number;
  damage: number;
  attribute: number;
}

const Ready = () => {
	const { send } = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 나의 덱 정보 가져오기
  const myCards = useSelector((state: RootState) => state.user.deck);

  // const p1 = useSelector((state: RootState) => state.player.p1);
  // const p2 = useSelector((state: RootState) => state.player.p2);

  // cost 부족할 때 나타는 shake 효과
  const [isShaking, setIsShaking] = useState(false);

  function shake() {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  }
  
  // 선택된 카드 리스트
  const [selectedCards, setSelectedCards] = useState<Array<CardType>>([])
  
  // 카드 선택
  const selectCard = (card: CardType) => {
    console.log(card)
    if(currentCost-card.cost < 0) {
      shake()
    } else{
      setSelectedCards([
        ...selectedCards,
        card
      ])
      dispatch(costActions.sub(card.cost))
      
    }
  };

  // 선택한 카드 삭제
  const removeCard = (card: CardType, index: number) => {
    setSelectedCards(selectedCards.slice(0, index).concat(selectedCards.slice(index + 1)));
    navigator.vibrate(200);
    dispatch(costActions.add(card.cost));
  };


  const roomId = useSelector((state: RootState) => state.room.roomId);
  const memberId = useSelector((state: RootState) => state.user.id);
  
  // skill 확정
  const confirmSkills = () => {
    console.log('Skill 다 골랐고 확인버튼 누름');
    console.log(selectedCards)
    console.log('확인');
    // console.log(selectedCards);
    // dispatch(attackActions.attackStart(selectedCards));
    // dispatch(attackActions.p1DeckList(selectedCards));
    send({
      event: 'attackTurn',
      memberId: memberId,
      roomId: roomId,
      data: { cards : selectedCards }
    })

  }
  const attackTrun = useSelector((state:RootState)=> state.game.attackTurn)
  useEffect(()=> {
    if(attackTrun){
      navigate("/attack");
    }
  }, [attackTrun, navigate])

  // cost + or -
  // 카드에 따른 cost 수정 필
  // maxCost 수정 필
  const currentCost = useSelector((state: RootState) => state.cost.currentCost);
  const maxCost = useSelector((state: RootState) => state.cost.maxCost);

  return (
    <div>
      <div className="flex-container">
        <div className="cost">
          <div>COST</div>
          { currentCost }/{ maxCost }
        </div>
        <div className={isShaking ? "shake selectedCardBox" : "selectedCardBox"}>
          <img src={Frame} alt="frame"/>
          <div className="selectedCard">
            {selectedCards.map((card: CardType, index: number) => (
              <img 
                key={index} 
                src={require(`../../../assets/card/icon/${card.code}.png`)} 
                alt={card.code}
                onClick={(event) => removeCard(card, index)}
              ></img>
            ))}
          </div>
        </div>
        <img src={ ConfirmBtn } alt="confirmBtn" onClick={confirmSkills} className='confirmBtn'/>
      </div>

      
      <div className="cards">
        {myCards?.map((card, index) => (
          <img 
            key={index} 
            src={require(`../../../assets/card/front/${card.code}.png`)} 
            alt={card.code} 
            className="mycard" 
            onClick={(e) => selectCard(card)}
          ></img>
        ))}
      </div>
    </div>
  )
}
export default Ready