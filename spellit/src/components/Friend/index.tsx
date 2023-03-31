import { RootState } from '@/store';
import { UserEntityType } from '@/utils/Types';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EachFriend from './EachFriend';

import style from './Friend.module.css';
import friendPopupFrameImg from '@/assets/ui/friendModal.svg';
import addFriendIcon from '@/assets/ui/addFriend.svg';
import closeBtn from '@/assets/ui/closeBtn.svg'
import AddFriendModal from './AddFriendModal';
import { friendsActions } from '../../store/friends';


type Props = {
    openAddFriendModal: Function,
    closeFriendPopup: Function
}

function Friend({ openAddFriendModal, closeFriendPopup } : Props) {
    const dispatch = useDispatch();
    
    const friends = useSelector((state: RootState) => { return state.friends.friends });
    const friendWaits = useSelector((state: RootState) => { return state.friends.friendWaits });
    const [friendCount, setFriendCount] = useState<number>(0);
    const [onlineFriendCount, setOnlineFriendCount] = useState<number>(0);
    useEffect(() => {
        setFriendCount(friends.length);
        for (let f of friends) {
            if (f.isOnline) {
                setOnlineFriendCount(onlineFriendCount + 1);
            }
        }
    }, [friends])


    function acceptFriendRequest(friend:UserEntityType) {
        dispatch(friendsActions.acceptFriendRequest(friend))
    }

    return (
      <div className={`${style.friendPopupWindow}`}>
        <img
          className={`${style.friendPopupFriendImg}`}
          src={friendPopupFrameImg}
          alt="friendPopupFrameImg"
            />
            <div className={`${style.closeBtnDiv}`} onClick={() => { closeFriendPopup() }}>
                <img src={closeBtn} className={`${style.closeBtn}`} alt=''></img>
            </div>
        <div className={`${style.friendPopupContainer}`}>
          <div className={`${style.friendListTitle}`}>친구목록</div>
          <div className={`${style.friendUpperRow}`}>
            <button
              className={`${style.friendRequestBtn} ${style.btn}`}
              onClick={() => openAddFriendModal()}
            >
              <img src={addFriendIcon} alt="addFriendIcon" />
            </button>
            <div className={`${style.friendCountDiv}`}>
              {onlineFriendCount} / {friendCount} 명
            </div>
          </div>
          <div className={`${style.friendListScrollContainer}`}>
            <div className={`${style.friendList}`}>
              {friendWaits.map((friend: UserEntityType, idx: number) => {
                console.log(friend);
                return (
                  <div key={idx}>
                        <EachFriend
                            friend={friend}
                            isFriend={false}
                            acceptFriendRequest={acceptFriendRequest} />
                  </div>
                );
              })}
            </div>
            <div className={`${style.friendList}`}>
              {friends.map((friend: UserEntityType, idx: number) => {
                console.log(friend);
                return (
                  <div key={idx}>
                        <EachFriend
                            friend={friend}
                            isFriend={true}
                            acceptFriendRequest={acceptFriendRequest} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Friend;