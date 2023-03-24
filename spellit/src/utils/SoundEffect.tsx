import { Howl } from 'howler';

function soundEffect(src: string, volume = 1) {
    let sound;
    const soundInject = (src: string) => {
        sound = new Howl({ src });
        sound.volume(volume);
    }
    soundInject(src);
    return sound;
}

export default soundEffect;

// 사용 방법
// import mp3 from '../assets/bgm/music.mp3'
// import effectSound from '../../utils/effectSound';

// const soundEffect = soundEffect(mp3, 2);

// 필요한 부분에서 재생
// soundEffect.play()