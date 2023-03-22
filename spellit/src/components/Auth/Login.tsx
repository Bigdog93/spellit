import { useState, ChangeEvent, FormEvent } from "react"


import API from "@/utils/API"
import './Login.css'
import kakao from '../../assets/ui/kakao_login_medium_narrow.png'
import Signup from "./Signup"

interface LoginInfo {
  'email': string;
  'password': string;
}

const Login = () => {

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const idChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }
    
  const pwChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  }

  // const register = async (user: UserRegistrationModel) => {
  //   const { data } = await http.post<UserRegistrationModel, AxiosResponse<{ accessToken: string }>>("/users", user);
  //   return data;
  // };

  const loginHandler = () => {
    const body : LoginInfo = {'email': id, 'password': pw}
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
    console.log('login btn')
    const login = loginHandler
    console.log(login)
    // if(login) {
    //   console.log('hello')
    // }
    // const expenseData = {
    //   title: enteredTitle,
    //   amount: enteredAmount,
    //   date: new Date(enteredDate),
    // };

    // setId('');
    // setPw('');
  };

  return (
    <div className='bg'>
      <div className="login-box">
        <form action="submit" className="login-form" onSubmit={submitHandler}>
          <label htmlFor="">ID</label>
          <br />
          <input 
            type="text" 
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
        <img src={kakao} alt="kakao" />
        <p>회원가입</p>
      </div>
      <Signup/>
    </div>
  )
}
export default Login
