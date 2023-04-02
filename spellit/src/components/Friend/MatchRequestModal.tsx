import { RootState } from '@/store';
import { UserType } from '@/utils/Types';
import { useEffect, useState, useContext, ChangeEvent, ChangeEventHandler } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WebSocketContext } from '@/store/websocket';

import style from './Friend.module.css';
import '@/index.css';

import addFriendModalBodyFrame from '@/assets/ui/addFriendModalBodyFrame.svg';
import API from '@/utils/API';
import { friendsActions } from '@/store/friends';
import { useNavigate } from 'react-router-dom';

type Props = {

}

function AddFriendModal({  }: Props) {

	const { send } = useContext(WebSocketContext);
	const dispatch = useDispatch();
	
	const friend = useSelector((state: RootState) => state.friends.matchRequestPlayer)
	const roomId = useSelector((state: RootState) => state.friends.matchRequestRoomId);
	const navigate = useNavigate();
	
	const token = sessionStorage.getItem('token');

	const me = useSelector((state: RootState) => state.user);

  // 확인 버튼 누르면 바로 matching으로 navigate 시켜주기

	function refuseRequest() {
		send({
			event: 'matchResponse',
			memberId: me.id,
			roomId: 0,
			data: {
				otherId: friend?.id,
				response: false
			}
		})
		dispatch(friendsActions.setMatchRequestPlayer(null));
		dispatch(friendsActions.setMatchRequestModalFlag(false));
	}
	function acceptRequest() {
		/* 이거 매칭 넘어가서 보내자.. navigate 하면서 소켓 끊김 */
		send({
			event: 'matchResponse',
			memberId: me.id,
			roomId: roomId,
			data: {
				otherId: friend?.id,
				response: true
			}
		})
		dispatch(friendsActions.setMatchRequestPlayer(null));
		dispatch(friendsActions.setMatchRequestModalFlag(false));
		navigate('/matching');
	}

	return (
    <div className="modalBg">
      <div className={`${style.addFriendModalBody}`}>
        <img src={addFriendModalBodyFrame} alt="dd"></img>
        <div className={`${style.matchRequestModalBody}`}>
          <div className={`${style.matchRequestModalTitle}`}>대전 신청</div>
          <div className={`${style.modalInfoRow}`}>
            <span className={`${style.otherNickname}`}>{friend?.nickname}</span> 님으로 부터 대전 신청이 왔습니다.
          </div>
          <div className={`${style.modalInfoRow} ${style.modalResponseBtnDiv}`}>
            <button type="button" className={`${style.btn} ${style.refuseBtn}`} onClick={refuseRequest}>
              거절
            </button>
            <button type="button" className={`${style.btn} ${style.accept}`} onClick={acceptRequest}>
              수락
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFriendModal