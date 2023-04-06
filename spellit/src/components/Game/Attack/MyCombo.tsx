import { useEffect, useState, useContext, useRef } from 'react'
import { IMediaRecorder, MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';
import { useDispatch, useSelector } from "react-redux";

import { RootState } from '@/store'
import { AttackType, CardType } from '@/utils/Types'
import { WebSocketContext } from '@/store/websocket'

import './Spell.css'
import Timer from "@/components/Game/Items/Timer";
import ProfileHp from "../Items/ProfileHp";
import { settleActions } from '@/store/settle';
import game, { gameActions } from '@/store/game';

const MyCombo = ({attack}: {attack: AttackType}) => {
    const dispatch = useDispatch();
    const { send } = useContext(WebSocketContext);

    const roomId = useSelector((state: RootState) => state.room.roomId)
    const memberId = useSelector((state: RootState) => state.user.id)
    const attacks = useSelector((state: RootState) => (state.game.attacks));
    const p1Combo = useSelector((state: RootState) => (state.settle.p1Combo))
    const idx = useSelector((state: RootState) => (state.game.idx));

    // let isRecording = false;
    const [isRecording, setIsRecording] = useState<Boolean>(false);
    const savedIsRecording = useRef<Boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<IMediaRecorder>(MediaRecorder.prototype);
    const savedMediaRecorder = useRef<IMediaRecorder>(MediaRecorder.prototype);
    const [chunks, setChunks] = useState<Array<Blob>>([]);
    const [audioUrl, setAudioUrl] = useState<string>('');
    
    console.log('MYCOMBO', isRecording)

    async function recording(val: boolean) {
      console.log("recording 호출");
      console.log(isRecording);
      // 엘리먼트 취득
      // const $audioEl = document.querySelector("audio");
      // const $btn = document.querySelector("button");

      // 녹음중 상태 변수
      // await register(await connect());

      // MediaRecorder 변수 생성

      // 녹음 데이터 저장 배열
      const audioArray: Blob[] = [];
      
      // if (!savedIsRecording.current) {
      if (!val) {
          console.log("if 안");

          // 마이크 mediaStream 생성: Promise를 반환하므로 async/await 사용
          const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const mediaRecorder = new MediaRecorder(mediaStream);
          
          console.log("mediaStream: " , mediaStream);

          // MediaRecorder 생성
          const option = {
              audioBitsPerSecond: 44100,
              mimeType: "audio/wav",
          }
          // let tmpMediaRecorder = new MediaRecorder(mediaStream, option);
          setMediaRecorder(mediaRecorder);
          savedMediaRecorder.current = mediaRecorder

          // 이벤트핸들러: 녹음 데이터 취득 처리
          savedMediaRecorder.current.ondataavailable = (event)=>{
          // mediaRecorder.ondataavailable = (event)=>{
              audioArray.push(event.data); // 오디오 데이터가 취득될 때마다 배열에 담아둔다.
              console.log(event.data);
              console.log(audioArray);
              setChunks(audioArray);
          }

          // 이벤트핸들러: 녹음 종료 처리 & 재생하기
          savedMediaRecorder.current.onstop = (event)=>{
          // mediaRecorder.onstop = (event)=>{
              setChunks(audioArray);
              // 녹음이 종료되면, 배열에 담긴 오디오 데이터(Blob)들을 합친다: 코덱도 설정해준다.
              const blob = new Blob(audioArray, { type : 'audio/wav' });
              sendAudio(blob)
              // audioUrl = URL.createObjectURL(blob);
              setAudioUrl(URL.createObjectURL(blob));
              audioArray.splice(0); // 기존 오디오 데이터들은 모두 비워 초기화한다.
              setChunks(audioArray);
              // Blob 데이터에 접근할 수 있는 주소를 생성한다.

              // audio엘리먼트로 재생한다.
              // $audioEl.src = blobURL;
              //$audioEl.play();

          }

          // 녹음 시작
          mediaRecorder.start();
          setIsRecording(true);
          savedIsRecording.current = true;


      }else{
          // 녹음 종료
          console.log(mediaRecorder);
          // mediaRecorder?.stop();
          savedMediaRecorder.current!.stop()
          setIsRecording(false);
          savedIsRecording.current = false;

      }
    };

    const sendAudio = (blob :Blob) => {
        if(blob == null) return;

        let filename = "audio.wav";

        const file = new File([blob], filename, { lastModified: new Date().getTime(), type: "audio/wav" });
        console.log(file)
        let fd = new FormData();
        fd.append("blob", file, "audio.wav");
        
        

        fetch("https://j8d201.p.ssafy.io:5001/voicetest", {
            method: "POST",
            headers : {},
            body : fd
        }).then(res => res.json()).then(result => {
            /* angry, happy, sad, neutral */
            console.log('***************음성분석 결과 왔따*************')
            console.log(result.emotion);
            console.log(result.value);
            // alert(result.emotion)
            if(result.emotion === 'angry'){
              dispatch(settleActions.setP1Combo(result.value))
            };
            send({
              event: 'comboEnd',
              roomId: roomId,
              memberId: memberId,
              data: ''
            });
          dispatch(gameActions.endCombo());
          console.log("idx와 attacks.length : ", idx, attacks.length);
          if (idx + 1 >= attacks.length) {
            console.log("defenseTurn send***********************");
              // send({
              //   event: 'defenseTurn',
              //   roomId: roomId,
              //   memberId: memberId,
              //   data: {combo: p1Combo}
              // })
              dispatch(gameActions.setIdx());
          } else {
            console.log("mycombo에서 setIdx***********************");
              dispatch(gameActions.setIdx());
            }
        })
    }




    // 화면 띄우는 용
    const p1Character = useSelector((state: RootState) => state.player.p1!.gameCharacterEntity.englishName);
    const p2Character = useSelector((state: RootState) => state.player.p2!.gameCharacterEntity.englishName);
    const defaultHP = useSelector((state: RootState) => (state.attack.defaultHp));
    const p1Hp = useSelector((state: RootState) => (state.player.p1!.hp));
    const p2Hp = useSelector((state: RootState) => (state.player.p2!.hp));
    const p1Level = useSelector((state: RootState) => (state.player.p1!.level));
    const p2Level = useSelector((state: RootState) => (state.player.p2!.level));
    const attackCardList = useSelector((state: RootState) => state.game.attacks);

    const p1HpStyle = {
      width: `${p1Hp/defaultHP*385}px`,
      backgroundColor: p1Hp > 100 ? '#FFF500' : '#FF0000' ,
    }
    const p2HpStyle = {
        width: `${p2Hp/defaultHP*385}px`,
        backgroundColor: p2Hp > 100 ? '#FFF500' : '#FF0000' ,
    }


    // 타이머
    const [sec, setSec] = useState<number>(5);
    

    const handleClick = () => {
      recording(false)

      const interval = setInterval(() => {
        setSec(sec => sec-1);
        // sec.current -= 1;
        console.log('============')
        console.log('sec : ', sec)
        setIsRecording(true);
        console.log(isRecording)
        console.log('============')
      }, 1000)

      setTimeout(() => {
        clearInterval(interval);
        console.log('setTimeout ', isRecording)
        recording(true)
        // setIsRecording(false);
      }, 5000)
      // return () => {}
    }
    useEffect(()=> {
      handleClick()
      // return () => {}
    },[])
    

    return (
      <div className="attack-bg">
        <div className="attack-top-items">
          <div className="first-hp-box">
            <ProfileHp character={p1Character} level={p1Level}></ProfileHp>
            <div className="first-hp-bar" style={p1HpStyle}></div>
          </div>
          <Timer time={sec}></Timer>
          <div className="second-hp-box">
            <ProfileHp character={p2Character} level={p2Level}></ProfileHp>
            <div className="second-hp-bar" style={p2HpStyle}></div>
          </div>
        </div>

        <div className="attack-bottom-itmes">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "inline-flex" }}>
              {attackCardList.map(
                (card: AttackType, idx: number) =>
                  card.isMine && (
                    <img
                      style={{ width: "150px", height: "150px" }}
                      className={`effectImgTag-${idx} hiddenEffect`}
                      key={idx}
                      src={require(`../../../assets/effect/${card.card.code}.png`)}
                      alt=""
                    />
                  )
              )}
            </div>
            {attack.isMine && (
              <img
                className="myCharacter"
                style={{ width: "400px" }}
                src={require(`../../../assets/character/${p1Character}_attack.png`)}
                alt=""
              />
            )}
          </div>
          <div className="SpellandBar">
            <div className="SpellBox">
              <img
                style={{ width: 800, height: 400 }}
                src={require(`../../../assets/InGame/SpellBox.png`)}
                alt=""
              />
              <div id="origin">
                <div>
                  <div>COMBO!!</div>
                  <div>퍼펙트를 달성하셨습니다.</div>
                </div>
              </div>
            </div>
            <div className="spell-bar-box">
              <img
                src={require(`../../../assets/InGame/SkillBar.png`)}
                alt=""
                style={{ width: "100%", height: "140px" }}
              />
              <div className="cardList">
                {attackCardList.map(
                  (card: AttackType, idx: number) =>
                    card.isMine && (
                      <img
                        style={{ width: "100px", margin: "10px" }}
                        key={idx}
                        src={require(`../../../assets/card/icon/${card.card.code}.png`)}
                        alt=""
                      />
                    )
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "inline-flex" }}>
              {attackCardList.map(
                (card: AttackType, idx: number) =>
                  !card.isMine && (
                    <img
                      style={{ width: "150px", height: "150px" }}
                      className={`effectImgTag-${idx} hiddenEffect`}
                      key={idx}
                      src={require(`../../../assets/effect/${card.card.code}.png`)}
                      alt=""
                    />
                  )
              )}
            </div>
            {!attack.isMine && (
              <img
                className="yourCharacter"
                style={{ width: "400px" }}
                src={require(`../../../assets/character/${p2Character}_attack.png`)}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    );
}

export default MyCombo;