import { UserEntityType } from '@/utils/Types'
import React from 'react'

import style from './Friend.module.css'
import battleImg from '@/assets/ui/battle.png';
import addUserImg from '@/assets/ui/add-user.png'

type Props = {
  friend: UserEntityType,
  isFriend: boolean,
}

function EachFriend({friend, isFriend}: Props) {
  return (
    <div className={`${style.EachFriendContainer}`}>
      <div className={`${style.friendInfoleft}`}>
      <div className={`${style.friendCharacterDiv}`}>
      <img className={`${style.friendCharacterImg}`}
        src={require(`../../assets/character/${friend.gameCharacterEntity?.englishName}_portrait.png`)} 
        alt="portrait"
        />
      </div>
      <div className={`${style.friendInfoDiv}`}>
        <div className={`${style.friendNickname}`}>{friend.nickname}</div>
        <div className={`${style.friendLevel}`}>Lv.{friend.level}</div>
        </div>
      </div>
      {isFriend && <div className={`${style.friendBtnDiv}`}>
        <button className={`${style.frinedBattleBtn} ${style.btn}`}>
          <img src={battleImg} alt="battleImg"></img>
        </button>
      </div>}
      {!isFriend && <div className={`${style.friendBtnDiv}`}>
        <button className={`${style.frinedAcceptBtn} ${style.btn}`}>
          <img src={addUserImg} alt="battleImg"></img>
        </button>
      </div>}
    </div>
  )
}

export default EachFriend