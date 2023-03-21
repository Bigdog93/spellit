import { useState, useEffect } from 'react';
import Coin from './Coin';
import './CoinFlipper.css';

function CoinFlipper() {
  const [flips1, setFlips1] = useState<string>('');
  const [flips2, setFlips2] = useState<string>('');
  const [isRolling, setIsRolling] = useState(true);

  const handleClick = (): void => {
    const side = Math.random() < 0.5 ? 'head' : 'tail';

    const order = (o: string) => {
      if ( o == 'head') {
        setFlips1('head')
        setFlips2('tail')
      } else {
        setFlips1('tail')
        setFlips2('head')
      }
    }
    order(side);
    // const newFlips = side;
    setFlips1(side);
    // setFlips2()
    setIsRolling(true);
    setTimeout(() => setIsRolling(false), 5000);
  };

  useEffect(() => {
    handleClick();
  }, []);


  return (
    <div className="CoinFlipper">
      {flips1}
      <Coin side={flips1} isRolling={isRolling} />
      <button disabled={isRolling} onClick={handleClick}>
        {isRolling ? 'Rolling...' : 'Flip me!'}
      </button>
      <Coin side={flips2} isRolling={isRolling} />
    </div>
  );
}

export default CoinFlipper;