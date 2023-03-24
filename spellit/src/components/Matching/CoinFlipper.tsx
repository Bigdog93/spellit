import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Coin from './Coin';
import './CoinFlipper.css';
import { matchingActions } from '@/store/matching';
import { WebSocketContext } from '@/store/websocket'
import { RootState } from '@/store';

function CoinFlipper(coin: any) {
  const dispatch = useDispatch();
  const { send } = useContext(WebSocketContext);

  const [flips, setFlips] = useState<string>('');
  const [isRolling, setIsRolling] = useState(true);

  const handleClick = (): void => {

    const order = () => {
      if (!coin) {
        setFlips('head')
      } else {
        setFlips('tail')
      }
    }
    order();

    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 5000);
    setTimeout(() => endLoading(), 6000);
  };

  const endLoading = () => {
    dispatch(matchingActions.end1PLoading())
  }
  useEffect(() => {
    handleClick();
  }, []);

  const p1Ready = useSelector((state: RootState) => state.matching.p1Loading);
  const p2Ready = useSelector((state: RootState) => state.matching.p2Loading);
  const memberId = useSelector((state: RootState) => state.user.id);
  
  useEffect(() => {
    if(p1Ready && p2Ready) {
      send({
        event: 'readyTurn',
        data: '',
        roomId: 1,
        memberId: memberId
      })
    }
  }, [p1Ready, p2Ready]);

  return (
    <div className="CoinFlipper">
      <Coin side={flips} isRolling={isRolling}/>
    </div>
  );
}

export default CoinFlipper;