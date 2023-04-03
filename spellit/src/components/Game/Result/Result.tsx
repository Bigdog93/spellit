import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import Draw from "./Draw";
import Lose from "./Lose";
import Win from "./Win";
import './Result.css';
import { useNavigate } from "react-router-dom";
import API from '@/utils/API';
import { WebSocketContext } from '@/store/websocket';
import { useContext } from "react";

import homeBtn from "../../../assets/result/homeBtn.png"
import quickmatchBtn from "../../../assets/result/quickmatchBtn.png";
import blueframe from "../../../assets/result/blueframe.png";
import turnsImg from "../../../assets/result/turnsImg.png";
import friendaddBtn from "../../../assets/result/friendaddBtn.png";
import { userActions } from "@/store/user";


const Result = () => {
  const navigate = useNavigate();
  const { send } = useContext(WebSocketContext);
  const dispatch = useDispatch();

  const result = useSelector((state: RootState) => (state.game.result));
  const p1Character = useSelector((state: RootState) => state.player.p1!.gameCharacterEntity.englishName);
  const p2Character = useSelector((state: RootState) => state.player.p2!.gameCharacterEntity.englishName);
  const p1Info = useSelector((state: RootState) => state.player.p1);
  const p2Info = useSelector((state: RootState) => state.player.p2);

  const token = sessionStorage.getItem('token');

  const p1User = useSelector((state: RootState) => (state.user));
  const winCount = p1User.winCount;
  const loseCount = p1User.loseCount;
  const drawCount = p1User.drawCount;

  // dispatch(userActions.setMyInfo())

  // console.log('=============================')
  // console.log('result 페이지!!! ')
  // console.log(result);
  let imgsrc = '';
  if (result === 'draw') {
    imgsrc = 'default';
  } else {
    imgsrc = result;
  }

  const moveHome = () => {
    navigate('/home');
  }

  const moveQuickmatch = () => {
    navigate('/match');
  }

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
          <img className="blueframe" src={blueframe} alt="" />
          <img className="result" src={require(`../../../assets/result/${result}Img.png`)} alt="" />
          <img className="turns" src={turnsImg} alt="" />
          <div className="p2Box">
            <img className="portraitImg" src={require(`../../../assets/character/${p2Character}_portrait.png`)} alt="" />
            <div className="p2Items">
              <div>
                <h2>Lv 3</h2>
                <h1>{p2Info?.nickname}</h1>
                <button onClick={addFriendRequest}>
                  <img className="addFriendBtn" src={friendaddBtn} alt="" />
                </button>
              </div>
              <div className="p2Info">
                <h2>전적 : {p2Info?.playCount} 판 {p2Info?.winCount} 승</h2>
              </div>
          </div>
          </div>
          <button className="quickmatchBtn" onClick={moveQuickmatch}>
            <img src={quickmatchBtn} alt="" />
          </button>
          <button className="homeBtn" onClick={moveHome}>
            <img src={homeBtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default Result
