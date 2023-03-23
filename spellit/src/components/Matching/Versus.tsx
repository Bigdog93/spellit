import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "@/store/";

import CoinFlipper from './CoinFlipper'

import './Versus.css'
import MatchFrame_blue from '../../assets/ui/match-frame-blue.png'
import MatchFrame_red from '../../assets/ui/match-frame-red.png'
import VS from '../../assets/ui/VS.png'
import Agnes from '../../assets/character/Agnes_temp.png'
import Emilia from '../../assets/character/Emilia_temp.png'

const Versus = () => {

  const [coin, setCoin] = useState(false);

  const coinHandler = () => {
    setCoin(true)
  }
  
  window.setTimeout(coinHandler, 3000)

  const p1 = useSelector((state: RootState) => state.player.p1);
  const p2 = useSelector((state: RootState) => state.player.p2);

  return (
    <div>
      <div className="flex-container">
        <div className="player">
          <img src={require(`../../../assets/card/character/${p1?.gameCharacter.englishName}.png`)} alt="1P-character"/>
          <div className="player-info">
            <img src={MatchFrame_red} alt="1P"/>
            <div className="player1">
              <div className="upper-info">
                <div>
                  { p1?.winCount }승
                </div>
                <div>
                  { p1?.nickname }
                </div>
              </div>
              { p1?.profileMsg }
            </div>
          </div>
        </div>

        <img src={VS} alt="vs" className="vs"/>

        <div className="player">
          <img src={require(`../../../assets/card/character/${p2?.gameCharacter.englishName}_default.png`)} alt="2P-character"/>
          <div className="player-info">
            <img src={MatchFrame_blue} alt="2P"/>
            <div className="player2">
              <div className="upper-info">
                <div>
                  { p1?.nickname }승
                </div>
                <div>
                  { p2?.winCount }
                </div>
              </div>
              { p2?.profileMsg }
            </div>
          </div>
        </div>
      </div>
      <div className="coin-flipper">
        {coin && <CoinFlipper coin={p1?.isFirst}/>}
      </div>
    </div>
  )
  }
  export default Versus;