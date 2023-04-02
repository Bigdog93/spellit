import React,{ useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import Ready from './Ready'
import Attack from './Attack';
import Defense from './Defense';
import Settle from './Settle/Settle';

import Result from './';
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'
// import Settle from './Settle/index';


const Game = () => {
  const readyTurn = useSelector((state: RootState) => state.game.readyTurn)
  const attackTurn = useSelector((state: RootState) => state.game.attackTurn)
  const defenseTurn = useSelector((state: RootState) => state.game.defenseTurn)
  const settleTurn = useSelector((state: RootState) => state.game.settleTurn)
  const resultTurn = useSelector((state: RootState) => state.game.resultTurn)
  
  useEffect(() => {
    console.log('resultTurn 값 변함!!')
  }, [resultTurn])
  useEffect(() => {
    console.log('settleTurn 값 변함!!')
  }, [settleTurn])
  useEffect(() => {
    console.log('defenseTurn 값 변함!!')
  }, [defenseTurn])
  useEffect(() => {
    console.log('attackTurn 값 변함!!')
  }, [attackTurn])
  useEffect(() => {
    console.log('readyTurn 값 변함!!')
  }, [readyTurn])


  console.log('readyTurn: ', readyTurn)
  console.log('attackTurn: ', attackTurn)
  console.log('defenseTurn: ', defenseTurn)
  console.log('settleTurn: ', settleTurn)
  console.log('resultTurn: ', resultTurn)

  return (
    <div>
      <OpenViduVideo />
      {readyTurn && <Ready />}
      {attackTurn && <Attack />}
      {defenseTurn && <Defense />}
      {/* {resultTurn && <Settle />}
      {settleTurn && <Result />} */}
      {settleTurn && <Settle />}
      {resultTurn && <Result />}
    </div>
  )
}
export default React.memo(Game);