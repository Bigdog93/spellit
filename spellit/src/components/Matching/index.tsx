import { useState, useEffect } from "react"

import Coin from './CoinFlipper'
// import soundEffect from '../../utils/SoundEffect';

import './index.css'
import MatchFrame_blue from '../../assets/ui/match-frame-blue.png'
import MatchFrame_red from '../../assets/ui/match-frame-red.png'
import VS from '../../assets/ui/VS.png'
import Agnes from '../../assets/character/Agnes_temp.png'
import Emilia from '../../assets/character/Emilia_temp.png'
// import mp3 from '../../assets/bgm/RecalloftheShadows.mp3'

const Matching = () => {
  
  // const se = soundEffect(mp3, 2);

  // se.play();

  const [coin, setCoin] = useState(false);

  const coinHandler = () => {
    setCoin(true)
  }
  
  window.setTimeout(coinHandler, 3000)

  const [nickname, setNickname] = useState('인의동 대마법사');
  const [winCount, setwinCount] = useState(234);
  const [message, setMessage] = useState('11연뽑해서 뭐/뭐/뭐/뭐 득했는데 우각하기 귀찮다');

  return (
    <div>
      <div className="flex-container">
        <div className="player">
          <img src={Agnes} alt="1P-character"/>
          <div className="player-info">
            <img src={MatchFrame_red} alt="1P"/>
            <div className="player1">
              <div className="upper-info">
                <div>
                  { winCount }승
                </div>
                <div>
                  { nickname }
                </div>
              </div>
              { message }
            </div>
          </div>
        </div>

        <img src={VS} alt="vs" className="vs"/>

        <div className="player">
          <img src={Emilia} alt="2P-character"/>
          <div className="player-info">
            <img src={MatchFrame_blue} alt="2P"/>
            <div className="player2">
              <div className="upper-info">
                <div>
                  { nickname }
                </div>
                <div>
                  { winCount }승
                </div>
              </div>
              { message }
            </div>
          </div>
        </div>
      </div>
      <div className="coin-flipper">
        {coin && <Coin />}
      </div>
    </div>
  )
  }
  export default Matching