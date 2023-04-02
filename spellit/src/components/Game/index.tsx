import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import Ready from './Ready'
import Attack from './Attack';
import Defense from './Defense';
// import Settle from './Settle';
import Settle from './Settle/Settle';
import Result from '@/components/Game/Result';
import OpenViduVideo from '@/components/Game/OpenVidu/OpenVidu'


const Game = () => {
  const game = useSelector((state: RootState) => state.game.game)
  const readyTurn = useSelector((state: RootState) => state.game.readyTurn)
  const attackTurn = useSelector((state: RootState) => state.game.attackTurn)
  const defenseTurn = useSelector((state: RootState) => state.game.defenseTurn)
  const settleTurn = useSelector((state: RootState) => state.game.settleTurn)
  const resultTurn = useSelector((state: RootState) => state.game.resultTurn)
  

  console.log('game: ', game)
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
export default Game;