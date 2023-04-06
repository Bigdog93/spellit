import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { gameActions } from "@/store/game";
import image1 from "@/assets/minigame/Image1.png";

interface onTimeProp {
  onTime: boolean;
  handleTimer: () => void;
  isDone: boolean;
  handleResult: () => void;
}

const Blow = ({ onTime, handleTimer, isDone, handleResult }: onTimeProp) => {
  const dispatch = useDispatch();

  const [count, setCount] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // console.log(count);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // 게임 결과를 store에 저장
  useEffect(() => {
    dispatch(gameActions.setMyDefense(isSuccess));
  }, [isSuccess]);

  const streamRef = useRef<MediaStream | null>(null);
  const handleMicInput = async (stream: MediaStream) => {
    // audioctx를 만들어 web audio api를 사용할 수 있도록 함
    const audioContext = new AudioContext();
    audioContext.resume();
    // 마이크 입력을 받아옴

    // ctx 메서드를 활용하여 source로 만듦
    const source = audioContext.createMediaStreamSource(stream);
    // analyser 생성
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 2048;
    // source에 analyser 연결
    source.connect(analyzer);

    // 주파수 배열
    const bufferLength = analyzer.frequencyBinCount;
    const data = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;

    // null인 경우 return
    if (!canvas) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // canvas ctx 생성
    const ctx = canvas.getContext("2d");
    // null인 경우 return
    if (!ctx) return;

    const draw = (level: number) => {
      // 맨처음에 전체 삭제
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "pink";
      ctx.fillRect(0, canvasHeight - level, canvasWidth, level);
    };

    // 실시간으로 음성 분석하여 막대 그래프를 그리고, 특정 레벨 초과시, cnt증가
    const drawFrame = () => {
      // 애니메이션 프레임을 그림(부드러운..)
      requestAnimationFrame(drawFrame);
      // 현재 음성의 주파수 데이터 가져오기
      analyzer.getByteFrequencyData(data);

      const sum = data.reduce((acc, cur) => acc + cur, 0);
      const level = sum / data.length;
      draw(level);

      // 특정 레벨 이상일 때, cnt 증가
      if (level > 60) {
        setCount((prevCount) => prevCount + 1);
      }
    };
    drawFrame();
  };

  useEffect(() => {
    // 마이크 권한 요청이 우선시(크롬 법칙에 따라 필수)
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        // stream을 받아왔을 때
        streamRef.current = stream;
        // onTime 값이 true일 때 handleMicInput 함수를 실행
        if (onTime) {
          handleMicInput(stream);
        }
      })
      .catch((error) => console.error(error));
  }, [onTime]);

  // 게임이 끝나면 마이크 입력 중단
  useEffect(() => {
    if (isDone) {
      streamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }, [isDone]);

  // 일정 count이상을 달성하면 게임 정지
  useEffect(() => {
    if (count >= 600) {
      // 게임 정지
      handleTimer();
      handleResult();
      // 성공 전달
      setIsSuccess(true);
    }
  }, [count, handleTimer, handleResult]);

  return (
    <div>
      <div className="attack-bottom-itmes">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            className="myCharacter"
            style={{ width: "400px" }}
            src={require(`@/assets/character/AK_attack.png`)}
            // src={require(`../../../assets/character/${p1Character}_attack.png`)}
            alt=""
          />
        </div>
        <div className="SpellandBar">
          <div className="SpellBox">
            <img
              style={{ width: 800, height: 400 }}
              src={require(`@/assets/InGame/SpellBox.png`)}
              alt=""
            />
            <div id="origin">
              <div className="canvas-box">
                {!onTime && !isDone ? (
                  // <div>대기시간 후 게임이 시작됩니다</div>
                  <></>
                ) : (
                  <>
                    <img className="spellimg" src={image1} alt="img" />
                    <canvas ref={canvasRef} width={5} height={10} />
                  </>
                )}
              </div>
              {isDone ? (
                isSuccess ? (
                  <div className="win-box">성공</div>
                ) : (
                  <div className="lose-box">실패</div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blow;
