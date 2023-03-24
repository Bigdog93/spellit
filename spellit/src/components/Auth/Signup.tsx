import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import API from "@/utils/API"

import './Login.css'
import kakao from '../../assets/ui/kakao_login_medium_narrow.png'


const Signup = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  // 7자 제한
  const [nickname, setNickname] = useState('')
  // 100자 제한
  const [startSpell, setStartSpell] = useState('')





  const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    // console.log(email)
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
  const signupHandler = () => {
    // const body : SignupInfo = {'email': email, 'password': password1, 'nickname': nickname, 'startSpell': startSpell}
    const response = API.post<any>(
      "auth/join", 
      {'email': email, 'password': password1, 'nickname': nickname, 'startSpell': startSpell}, 
    ).then((response) => {
      console.log(response)
      console.log(response.data)

    }

    );
    return response;
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('signup btn')
    const signup = signupHandler
    console.log(signup)
    // if(login) {
    //   console.log('hello')
    // }
    // const expenseData = {
    //   title: enteredTitle,
    //   amount: enteredAmount,
    //   date: new Date(enteredDate),
    // };

  };
  
  const toLogin = () => {
   navigate('/login')
  }

  return (
    <div className='auth-bg'>
      <div className="login-box">
        <form action="submit" className="login-form" onSubmit={submitHandler}>
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
