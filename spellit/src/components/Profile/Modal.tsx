import React, { useState } from 'react'
import style from './index.module.css'
import closeBtn from '@/assets/profile/closeBtn.svg'
import modalBackgroundImg from '@/assets/profile/modalBody.svg'
import { UserType } from '@/utils/Types';
import API from '@/utils/API';

type Props = {
    closeModal: Function,
    user: UserType,
    modProp: string,
    modifyMyInfo: Function,
}

function Modal({ closeModal, user, modProp, modifyMyInfo }: Props) {
    const token = sessionStorage.getItem('token');
    const [nickname, setNickname] = useState<string>(user.nickname);
    const [profileMsg, setProfileMsg] = useState<string>(user.profileMsg);

    function changeNickname(event: any) {
        setNickname(event.target.value);
    }
    function changeProfileMsg(event: any) {
        setProfileMsg(event.target.value);
    }
    function modProfile() {
        API.put(`member/info`, { nickname, profileMsg }, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                modifyMyInfo(nickname, profileMsg);
                closeModal();
            }).catch(err => {
                alert('정보 변경에 실패했습니다.');
            })
    }

    return (
        <div className={`${style.modalContainer}`}>
            <img className={`${style.closeBtn}`} src={closeBtn} alt='close' onClick={() => closeModal()}></img>
            <img className={`${style.modalBodyBackgroundImg}`} src={modalBackgroundImg} alt='modalbodyimg' />
            <div className={`${style.modalBody}`}>
                <div className={`${style.modalTitle} ${style.noDrag}`}>
                    {modProp === 'nickname' && '별명 변경'}
                    {modProp === 'profileMsg' && '상태메시지 변경'}
                </div>
                {modProp === 'nickname' &&
                    <div className={`${style.modalInputRow}`}>
                        <div className={`${style.modalInputTitle} ${style.noDrag}`}>
                            별명
                        </div>
                        <div className={`${style.modalInputDiv}`}>
                            <input type="text" className={`${style.modalInput}`} value={nickname} onChange={changeNickname}></input>
                        </div>
                    </div>}
                {modProp === 'profileMsg' &&
                    <div className={`${style.modalInputRow}`}>
                        <div className={`${style.modalInputTitle} ${style.noDrag}`}>
                            상태메세지
                        </div>
                        <div className={`${style.modalInputDiv}`}>
                            <input type="text" className={`${style.modalInput}`} value={profileMsg} onChange={changeProfileMsg}></input>
                        </div>
                    </div>}
                <div className={`${style.modalInputRow}`}>
                    <div className={`${style.modalBtn} ${style.cancleBtn} ${style.noDrag}`} onClick={() => { closeModal() }}>취소</div>
                    <div className={`${style.modalBtn} ${style.confirmBtn} ${style.noDrag}`} onClick={(e) => { modProfile() }} >변경</div>
                </div>
            </div>
        </div>
    )
}

export default Modal