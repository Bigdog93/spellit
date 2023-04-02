import React, { useState, useRef } from 'react';

const Combo: React.FC = () => {
  const [recorder, setRecorder] = useState<MediaRecorder>();
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [blob, setBlob] = useState<Blob>();
  const recordBtnRef = useRef<HTMLButtonElement>(null);
  const stopBtnRef = useRef<HTMLButtonElement>(null);
  const uploadBtnRef = useRef<HTMLButtonElement>(null);

  const recordAudio = async () => {
    console.log('record')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      newRecorder.ondataavailable = (e: BlobEvent) => {
        setChunks([...chunks, e.data]);
      };
      newRecorder.onstop = () => {
        const newBlob = new Blob(chunks, { type: 'audio/wav' });
        const newAudioUrl = URL.createObjectURL(newBlob);
        setBlob(newBlob);
        setAudioUrl(newAudioUrl);
        recordBtnRef.current?.removeAttribute('disabled');
        stopBtnRef.current?.setAttribute('disabled', 'disabled');
        uploadBtnRef.current?.removeAttribute('disabled');
      };
      setRecorder(newRecorder);
      newRecorder.start();
      recordBtnRef.current?.setAttribute('disabled', 'disabled');
      stopBtnRef.current?.removeAttribute('disabled');
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    console.log('stop')
    recorder?.stop();
  };

  const uploadAudio = async () => {
    console.log('upload')
    try {
      const formData = new FormData();
      const sound = new File([blob!], 'soundBlob', {
        lastModified: new Date().getTime(),
        type: 'audio/wav',
      });
      formData.append('blob', sound, 'audio.wav');
      const response = await fetch('http://127.0.0.1:5000/upload-audio', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      console.log(await response.text());
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Record Audio and Upload to Flask Server</h1>
      <div>
        <button ref={recordBtnRef} onClick={recordAudio}>
          Record
        </button>
        <button ref={stopBtnRef} onClick={stopRecording}>
          Stop
        </button>
        <button ref={uploadBtnRef} onClick={uploadAudio}>
          Upload
        </button>
      </div>
      <audio id="audio-player" src={audioUrl}></audio>
    </div>
  );
};

export default Combo;
