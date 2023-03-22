import { useState, FormEvent, ChangeEvent } from 'react'

import API from "@/utils/API"

import './Login.css'
import kakao from '../../assets/ui/kakao_login_medium_narrow.png'

interface SignupInfo {
  email: string;
  password: string;
  nickname: string;
  startSpell: string;
}

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [nickname, setNickname] = useState('')
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
    const body : SignupInfo = {'email': email, 'password': password1, 'nickname': nickname, 'startSpell': startSpell}
    const response = API.post<any>(
      "member/login", 
      body, 
      // {headers: {
      //   Authorization: sessionStorage.getItem('token')
      // }}
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




  return (
    <div className='bg'>
      <div className="login-box">
        <form action="submit" className="login-form" onSubmit={submitHandler}>
          <div>
            <label htmlFor="">EMAIL</label>
            <br />
            <input 
              type="text" 
              onChange={emailChangeHandler}
            />
            <button></button>
          </div>
          <br />
          <label htmlFor="">PASSWORD</label>
          <br />
          <input 
            type="password" 
            onChange={password1ChangeHandler}
          />
          <br />
          <label htmlFor="">PASSWORD check</label>
          <br />
          <input 
            type="password" 
            onChange={password2ChangeHandler}
          />
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
        <img src={kakao} alt="kakao" />
        <p>회원가입</p>
      </div>
    </div>
  )
}
export default Signup
