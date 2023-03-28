import {useEffect, useState} from 'react'

type Props = {
    blob: Blob,
}

const VoiceRec = () => {

    // let isRecording = false;
    const [isRecording, setIsRecording] = useState<Boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(MediaRecorder.prototype);
    async function recording() {
        console.log("recording 호출");
        console.log(isRecording);
        // 엘리먼트 취득
        // const $audioEl = document.querySelector("audio");
        // const $btn = document.querySelector("button");

        // 녹음중 상태 변수

        // MediaRecorder 변수 생성

        // 녹음 데이터 저장 배열
        const audioArray: Blob[] = [];
        
        if (!isRecording) {
            console.log("if 안");

            // 마이크 mediaStream 생성: Promise를 반환하므로 async/await 사용
            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log("mediaStream: " , mediaStream);

            // MediaRecorder 생성
            let tmpMediaRecorder = new MediaRecorder(mediaStream);
            setMediaRecorder(tmpMediaRecorder);

            // 이벤트핸들러: 녹음 데이터 취득 처리
            tmpMediaRecorder.ondataavailable = (event)=>{
                audioArray.push(event.data); // 오디오 데이터가 취득될 때마다 배열에 담아둔다.
                console.log(audioArray);
            }

            // 이벤트핸들러: 녹음 종료 처리 & 재생하기
            tmpMediaRecorder.onstop = (event)=>{
                
                // 녹음이 종료되면, 배열에 담긴 오디오 데이터(Blob)들을 합친다: 코덱도 설정해준다.
                const blob = new Blob(audioArray, {"type": "audio/ogg codecs=opus"});
                sendAudio(blob)
                audioArray.splice(0); // 기존 오디오 데이터들은 모두 비워 초기화한다.
                // Blob 데이터에 접근할 수 있는 주소를 생성한다.
                const blobURL = window.URL.createObjectURL(blob);

                // audio엘리먼트로 재생한다.
                // $audioEl.src = blobURL;
                //$audioEl.play();

            }

            // 녹음 시작
            tmpMediaRecorder.start();
            setIsRecording(true);

        }else{
            // 녹음 종료
            console.log(mediaRecorder);
            mediaRecorder?.stop();
            setIsRecording(false);
        }
    }

    const sendAudio = (blob :Blob) => {
        if(blob == null) return;

        let filename = "soundfile.wav";
        //filename = "soundfile.wav";
        const file = new File([blob], filename, { lastModified: new Date().getTime(), type: "audio" });
        console.log(file)
        let fd = new FormData();
        fd.append("fileName", filename);
        fd.append("file", file);

        

        fetch("https://j8d201.p.ssafy.io:5001/voicetest", {
            method: "POST",
            headers : {},
            body : fd
        }).then(res => res.json()).then(result => {
            console.log(result.result);
            alert(result.result)
        })
    }

    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <div>
            <div>VoiceRec</div>
            <button onClick={recording}>test</button>
        </div>
    )
}

export default VoiceRec