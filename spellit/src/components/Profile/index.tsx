import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from "@/utils/API"

import { UserType, DeckType } from '@/utils/Types';

import playCountUp from '../../assets/profile/playCountUp.svg'
import playCountDown from '../../assets/profile/playCountDown.svg'
import editBtnImg from '@/assets/profile/editBtn.svg'

import style from './index.module.css'
import Card from './Card';
import Modal from './Modal';


const Profile = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");

  const korAttributes = ['바람', '물', '불', '땅', '빛', '어둠'];

  const [user, setUser] = useState<UserType>({
    deck: [],
    email: 'string',
    exp: 0,
    gameCharacter: null,
    id: null,
    level: 0,
    nickname: '',
    playCount: 0,
    winCount: 0,
    looseCount: 0,
    drawCount: 0,
    profileMsg: '',
    isOnline: false,
  });

  const [hoveredCard, setHoveredCard] = useState<DeckType>(user.deck[0])

  const [nicknameModal, setNicknameModal] = useState<boolean>(false);

  const openNicknameModal = () => {
    setNicknameModal(true);
  }
  const closeNicknameModal = () => {
    setNicknameModal(false);
  }

  useEffect(() => {
    API.get<any>(
      `member/info/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => {
      // 수정 필요
      console.log(res.data)
      setUser(res.data)
      return user;
    }).then((res) => {
      console.log(res);
    })
    console.log(id)
  }, [])
  
  const cardInfo = (card :DeckType) => {
    setHoveredCard(card);
  }

  return (
    <>
    <div className={`${style.bg}`}>
      <div className={`${style.sidebar}`}>
        <div className={`${style.selectedCharacter}`}>
            <button className={`${style.deckBtn} ${style.characterkBtn}`}>
            {user.gameCharacter && <img
              src={require(`../../assets/character/${user.gameCharacter?.englishName}_portrait.png`)}
              alt="portrait"
            />}
              </button>
        </div>
        <div className={`${style.userRecord}`}>
          <div className={`${style.playCount}`}>
            <img className={`${style.playCountUp}`} src={playCountUp} alt='playCountUp.svg' />
            {/* <div className={`${style.bigNumber}`}>{user.playCount}</div> */}
            <div className={`${style.bigSize}`}>133</div>
            <div>플레이한 게임</div>
            <img className={`${style.playCountDown}`} src={playCountDown} alt='playCountDown.svg' />
          </div>
          <div className={`${style.winRateDiv}`}>
            {/* <div>{user.winCount / user.playCount === 0 ? 1 : user.playCount}</div> */}
            <div className={`${style.midSize}`}>54.6</div>
            <div>승률</div>
          </div>
          <div className={`${style.winCountDiv}`}>
            <div>
              <div className={`${style.midSize}`}>{user.winCount}</div>
              <div>승</div>
            </div>
            <div>
              <div className={`${style.midSize}`}>{user.looseCount}</div>
              <div>패</div>
            </div>
            <div>
              <div className={`${style.midSize}`}>{user.drawCount}</div>
              <div>무</div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.items}`}>
        <div className={`${style.container}`}>
          <div className={`${style.userTextContainer}`}>
            <div className={`${style.bigSize}`}>
              {user.nickname}
              <div className={`${style.editBtn}`} onClick={openNicknameModal}>
                <img className={`${style.editBtnImg}`} src={editBtnImg} alt='editBtn.svg' />
              </div> 
            </div>
            <div className={`${style.smallSize}`}>
              {user.profileMsg}
              <div className={`${style.editBtn}`} onClick={openNicknameModal}>
                <img className={`${style.editBtnImg}`} src={editBtnImg} alt='editBtn.svg' />
              </div>  
            </div>
          </div>
          <div className={`${style.infoRow}`}>
            <div className={`${style.infoTitle}`}>
              덱
            </div>
            <div className={`${style.deckDiv}`}>
              {/* 반복문 카드 뿌리기 */}
              { user.deck.map((card: DeckType, index: number) => (
                <div onMouseOver={(e) => cardInfo(card)} className={`${style.cardContainer}`}>
                  <Card key={index} card={card.code}/>
                </div>
              ))}
            </div>
          </div>
          <div className={`${style.infoRow}`}>
            <div className={`${style.infoTitle}`}>
              마법명
            </div>
            <div className={`${style.cardTitle}`}>
              {hoveredCard?.title}
            </div>
          </div>
          <div className={`${style.infoRow}`}>
            <div className={`${style.infoTitle}`}>
              마법주문
            </div>
            <div className={`${style.cardInfo} ${style.cardInfoTitle}`}>{hoveredCard?.spell}</div>
          </div>
          <div className={`${style.infoRow}`}>
            <div className={`${style.infoTitle}`}>
              피해량
            </div>
            <div className={`${style.cardInfo}`}>{hoveredCard?.damage}</div>
          </div>
          <div className={`${style.infoRow}`}>
            <div className={`${style.infoTitle}`}>
              마나 소모
            </div>
            <div className={`${style.cardInfo}`}>{hoveredCard?.cost} cost</div>
          </div>
          <div className={`${style.infoRow}`}>
            <div className={`${style.infoTitle}`}>
              속성
            </div>
            <div className={`${style.cardInfo}`}>{korAttributes[hoveredCard?.attribute]}</div>
          </div>
        </div>
      </div>
      </div>
      {nicknameModal && <Modal closeModal={closeNicknameModal} user={user}></Modal>}
      </>
  )
};
export default Profile;
