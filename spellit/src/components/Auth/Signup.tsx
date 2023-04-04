import { useState, FormEvent, ChangeEvent, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { userActions } from '@/store/user'

import './Login.css'
import API from "@/utils/API"
import kakao from '../../assets/ui/kakao_login_medium_narrow.png'


const Signup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  // 7자 제한
  const [nickname, setNickname] = useState('')
  // 100자 제한
  const [startSpell, setStartSpell] = useState('')

  const [wrongPw, setWrongPw] = useState<boolean>(true);
  const [emailAbailablity, setEmailAbailablity] = useState<boolean>(false);
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [signUpAvailable, setSignUpAvailable] = useState<boolean>(false);

  const pw1 = useRef<HTMLInputElement>();
  const pw2 = useRef<HTMLInputElement>();



  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  useEffect(() => {
    console.log(isPasswordConfirm, emailAbailablity);
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (email.match(regExp)) {
      setEmailAbailablity(true);
      API.post<any>('auth/signup/email',
        { 'email': email },)
        .then(({ data }) => {
          setEmailAbailablity(data);
        })
    } else {
      setEmailAbailablity(false);
    }

    
  }, [email])
  const password1ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const password2ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value)
  }
  useEffect(() => {
    if (password.length > 0 && password === passwordConfirm) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요.')
      setIsPasswordConfirm(true)
    } else {
      setPasswordConfirmMessage('비밀번호가 틀립니다.')
      setIsPasswordConfirm(false)
    }
  }, [password, passwordConfirm])

  const nicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }
  const startSpellChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setStartSpell(event.target.value)
  }

  useEffect(() => {
    if (emailAbailablity && isPasswordConfirm && nickname.length > 0) {
      setSignUpAvailable(true);
    } else {
      setSignUpAvailable(false);
    }
  }, [email, password, passwordConfirm, nickname])



  const signupHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('회원가입 시작')
    if (!emailAbailablity || !isPasswordConfirm) return;
    // 회원가입
    API.post<any>(
      "auth/signup", 
      {'email': email, 'password': password, 'nickname': nickname, 'startSpell': startSpell}, 
    ).then((res) => {
      console.log('회원가입 성공')
      console.log(res.data)
      // // 로그인
      // API.post<any>(
      //   "auth/login", 
      //   {'email': email, 'password': password1}, 
      // ).then((res) => {
      //   console.log(res)
      //   const token = res.data.accessToken
      //   sessionStorage.setItem("token", token);
      //   // 내 정보 가져와서 store/user에 저장
      //   API.get<any>(
      //     "member/info", 
      //     { headers: { Authorization: `Bearer ${token}` } }
      //   ).then((res) => {
      //     console.log('유저정보 가져오기 성공')
      //     console.log(res.data)
      //     dispatch(userActions.setMyInfo(res.data))
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      //   navigate('/home')
      // }).catch((err) => {
      //   console.log(err)
      // })
      navigate('/login');
    }).catch((err) => {
      console.log(err)
    })
    
  };
  const test = {
    color: 'red',
  }
  
  const toLogin = () => {
   navigate('/login')
  }

  return (
    <div className="auth-bg">
      <div className="login-box">
        <form action="submit" className="login-form" onSubmit={signupHandler}>
          <div className="signupRow">
            <div>
              <label htmlFor="">EMAIL</label>
            </div>
            <div>
              <input className='loginInput' type="email" onChange={emailChangeHandler} />
            </div>
            {email.length > 0 && emailAbailablity && (
              <div className="message success">사용 가능한 이메일입니다.</div>
            )}
            {email.length > 0 && !emailAbailablity && (
              <div className="message error">사용 불가한 이메일입니다.</div>
            )}
          </div>
          <div className="signupRow">
            <div>
              <label htmlFor="">PASSWORD</label>
            </div>
            <div>
              <input className='loginInput' type="password" onChange={password1ChangeHandler} />
            </div>
            <div>
              <label htmlFor="">PASSWORD CHECK</label>
            </div>
            <div>
              <input className='loginInput' type="password" onChange={password2ChangeHandler} />
            </div>
            {(passwordConfirm.length > 0 || password.length > 0) && (
              <div
                className={`message ${isPasswordConfirm ? "success" : "error"}`}
              >
                {passwordConfirmMessage}
              </div>
            )}
          </div>
          <div className="signupRow">
            <div>
              <label htmlFor="">NICKNAME</label>
            </div>
            <div>
              <input
                className="loginInput"
                type="text"
                onChange={nicknameChangeHandler}
              />
            </div>
          </div>

          {/* <br />
          <label htmlFor="">SPELL</label>
          <br />
          <input 
            type="text" 
            onChange={startSpellChangeHandler}
          /> */}
          <div className="signupRow">
            {signUpAvailable && <button className="signupBtn" type="submit" >
              SIGN UP
            </button>}
            {
              !signUpAvailable && <button className="disabled" type="button" disabled>
              SIGN UP
            </button>
            }
          </div>
        </form>
        {/* <img src={kakao} alt="kakao" className="mouse-hover"/> */}
        <button onClick={toLogin} className="mouse-hover signupBtn">
          CANCEL
        </button>
      </div>
    </div>
  );
}
export default Signup
