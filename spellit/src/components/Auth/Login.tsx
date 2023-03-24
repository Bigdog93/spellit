import { useState, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { userActions } from "@/store/user"
import API from "@/utils/API"
import './Login.css'
import kakao from '../../assets/ui/kakao_login_medium_narrow.png'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const idChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
    
  const pwChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };
  
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('login btn')
    // 로그인
    API.post<any>(
      "auth/login", 
      {'email': id, 'password': pw}, 
    ).then((res) => {
      console.log(res)
      const token = res.data.accessToken
      console.log(token)
      sessionStorage.setItem("token", token);
      // 내 정보 가져와서 store/user에 저장
      API.get<any>(
        "member/info", 
        { headers: { Authorization: `Bearer ${token}` } }
      ).then((res) => {
        console.log('유저정보 가져오기 성공')
        console.log(res.data)
        dispatch(userActions.setMyInfo(res.data))
      }).catch((err) => {
        console.log(err)
      })
      navigate('/home')
    }).catch((err) => {
      console.log(err)
    })
  };

  const { Kakao } = window;

  const onKakao = () => {
    console.log('onKakao')
    console.log(Kakao)
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_HERE + 'oauth',
      scope: "account_email"
    })
  };

  const toSignup = () => {
    navigate('/join')
  };

  const toHome = () => {
    navigate('/home')
  };

  return (
    <div className='auth-bg'>
      <div className="login-box">
        <form action="submit" className="login-form" onSubmit={submitHandler}>
          <label htmlFor="">ID</label>
          <br />
          <input 
            type="email" 
            onChange={idChangeHandler}
          />
          <br />
          <label htmlFor="">PW</label>
          <br />
          <input 
            type="password" 
            onChange={pwChangeHandler}
          />
          <br />
          <button type="submit">Connect</button>
        </form>
        <br />
        <img src={kakao} alt="kakao" className="mouse-hover" onClick={onKakao}/>
        <p onClick={toSignup} className="mouse-hover">회원가입</p>
        <button onClick={toHome}>넘어가기</button>
      </div>
    </div>
  )
}

export default Login;
