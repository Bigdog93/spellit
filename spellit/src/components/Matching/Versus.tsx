import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState } from "@/store/";
import { matchingActions } from "@/store/matching";
import CoinFlipper from './CoinFlipper'

import './Versus.css'
import MatchFrame_blue from '../../assets/ui/match-frame-blue.png'
import MatchFrame_red from '../../assets/ui/match-frame-red.png'
import VS from '../../assets/ui/VS.png'

const Versus = () => {

  const dispatch = useDispatch();

  const [coin, setCoin] = useState(false);

  const coinHandler = () => {
    setCoin(true)
  }
  
  const endMatching = () => {
    dispatch(matchingActions.endMatching())
  };

  window.setTimeout(coinHandler, 3000)
  window.setTimeout(endMatching, 10000)

  const p1 = useSelector((state: RootState) => state.player.p1);
  const p2 = useSelector((state: RootState) => state.player.p2);
  
  return (
    <div>
      <div className="flex-container">
        <div className="player">
          {/* <img src={require(p1Img)} alt="1P-character"/> */}
          <img src={require(`../../assets/character/${p1?.gameCharacterEntity.englishName}_win.png`)} alt="1P-character"/>
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
          {/* <img src={require(p2Img)} alt="2P-character"/> */}
          <img src={require(`../../assets/character/${p2?.gameCharacterEntity.englishName}_win.png`)} alt="2P-character"/>
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