import { useState, ChangeEvent, FormEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userActions } from "@/store/user";
import { friendsActions } from "@/store/friends";
import { WebSocketContext } from "@/store/websocket";
import { MusicContext, Sound } from '@/store/music';
import API from "@/utils/API";
import "./Login.css";
import { UserEntityType } from "@/utils/Types";
import { authActions } from "@/store/auth";
import SoundToggleBtn from "@/components/Modules/SoundBtn"

import Logo from '../../assets/ui/logo.png'

const Login = () => {
  const { send } = useContext(WebSocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // Sound Effect
  const { login, loginOpt } = Sound();



  // 애니메이션용
  const [ani, setAni] = useState(false);

  const idChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const pwChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("login btn");
    // 로그인
    API.post<any>("auth/login", { email: id, password: pw })
      .then((res) => {
        setAni(true);
        console.log(res);
        const token = res.data.accessToken;
        console.log(token);
        sessionStorage.setItem("token", token);
        // 내 정보 가져와서 store/user에 저장
        API.get<any>("member/info", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            console.log("myInfo: ", res);
            send({
              event: "login",
              memberId: res.data.id,
              nickname: res.data.nickname,
              data: "",
            });
            console.log("유저정보 가져오기 성공");
            console.log(res.data);
            dispatch(userActions.setMyInfo(res.data));
            API.get('member/friend/list', { headers: { Authorization: `Bearer ${token}` }, })
              .then((res) => {
                for (let f of res.data) {
                  const friend: UserEntityType = {
                    deck: [],
                    email: f.email,
                    exp: f.exp,
                    gameCharacterEntity: f.gameCharacterEntity,
                    id: f.id,
                    level: f.level,
                    nickname: f.nickname,
                    playCount: f.playCount,
                    winCount: f.winCount,
                    loseCount: f.loseCount,
                    drawCount: f.drawCount,
                    profileMsg: f.profileMsh,
                    isOnline: f.isOnline,
                    isPlaying: f.isPlaying
                  }
                  dispatch(friendsActions.fillFriendsList(friend));
                }
              })
            API.get('member/friend/wait', { headers: { Authorization: `Bearer ${token}` }, })
              .then(({ data }) => {
                console.log("friend wait list : ", data);
                for (let f of data) {
                  const friendWait: UserEntityType = {
                    deck: [],
                    email: f.email,
                    exp: f.exp,
                    gameCharacterEntity: f.gameCharacterEntity,
                    id: f.id,
                    level: f.level,
                    nickname: f.nickname,
                    playCount: f.playCount,
                    winCount: f.winCount,
                    loseCount: f.loseCount,
                    drawCount: f.drawCount,
                    profileMsg: f.profileMsh,
                    isOnline: f.isOnline,
                    isPlaying: f.isPlaying
                  }
                  dispatch(friendsActions.fillFriendWaitsList(friendWait));
                }
            })
          }).then(() => {
						setAni(!ani)
            setTimeout(() => {
              dispatch(authActions.login());
              navigate("/home");
            }, 700);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        alert("아이디와 비밀번호를 확인해주세요");
        console.log(err);
      });
  };

  const toSignup = () => {
    navigate("/signup");
  };

  const toHome = () => {
    navigate("/home");
  };

  const { setMusic } = useContext(MusicContext);
  // 스크롤바 숨김
	useEffect(() => {
    setMusic("login");
    document.body.style.overflow = "hidden"
  }, []);

  return (
    // <div className="bigcontainer">
    <div className="auth-bg">
      <div className={ani ? "holedown" : ""}></div>
      <div className="login-box">
        <img src={Logo} alt="logo" className="loginLogo"/>
        <br />
        <form action="submit" className="login-form" onSubmit={submitHandler}>
          <div className="signupRow">
            <div>
              <label htmlFor="">ID</label>
            </div>
            <div>
              <input
                className="loginInput"
                type="email"
                onChange={idChangeHandler}
              />
            </div>
          </div>

          <div className="signupRow">
            <div>
              <label htmlFor="">PW</label>
            </div>
            <div>
              <input
                className="loginInput"
                type="password"
                onChange={pwChangeHandler}
              />
            </div>
          </div>
          <div className="signupRow">
            <button type="submit" className="signupBtn" onClick={() => login()}>
              LOGIN
            </button>
          </div>
        </form>
        {/* <img src={kakao} alt="kakao" className="mouse-hover" onClick={onKakao}/> */}
        <button onClick={toSignup} className="signupBtn">
          SIGN UP
        </button>
      </div>
      
      <SoundToggleBtn></SoundToggleBtn>
    </div>
    // </div>
  );
};

export default Login;
