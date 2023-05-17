import React from 'react';
import './Coin.css';
import  CoinTail from './Coin-back.png';
import CoinHead from './Coin-front.png';

interface CoinProps {
  side: string;
  isRolling: boolean;
}

const Coin: React.FC<CoinProps> = ({side, isRolling}) => {
  return (
    <div>
      {/* 선공 */}
      { side === 'head' &&
        <div className="Coin-container">
          { isRolling && <div className={`Coin ${isRolling? 'Coin-animation' : ''}`}>
            <div className="Coin-front rotate-animation">
              <img src={CoinHead} alt='head'/>
            </div>
            <div className="Coin-back">
              <img src={CoinTail} alt='tail'/>
            </div>
          </div>}

          {!isRolling && <div className='Coin'>
            <div className="Coin-front">
              <img src={CoinHead} alt='head'/>
            </div>
          </div>}
        </div>
      }
      
      {/* 후공 */}
      { side === 'tail' &&
        <div className="Coin-container">
          { isRolling && <div className={`Coin ${isRolling? 'Coin-animation' : ''}`}>
            <div className="Coin-front">
              <img src={CoinHead} alt='head'/>
            </div>
            <div className="Coin-back rotate-animation">
              <img src={CoinTail} alt='tail'/>
            </div>
          </div>}

          {!isRolling && <div className='Coin'>
            <div className="Coin-back">
              <img src={CoinTail} alt='tail'/>
            </div>
          </div>}
        </div>
      }
    </div>
  )
}

export default Coin;