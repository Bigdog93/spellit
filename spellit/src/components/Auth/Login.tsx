import { useState, ChangeEvent, FormEvent } from "react"
import API from "@/utils/API"
import { useNavigate } from "react-router-dom";

interface LoginInfo {
  'email': string;
  'password': string;
}

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const idChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
    
  const pwChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

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

    setId('');
    setPw('');
  };

  const toHome = () => {
    navigate('/home')
  }
  return (
    <div className='bg'>
      <form action="submit" onSubmit={submitHandler}>
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
      <button onClick={toHome}>넘어가기</button>
    </div>
  )
}
export default Login
