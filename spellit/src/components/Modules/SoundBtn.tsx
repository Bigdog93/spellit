import { MusicContext } from '@/store/music';
import React, { useContext, useState } from 'react'
import style from "./Modules.module.css";

import soundOff from '@/assets/ui/soundOff.png';
import soundOn from '@/assets/ui/soundOn.png';
import { useEffect } from 'react';

type Props = {}

const SoundBtn = () => {

    const { setMusic, bgmOn, setBgmOn, stop } = useContext(MusicContext);
    const soundToggle = () => {
        console.log(bgmOn);
    setBgmOn(!bgmOn);
    if(bgmOn) stop();
    }
    
    useEffect(() => {
        setBgmOn(bgmOn);
        return () => {
        }
    }, [])

  return (
    <div className={`${style.soundToggleBtn}`} onClick={soundToggle}>
        {bgmOn && <img src={soundOn} alt="소리켜짐"></img>}
        {!bgmOn && <img src={soundOff} alt="소리켜짐"></img>}
    </div>
  )
}

export default SoundBtn