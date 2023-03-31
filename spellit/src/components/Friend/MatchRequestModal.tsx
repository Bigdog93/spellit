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

}

function AddFriendModal({  }: Props) {

	const { send } = useContext(WebSocketContext);
	
	const token = sessionStorage.getItem('token');

	const me = useSelector((state: RootState) => state.user);

  // 확인 버튼 누르면 바로 matching으로 navigate 시켜주기


	return (
		<div className="modalBg">
			<div className={`${style.addFriendModalBody}`}>
				<img src={addFriendModalBodyFrame} alt="dd"></img>
				
			</div>
		</div>
	);
}

export default AddFriendModal