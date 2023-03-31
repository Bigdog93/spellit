import { UserEntityType } from '@/utils/Types'
import React, { useContext } from 'react'

import style from './Friend.module.css'
import battleImg from '@/assets/ui/battle.png';
import addUserImg from '@/assets/ui/add-user.png'
import closeBtn from '@/assets/ui/closeBtn.svg'
import onlineDot from '@/assets/ui/online_dot.png'
import offlineDot from '@/assets/ui/offline_dot.png'

import API from '@/utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { friendsActions } from '@/store/friends';
import { RootState } from '@/store';
import { WebSocketContext } from '@/store/websocket';

type Props = {
  friend: UserEntityType,
  isFriend: boolean,
  acceptFriendRequest: Function,
}

function EachFriend({ friend, isFriend, acceptFriendRequest }: Props) {
  const { send } = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const friends = useSelector((state: RootState) => { return state.friends.friends });
  const friendWaits = useSelector((state: RootState) => { return state.friends.friendWaits });
  
  const token = sessionStorage.getItem('token');
  const me = useSelector((state: RootState) => state.user);

  function acceptFriend() {
    API.post("member/friend/accept",
      { friendId: friend.id },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      acceptFriendRequest(friend);
      send({
        event: 'friendResponse',
        memberId: me.id,
        nickname: me.nickname,
        data: {
          otherId: friend.id,
        }
      })
    }).catch (err => {
      dispatch(friendsActions.removeFriendWaits(friend.id))
    })
  }

  return (
    <div className={`${style.EachFriendContainer}`}>
      <div className={`${style.friendInfoleft}`}>
      <div className={`${style.friendCharacterDiv}`}>
      <img className={`${style.friendCharacterImg}`}
        src={require(`../../assets/character/${friend.gameCharacterEntity?.englishName}_portrait.png`)} 
        alt="portrait"
        />
      </div>
      {friend.isOnline ? <img className={`${style.isOnlineDot}`} src={onlineDot} alt=''></img>
      : <img className={`${style.isOnlineDot}`} src={offlineDot} alt=''></img>}
      <div className={`${style.friendInfoDiv}`}>
        <div className={`${style.friendNickname}`}>{friend.nickname}</div>
        <div className={`${style.friendLevel}`}>Lv.{friend.level}</div>
        </div>
      </div>
      <div className={`${style.friendInfoRight}`}>
      {!isFriend && <div className={`${style.friendBtnDiv}`}>
        <button className={`${style.frinedAcceptBtn} ${style.btn}`} onClick={acceptFriend}>
          <img src={addUserImg} alt="battleImg"></img>
        </button>
        </div>}
      {isFriend && <div className={`${style.friendBtnDiv}`}>
        <button className={`${style.frinedBattleBtn} ${style.btn}`}>
          <img src={battleImg} alt="battleImg"></img>
        </button>
      </div>}
        </div>
    </div>
  )
}

export default EachFriend