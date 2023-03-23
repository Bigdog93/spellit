import { useState, useEffect } from 'react';
import Coin from './Coin';
import './CoinFlipper.css';

function CoinFlipper(coin: any) {
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
  };

  useEffect(() => {
    handleClick();
  }, []);


  return (
    <div className="CoinFlipper">
      <Coin side={flips} isRolling={isRolling}/>
    </div>
  );
}

export default CoinFlipper;