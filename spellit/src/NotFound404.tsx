import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import { RootState } from '@/store';

import './NotFound404.css'

const NotFound404 = () => {

  const navigate = useNavigate();

  const [chrarcter, setCharacter] = useState('CB')
  const [num, setNum] = useState(Math.random())

  // const num = Math.random()
  useEffect(() => {
    console.log(num)
    if(num <= 0.33) {
      setCharacter('CB')
    } else if (num <= 0.66) {
      setCharacter('AK')
    } else {
      setCharacter('LUNA')
    }
    return () => {}
  }, [num])

  const isLogged = useSelector((state: RootState) => (state.auth.isAuthenticated))

  const onHome = () => {
    if (isLogged) {
      navigate('/home')
    } else {
      navigate('/')
    }
  }

  const onSignup = () => {
    navigate('/signup')
  }

  return (
    <div className='not-found-bg'>
      <div className='not-found-bubble'>
        <div className='not-found-bubble-large'>404 NOT FOUND</div>
        <br />
        <div className='not-found-bubble-medium'>여긴 이세계가 아니에요, 마스터!</div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <span className='not-found-bubble-small' onClick={onHome}>홈 </span> |
        <span className='not-found-bubble-small' onClick={onHome}> 로그인</span> |
        <span className='not-found-bubble-small' onClick={onSignup}> 회원가입</span>
      </div>
      <div className='not-found-character'>
        <img src={require(`../src/assets/character/${chrarcter}_lose.png`)} alt="bubble"/>
      </div>
    </div>
  )
}
export default NotFound404;