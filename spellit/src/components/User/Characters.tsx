import style from './index.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { MouseEventHandler, useState } from 'react';
import characterInfoFrame from '@/assets/ui/characterInfoFrame.svg'

type GameCharacterType = {
  id : number,
  characterName : string,
  englishName : string,
  stand : string,
  hurt : string,
  attack : string,
  winner : string,
  combo : string,
}
interface PropsType {
  characters: Array<GameCharacterType>;
  selectCharacter: (res: GameCharacterType) => void;
};

const Characters = ({characters, selectCharacter}: PropsType) => {
  const onSelectCharacter = (data:any)=>{
    selectCharacter(data);
    console.log(data)
  }
  const characterId = useSelector((state:RootState) => state.user.gameCharacter?.id)

  const [xy, setXY] = useState({ x: 0, y: 0 })
  const [tooltipArr, setTooltipArr] = useState<Array<boolean>>([false, false, false]);

  const characterNames = ["곽춘배", "아오츠키 키리카", "루나 아르테미스"];
  const hanzaName = ["(郭春徘)", "(青月 霧花)", "(Luna Artemis)"]
  const ages = ["1238살", "18살", "추정불가(??)"]
  const spacials = ["땅/불", "얼음/바람", "어둠/빛"]
  const likeThings = ["누워있기, 파전, 막걸리, 이불빨래하기", "강아지, 귤, 코타츠, 개그프로 보기", "고양이, 헬스, 약과"]
  const dislikeThings = ["의자, 귀찮음, 손소독제", "악당, 체크남방, 레몬", "아메리카노, 공대생, 당근"]
  const stories = [
    "마법의 힘으로 젊음을 유지하고 있다. 1000살을 넘게 먹었지만 여전히 유치함.",
    "나이는 어리지만 마법에 천부적인 재능을 가지고 있다. 어느 대마법사와 계약 관계라는 이야기가 있음.",
    "언제부터 존재했는지 알수없음. 공존 할수 없는 빛 마법과 어둠 마법을 동시에 사용할 수 있다."]

  const xyHandler = (e :any) => {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    if (mouseY < 360) {
      mouseY = 360;
    }

    setXY({x : mouseX, y: mouseY});
    
  }

  const tooltipPop = (index: number) => {
    tooltipArr[index] = true;
    setTooltipArr(tooltipArr);
  }
  const tooltipRemove = (index: number) => {
    tooltipArr[index] = false;
    setTooltipArr([false, false, false]);
  }

  return (
    <div className={`${style.characterItems}`}>
      {characters.map((character: GameCharacterType, index: number) => (
        <div key={index} onMouseMove={xyHandler}>
          <div className={`${style.characterDiv}`}
            onClick={(e) => onSelectCharacter(character)}
            onMouseOver={() => { tooltipPop(index) }}
            onMouseOut={() => { tooltipRemove(index) }}>
            {/* {character.characterName} */}
            <img className={(characterId === index + 1 ? `${style.characterImg} ${style.shadowCharacter}` : `${style.characterImg}`)} src={require(`../../assets/character/${character.englishName}_card.png`)} alt="" />
            {/* <Card key={index} card={card.code}/> */}
          </div>
          {tooltipArr[index] && <div className={`${style.charcaterInfoContainer} ${style[character.englishName]}`} style={{
            transform: `translate(${xy.x}px, ${xy.y}px)`
          }}>
            <img src={characterInfoFrame} alt="characterInfo"></img>
            <div className={`${style.characterInfoDiv}`}>
              <div className={`${style.characterInfoName}`}>
                {characterNames[index]}
                <div className={`${style.hanza}`}>{hanzaName[index]}</div>
              </div>
              <div className={`${style.characterInfoRow}`}>나이 : {ages[index]}</div>
              <div className={`${style.characterInfoRow}`}>특화속성 : {spacials[index]}</div>
              <div className={`${style.characterInfoRow}`}>좋아하는 것 : {likeThings[index]}</div>
              <div className={`${style.characterInfoRow}`}>싫어하는 것 : {dislikeThings[index]}</div>
              <div className={`${style.characterInfoRow} ${style.characterStory}`}>{stories[index]}</div>
            </div>
          </div>}
        </div>
      ))}
      
    </div>
  )
}

export default Characters;