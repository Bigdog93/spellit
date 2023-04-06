import './Result.css';
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import API from '@/utils/API';
import { WebSocketContext } from '@/store/websocket';
import { useContext, useEffect, useState } from "react";
import user, { userActions, userInitialType } from "@/store/user";

import homeBtn from "../../../assets/result/homeBtn.png"
import quickmatchBtn from "../../../assets/result/QuickStartBtn.png";
import blueframe from "../../../assets/result/blueframe.png";
import turnsImg from "../../../assets/result/turnsImg.png";
import friendaddBtn from "../../../assets/result/friendaddBtn.png";
import { playerActions } from "@/store/player";
import { gameActions } from "@/store/game";
import { Sound } from '@/store/music';

const Result = () => {
  const navigate = useNavigate();
  const { send } = useContext(WebSocketContext);
  const dispatch = useDispatch();
  
  const token = sessionStorage.getItem("token");
  const result = useSelector((state: RootState) => (state.game.result));
  const p1Character = useSelector((state: RootState) => state.player.p1!.gameCharacterEntity.englishName);
  const p2Character = useSelector((state: RootState) => state.player.p2!.gameCharacterEntity.englishName);
  const p1Info = useSelector((state: RootState) => state.player.p1);
  const p2Info = useSelector((state: RootState) => state.player.p2);
  const p1User = useSelector((state: RootState) => (state.user));
  const turnCount = useSelector((state: RootState) => (state.settle.turnCount));

  const [exp, SetExp] = useState(0);
  let updateExp = (exp / 1000) * 527;
  console.log(exp)
  console.log('updateExp : ', updateExp)

  const [level, SetLevel] = useState(0);

  let winCount = p2Info!.winCount;
  let loseCount = p2Info!.loseCount;
  let drawCount = p2Info!.drawCount;
  let playCount = p2Info!.playCount+1;
  let getExp = 0;

  let imgsrc = '';
  if (result === 'draw') {
    imgsrc = 'default';
    getExp = 500;
    drawCount++;
  } else {
    imgsrc = result;
    if (result === 'win') {
      getExp = 700;
      winCount++;
    } else {
      getExp = 300;
      loseCount++;
    }
  }
  

  const moveHome = () => {
    navigate('/home');
    dispatch(gameActions.endResult());
  }

  const moveQuickmatch = () => {
    navigate('/matching');
    dispatch(gameActions.endResult());
  }

  // 전적 기록
  const playRecord = (result: string) => {
    API.put('member/record', {
        playResult: result
    }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
        console.log(res);
        // alert('전적 기록함');
        SetExp(res.data.exp);
        SetLevel(res.data.level);
        
    }).catch(err => {
        console.log(err);
    })
  }

  // Sound Effect 
  const { winSound, winSoundOpt } = Sound();
  const { drawSound, drawSoundOpt } = Sound();
  const { loseSound, loseSoundOpt } = Sound();

  useEffect(() => {
    playRecord(result)
    if (result === 'win') {
      winSound();
    } else if (result === 'draw') {
      drawSound();
    } else {
      loseSound();
    }

  }, [p1User, p2Info])

  // useEffect(() => {
  //   // dispatch(playerActions.setP1({p1}))
  // })


  const addFriendRequest = () => {
		API.post('member/friend/ask', {
			friendEmail: '',
			friendId: p2Info?.memberId,
		},
			{ headers: { Authorization: `Bearer ${token}` } })
			.then(({ data }) => {
				console.log(data);
				send({
					event: 'friendRequest',
					memberId: p1Info?.memberId,
					roomId: 0,
					nickname: p1Info?.nickname,
					data: {
						otherId: data
					}
				})
				alert("친구 요청을 보냈습니다.");
			})
      .catch(() => {
        console.log('이미 친구 입니다');
      })
	}
  
  return (
    <div className="result-bg">
      <div className="resultBox">
        <div className="playerCharcter">
          <img style={{width: '650px', height: '800px'}} src={require(`../../../assets/character/${p1Character}_${imgsrc}.png`)} alt="" />
        </div>
        <div className="blueframeBox">
          <div className="p1Exp">
            {/* <div>Lv. {p1User.level}</div> */}
            <h2>Lv. {level}</h2>
            <h2>+{getExp}</h2>
          </div>
          <div className="expBar"></div>
          <div className="expGage" style={{width: `${updateExp}px`}}></div>
          <img className="blueframe" src={blueframe} alt="" />
          <img className="result" src={require(`../../../assets/result/${result}Img.png`)} alt="" />
          <div className="turns">
            <img src={turnsImg} alt="" />
            <h2>{turnCount}</h2>
          </div>
          <div className="p2Box">
            <img className="portraitImg" src={require(`../../../assets/character/${p2Character}_portrait.png`)} alt="" />
            <div className="levelCircle"><p>Lv. {p2Info?.level}</p></div>
            <div className="p2Items">
              <div>
                {/* <h2>Lv. {p2Info.level}</h2> */}
                <h1>{p2Info?.nickname}</h1>
                <button onClick={addFriendRequest}>
                  <img className="addFriendBtn" src={friendaddBtn} alt="" />
                </button>
                <div className="p2Info">
                  <h2>{playCount} 판 {winCount} 승 {drawCount} 무 {loseCount} 패</h2>
                </div>
              </div>
          </div>
          </div>
          <button className="quickmatchBtn" onClick={moveQuickmatch}>
            <img style={{width: '200px'}} src={quickmatchBtn} alt="" />
          </button>
          <button className="homeBtn" onClick={moveHome}>
            <img style={{width: '200px'}} src={homeBtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default Result
