import { useState, ChangeEvent, FormEvent } from "react"

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

  const register = () => {}

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('login btn')
    
    // const expenseData = {
    //   title: enteredTitle,
    //   amount: enteredAmount,
    //   date: new Date(enteredDate),
    // };

    setId('');
    setPw('');
  };

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
    </div>
  )
}
export default Login
