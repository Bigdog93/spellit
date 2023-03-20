import { useState } from "react"

import Coin from './Coin'
// import soundEffect from '../../utils/SoundEffect';

import MatchFrame_blue from '../../assets/ui/MatchFrame_blue.png'
import MatchFrame_red from '../../assets/ui/MatchFrame_red.png'
import VS from '../../assets/ui/VS.png'
import Agnes from '../../assets/character/Agnes_temp.png'
import Emilia from '../../assets/character/Emilia_temp.png'
// import mp3 from '../../assets/bgm/RecalloftheShadows.mp3'

const Matching = () => {
  
  // const se = soundEffect(mp3, 2);

  // se.play();

  const [coin, setCoin] = useState(false);

  const [nickname, setNickname] = useState('인의동 대마법사');
  const [winCount, setwinCount] = useState(234);
  const [message, setMessage] = useState('11연뽑해서 뭐/뭐/뭐/뭐 득했는데 우각하기 귀찮다');

  return (
    <div>
      <p>This is Matching index.tsx</p>
      <div className="flex-container">

        {/* 1P */}
        <div className="player">
          <img src={Agnes} alt="1P-character" className="character"/>
          <div className="player-info">
            <img src={MatchFrame_blue} alt="1P" />
            <div>
              <div>
                { winCount }승
                { nickname }
              </div>
              { message }
            </div>
          </div>
        </div>

        {/* VS */}
        <div>
          <img src={VS} alt="vs"/>
        </div>

        {/* 2P */}
        <div className="player">
          <img src={Emilia} alt="2P" />
          <div className="player2">
            <img src={MatchFrame_red} alt="2P" />
            <div>
              <div>
                { nickname }
                { winCount }승
              </div>
              { message }
            </div>
          </div>
        </div>
      </div>
      {coin && <Coin />}
    </div>
  )
  }
  export default Matching