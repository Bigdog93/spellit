import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"

import { RootState } from "@/store"
import { costActions } from "@/store/cost"
import { attackActions } from "@/store/attack"

import ConfirmBtn from '../../../assets/ui/ReadyConfirmBtn.png'
import Frame from '../../../assets/ui/Frame.png'

const Ready = () => {

  // 나의 덱 정보 저장
  // store/user.tsx의 정보 업뎃 및 연동 필요
  // 요소 명 수정해야할 수도 있음
  const myCards = ['fireSpell', 'lightSpell', 'iceSpell', 'windSpell', 'darkSpell']
  

  // cost 부족할 때 나타는 shake 효과
  const [isShaking, setIsShaking] = useState(false);

  function shake() {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 1000);
  }
  
  // 선택된 카드 리스트
  const [selectedCards, setselectedCard] = useState<string[]>([]);

  // 카드 선택
  const selectCard = (event: React.MouseEvent<HTMLImageElement>) => {
    if(cost-10 < 0) {
      shake()
    } else{
      setselectedCard([
        ...selectedCards,
        event.currentTarget.alt
      ])
      subCost()
    }
  };

  // 선택한 카드 삭제
  const removeCard = (event: React.MouseEvent<HTMLImageElement>, index: number) => {
    console.log(event)
    console.log(event.currentTarget)
    setselectedCard(selectedCards.slice(0, index).concat(selectedCards.slice(index + 1)));
    navigator.vibrate(200);
    addCost()
  };

  const dispatch = useDispatch();
  // skill 확정
  // 수정 필

  const navigate = useNavigate();
  const confirmSkills = () => {
    console.log('확인');
    // console.log(selectedCards);
    dispatch(attackActions.attackStart(selectedCards));
    navigate("/attack");
  }

  // cost + or -
  // 카드에 따른 cost 수정 필
  const cost = useSelector((state: RootState) => state.cost.cost);
  const maxCost = 30

  // const dispatch = useDispatch();

  const addCost = () => {
    dispatch(costActions.add(10))
  }
  const subCost = () => {
    dispatch(costActions.sub(10))
  }
  return (
    <div>
      <div className="flex-container">
        <div className="cost">
          <div>COST</div>
          { cost }/{ maxCost }
        </div>
        <div className={isShaking ? "shake selectedCardBox" : "selectedCardBox"}>
          <img src={Frame} alt="frame"/>
          <div className="selectedCard">
            {selectedCards.map((card: string, index: number) => (
              <img 
                key={index} 
                src={require(`../../../assets/card/icon/${card}.png`)} 
                alt={card}
                onClick={(event) => removeCard(event, index)}
              ></img>
            ))}
          </div>
        </div>
        <img src={ ConfirmBtn } alt="confirmBtn" onClick={confirmSkills} className='confirmBtn'/>
      </div>

      
      <div className="cards">
        {myCards.map((card, index) => (
          <img 
            key={index} 
            src={require(`../../../assets/card/front/${card}.png`)} 
            alt={card} 
            className="mycard" 
            onClick={selectCard}
          ></img>
        ))}
      </div>
    </div>
  )
}
export default Ready