import useSound from 'use-sound';


function SE(src:string) {
  const CardFlip = require("../assets/soundeffect/CardFlip.mp3");
  const [play] = useSound(src)
  if (src === CardFlip) {
    return play()
  }
}

export default SE;
