import React from 'react'
import style from './index.module.css'
import closeBtn from '@/assets/profile/closeBtn.svg'
import modalBackgroundImg from '@/assets/profile/modalBody.svg'
import { UserType } from '@/utils/Types';

type Props = {
    closeModal: Function,
    user: UserType,
}

function Modal({closeModal, user}: Props) {
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
                        <input type="text" className={`${style.modalInput}`} value={user.nickname}></input>
                    </div>
                </div>
                <div className={`${style.modalInputRow}`}>
                    <div className={`${style.modalInputTitle} ${style.noDrag}`}>
                        상태메세지
                    </div>
                    <div className={`${style.modalInputDiv}`}>
                        <input type="text" className={`${style.modalInput}`} value={user.profileMsg}></input>
                    </div>
                </div>
                <div className={`${style.modalInputRow}`}>
                    <div className={`${style.modalBtn} ${style.cancleBtn} ${style.noDrag}`}>취소</div>
                    <div className={`${style.modalBtn} ${style.confirmBtn} ${style.noDrag}`}>변경</div>
                </div>
            </div>
        </div>
    )
}

export default Modal