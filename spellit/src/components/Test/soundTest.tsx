import React, {useContext} from 'react'
import useSound from 'use-sound';
import CardFlip from "@/assets/soundeffect/CardFlip.mp3";
import { MusicContext } from '@/store/music';
import { useSelector } from 'react-redux';
import BattleBGM from '@/assets/bgm/battle1.mp3'


type Props = {}

const SoundTest = () => {
    const { setMusic, setBGMOn, stop } = useContext(MusicContext);
    function BgmOn() {
        setBGMOn(true);
    }
    function BgmOff() {
        stop();
        setBGMOn(false);
    }
    return (
        <>
            <div onClick={() => { BgmOn()}}>BGM ON</div>
            <div onClick={() => { BgmOff()}}>BGM OFF</div>
        </>
  )
}

export default SoundTest