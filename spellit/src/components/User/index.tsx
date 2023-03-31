import { useState, useContext, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { userActions } from "@/store/user"
import { RootState } from "@/store/";
import API from "@/utils/API";

import Cards from './Cards'
import Characters from "./Characters";
import style from './index.module.css'

import homeBtnImg from '@/assets/ui/homeBtn.svg';
import { useNavigate } from "react-router-dom";

interface CardType {
  attribute: number;
  code: string;
  cost: number;
  damage: number;
  id: number;
  spell: string;
  title: string
}
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

const User = () => {

  const token = sessionStorage.getItem("token");

  const dispatch = useDispatch();
  // onClick 이동
  const navigate = useNavigate();
  
  // 전체 캐릭터 목록
  const [characters, setCharacters] = useState<Array<GameCharacterType>>([]);
  useEffect(() => {
    API.get(
      'game/character',
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then(({data}) => {
      console.log(data)
      setCharacters(data)
      console.log(characters)
    }).catch((err) => console.log(err))
    return () => {}
  }, [])
    
  // 내 캐릭터
  const character = useSelector((state: RootState) => state.user.gameCharacter);

  // 캐릭터 선택했을 때
  const selectCharacter = (res: GameCharacterType) => {
    // setCharacter(res)
    dispatch(userActions.setCharacter(res));
    /* API 요청 */
    API.put('member/character',
      res ,
      { headers: { Authorization: `Bearer ${token}` } })
    console.log(character)
    console.log(res)
  }
  



  // 내가 선택한 카드
  // const [deck, setDeck] = useState<Array<CardType>>([]);
  const deck = useSelector((state: RootState) => state.user.deck);

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
      // setDeck([...deck, res])
      dispatch(userActions.addCard(res));
      console.log('cardseledted')
      console.log(deck)
    } else if (deck.length >= 5) {
      shake()
    }
  };
  
  // 선택한 카드 삭제
  const removeCard = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    dispatch(userActions.removeCard(index));
    navigator.vibrate(200);
  };


  const [mode, setMode] = useState<boolean>(false)
  const switchHandler = () => { 
    console.log('btn click')
    setMode(!mode)
  };

  const toHome = () => {
    navigate('/home');
  }

  return (
    <div className={`${style.bg}`}>
      <button type="button" className={`${style.btn} ${style.homeBtn}`} onClick={toHome}>
        <img src={homeBtnImg} alt="home"></img>
      </button>      {/* { !mode &&  <Cards cards={cards} selectCard={selectCard}/>} */}
      { !mode && <div className={`${style.cardsContainer}`}>
        <Cards cards={cards} selectCard={selectCard}/>
      </div>}

      <div className={`${style.sidebar}`}>
        {/* 선택된 캐릭터 */}
        {/* <div className={isShaking ? `${style.shake}`  : `${style.cardselectcontainer}`}> */}
          <div className={`${style.selectedCharacter}`}>
            <button className={`${style.deckBtn} ${style.characterkBtn}`} disabled={mode}>
              <img 
                src={require(`../../assets/character/${character?.englishName}_portrait.png`)} 
                alt="portrait" 
                onClick={switchHandler}
              />
              </button>
          </div>


          {/* 선택된 카드 덱 */}
        <div className={isShaking ? `${style.shake}`  : `${style.cardselectcontainer}`}>
          <div className={`${style.selectedCards}`} >
            <br />
            <div className={`${style.myDeckTittle}`}>
              <div className={`${style.myDeck}`}>
                My Deck
              </div>
              <button className={`${style.deckBtn} ${style.myDeckSettingBtn}`} disabled={!mode}>
                <img 
                  src={require('../../assets/ui/setting.png')}
                  alt="setting"
                  // className={`${style.myDeckSettingBtn}`}
                  onClick={switchHandler}
                />
              </button>
            </div>
            <br />
            <hr />
            {deck.map((item: CardType, index: number) => (
              <div>
                <div
                  key={index}
                  onClick={(event) => removeCard(event, index)}
                >{item.title}</div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
      { mode && <div className={`${style.items}`}>
        <Characters characters={characters} selectCharacter={selectCharacter}/>
      </div>}
    </div>
  )
}

export default User;

