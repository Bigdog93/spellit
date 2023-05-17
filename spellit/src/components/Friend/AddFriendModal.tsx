import { RootState } from '@/store';
import { UserType } from '@/utils/Types';
import { useEffect, useState, useContext, ChangeEvent, ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { WebSocketContext } from '@/store/websocket';

import style from './Friend.module.css';
import '@/index.css';

import addFriendModalBodyFrame from '@/assets/ui/addFriendModalBodyFrame.svg';
import API from '@/utils/API';

type Props = {
	closeAddFriendModal: Function,
}

function AddFriendModal({ closeAddFriendModal }: Props) {

	const { send } = useContext(WebSocketContext);
	
	const token = sessionStorage.getItem('token');

	const [friendNickname, setFriendNickname] = useState<string>('');
	const me = useSelector((state: RootState) => state.user);

	function changeEmailInput(e:React.ChangeEvent<HTMLInputElement>) {
		const email = e.target.value;
		setFriendNickname(email);
		console.log(friendNickname);
	}

	function addFriendRequest() {
		API.post('member/friend/ask', {
			friendNickname: friendNickname,
			friendId: 0,
		},
			{ headers: { Authorization: `Bearer ${token}` } })
			.then(({ data }) => {
				console.log(data);
				send({
					event: 'friendRequest',
					memberId: me.id,
					roomId: 0,
					nickname: me.nickname,
					data: {
						otherId: data
					}
				})
				alert("친구 요청을 보냈습니다.");
				closeAddFriendModal();
			})
	}

	return (
		<div className="modalBg">
			<div className={`${style.addFriendModalBody}`}>
				<img src={addFriendModalBodyFrame} alt="dd"></img>
				<div className={`${style.addFriendModalContainer}`}>
					<div
						className={`${style.addFriendModalTitle} ${style.addFriendModalRow}`}
					>
						친구 추가
					</div>
					<div className={`${style.addFriendModalRow}`}>
						<div className={`${style.addFriendModalEmail}>`}>NickName</div>
						<input type="email" className={`${style.addFriendModalInput}`} onChange={changeEmailInput}></input>
					</div>
					<div className={`${style.addFriendModalRow}`}>
						<div className={`${style.modalBtn} ${style.cancleBtn}`} onClick={() => { closeAddFriendModal() }}>취소</div>
						<div className={`${style.modalBtn} ${style.confirmBtn}`} onClick={(e) => { addFriendRequest() }} >친구 신청</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddFriendModal