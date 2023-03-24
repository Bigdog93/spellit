import { useState, FormEvent, ChangeEvent } from 'react'
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
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  // 7자 제한
  const [nickname, setNickname] = useState('')
  // 100자 제한
  const [startSpell, setStartSpell] = useState('')


  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    console.log(email)
  }
  const password1ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword1(event.target.value)
  }
  const password2ChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword2(event.target.value)
    pwCheck()
  }
  const nicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }
  const startSpellChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setStartSpell(event.target.value)
  }


  const pwCheck = ()=> {
    if(password2.length > 0 && password1 !== password2){
      console.log('worng pw')
    }
  }

  const signupHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('회원가입 시작')
    // 회원가입
    API.post<any>(
      "auth/signup", 
      {'email': email, 'password': password1, 'nickname': nickname, 'startSpell': startSpell}, 
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
    }).catch((err) => {
      console.log(err)
    })
    
  };

  
  const toLogin = () => {
   navigate('/login')
  }

  return (
    <div className='auth-bg'>
      <div className="login-box">
        <form action="submit" className="login-form" onSubmit={signupHandler}>
          <div>
            <label htmlFor="">EMAIL</label>
            <br />
            <input 
              type="email" 
              onChange={emailChangeHandler}
            />
            <button>중복 확인</button>
            <br />
            {/* {(email.length && emailAbailablity) && <div>사용 가능한 이메일입니다.</div>}
            {(email.length && emailAbailablity) && <div>사용 불가한 이메일입니다.</div>} */}
          </div>
          <br />
          <div>
            <label htmlFor="">PASSWORD</label>
            <br />
            <input 
              type="password" 
              onChange={password1ChangeHandler}
            />
            <br />
            <label htmlFor="">PASSWORD 확인</label>
            <br />
            <input 
              type="password" 
              onChange={password2ChangeHandler}
            />

          </div>
          <br />
          <label htmlFor="">NICKNAME</label>
          <br />
          <input 
            type="text" 
            onChange={nicknameChangeHandler}
          />
          <br />
          <label htmlFor="">SPELL</label>
          <br />
          <input 
            type="text" 
            onChange={startSpellChangeHandler}
          />
          <br />
          <button type="submit">Connect</button>
        </form>
        <br />
        <hr />
        <img src={kakao} alt="kakao" className="mouse-hover"/>
        <p onClick={toLogin} className="mouse-hover">로그인</p>
      </div>
    </div>
  )
}
export default Signup
