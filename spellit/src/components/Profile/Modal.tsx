import React, { useState } from 'react'
import style from './index.module.css'
import closeBtn from '@/assets/profile/closeBtn.svg'
import modalBackgroundImg from '@/assets/profile/modalBody.svg'
import { UserType } from '@/utils/Types';

type Props = {
    closeModal: Function,
    user: UserType,
}

function Modal({ closeModal, user }: Props) {
    const [nickname, setNickname] = useState<string>(user.nickname);
    const [profileMsg, setProfileMsg] = useState<string>(user.profileMsg);

    function changeNickname(event: any) {
        setNickname(event.target.value);
    }
    function changeProfileMsg(event: any) {
        setProfileMsg(event.target.value);
    }

    return (
        <div className={`${style.modalContainer}`}>
            <img className={`${style.closeBtn}`} src={closeBtn} alt='close' onClick={() => closeModal()}></img>
            <img className={`${style.modalBodyBackgroundImg}`} src={modalBackgroundImg} alt='modalbodyimg' />
            <div className={`${style.modalBody}`}>
                <div className={`${style.modalTitle} ${style.noDrag}`}>프로필 변경</div>
                <div className={`${style.modalInputRow}`}>
                    <div className={`${style.modalInputTitle} ${style.noDrag}`}>
                        별명
                    </div>
                    <div className={`${style.modalInputDiv}`}>
                        <input type="text" className={`${style.modalInput}`} value={nickname} onChange={changeNickname}></input>
                    </div>
                </div>
                <div className={`${style.modalInputRow}`}>
                    <div className={`${style.modalInputTitle} ${style.noDrag}`}>
                        상태메세지
                    </div>
                    <div className={`${style.modalInputDiv}`}>
                        <input type="text" className={`${style.modalInput}`} value={profileMsg} onChange={changeProfileMsg}></input>
                    </div>
                </div>
                <div className={`${style.modalInputRow}`}>
                    <div className={`${style.modalBtn} ${style.cancleBtn} ${style.noDrag}`} onClick={() => closeModal()}>취소</div>
                    <div className={`${style.modalBtn} ${style.confirmBtn} ${style.noDrag}`}>변경</div>
                </div>
            </div>
        </div>
    )
}

export default Modal