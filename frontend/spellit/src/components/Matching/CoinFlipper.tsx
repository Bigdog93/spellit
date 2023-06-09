import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Coin from './Coin';
import './CoinFlipper.css';
import { matchingActions } from '@/store/matching';
import { WebSocketContext } from '@/store/websocket'
import { RootState } from '@/store';
import { Sound } from '@/store/music';

interface coinType {
  coin: 0 | 1 | undefined
}

function CoinFlipper(coin: coinType) {
  const dispatch = useDispatch();
  const { send } = useContext(WebSocketContext);

  const [flips, setFlips] = useState<string>('');
  const [isRolling, setIsRolling] = useState(true);

  // 코인 앞뒤로 할당
  const order = () => {
    console.log(coin)
    console.log(typeof(coin))
    
    if (!(coin.coin)) {
      setFlips('head')
    } else {
      setFlips('tail')
    }
  }

  const memberId = useSelector((state: RootState) => state.user.id);
  const roomId = useSelector((state: RootState) => state.room.roomId);

  // 동전 던지기 끝났을 때 store 업뎃
  // ready로 넘어갈 준비
  const rollingEnd = () => {
    console.log('endLoading in CoinFlipper')
    // dispatch(matchingActions.p1Loading())
    send({
      event: 'readyTurn',
      data: '',
      memberId: memberId,
      roomId: roomId,
    })
    console.log('sent readyTurn')
  }


  // Sound Effect 
  const { coinFlip, coinFlipOpt } = Sound();
  const { versus, versusOpt } = Sound();


  const rollingHandler = (): void => {
    order();
    coinFlip();


    // 3초 후 동전 던지기 끝냄
    setTimeout(() => {
      console.log('동전 던지기 타이머 on')
      setIsRolling(false) 
      coinFlipOpt.stop()
      versusOpt.stop()
      rollingEnd()}
      , 3000
    );
  };


  
  useEffect(() => {
    rollingHandler();
  }, []);

  

  return (
    <div className="CoinFlipper">
      <Coin side={flips} isRolling={isRolling}/>
    </div>
  );
}

export default CoinFlipper;