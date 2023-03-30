import { useState } from 'react'
import style from './Profile.module.css'
import closeBtn from '@/assets/profile/closeBtn.svg'
import { UserType } from '@/utils/Types'
import API from '@/utils/API'

type Props = {
    backToProfile: Function,
    user: UserType,
}

function PasswordConfig({ backToProfile, user }: Props) {
    const token = sessionStorage.getItem("token");

    const [currentPw, setCurrentPw] = useState<string>('');
    const [newPw, setNewPw] = useState<string>('');
    const [newPwChk, setNewPwChk] = useState<string>('');

    const modifyPassword = () => {
        if (newPw !== newPwChk) {
            alert('비밀번호 확인해주세요');
            return;
        }
        API.put<any>('auth/changepwd', {
            originPassword: currentPw,
            password: newPw,
            passwordConfirm: newPwChk,
        }, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);
                alert('비밀번호가 변경되었습니다.');
                backToProfile();
            }).catch(err => {
                console.log(err);
                const code = err.response.status;
                if (code === 400) {
                    alert('현재 비밀번호를 확인해주세요.');
                }
        })
    }
  return (
    <div className={`${style.passwordConfigContainer}`}>
        <img className={`${style.closeBtn}`} src={closeBtn} alt='close' onClick={() => backToProfile()}></img>
          <div className={`${style.passwordConfigTitle}`}>
            <div className={`${style.bigSize}`}>개인정보 수정</div>
          </div>
          <div className={`${style.passwordConfigRow} ${style.passWordConfigEmail}`}>
            <div className={`${style.passwordConfigName}`}>이메일</div>
            <div className={`${style.passwordConfigInfo}`}>{user.email}</div>
          </div>
          <div className={`${style.passwordConfigRow}`}>
            <div className={`${style.passwordConfigName}`}>현재 비밀번호</div>
              <input type='password' className={`${style.passwordConfigInput}`} onChange={(e) => {
                  setCurrentPw(e.target.value);
            }}></input>
          </div>
          <div className={`${style.passwordConfigRow}`}>
            <div className={`${style.passwordConfigName}`}>새 비밀번호</div>
            <input type='password' className={`${style.passwordConfigInput}`}onChange={(e) => {
                  setNewPw(e.target.value);
            }}></input>
          </div>
          <div className={`${style.passwordConfigRow}`}>
            <div className={`${style.passwordConfigName}`}>새 비밀번호 확인</div>
            <input type='password' className={`${style.passwordConfigInput}`}onChange={(e) => {
                  setNewPwChk(e.target.value);
            }}></input>
          </div>
          <div className={`${style.passwordConfigRow}`}>
            <button className={`${style.btn} ${style.modPassword}`} onClick={modifyPassword}>비밀번호 변경</button>
          </div>
        </div>
  )
}

export default PasswordConfig