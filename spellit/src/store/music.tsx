import React, { createContext, useContext, useEffect, useState } from 'react';
import useSound from 'use-sound';
import LoginBGM from '@/assets/bgm/login1.mp3'
import HomeBGM from '@/assets/bgm/home1.mp3'
import BattleBGM from '@/assets/bgm/battle1.mp3'

import CardFlipSound from '@/assets/soundeffect/CardFlip.mp3'
import ButtonClickSound from '@/assets/soundeffect/ButtonClick.mp3'
import NegativeButtonClickSound from '@/assets/soundeffect/NegativeButtonClick.mp3'
import SetDeckSound from '@/assets/soundeffect/SetDeck.mp3'
import LoginSound from '@/assets/soundeffect/Login.mp3'
import LogoutSound from '@/assets/soundeffect/Logout.mp3'

import Module from 'module';



const MusicContext = createContext<any>(null);
export { MusicContext }


export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const [musicName, setMusicName] = useState<string>(LoginBGM);
    const [bgmOn, setBGMOn] = useState<boolean>(false);
    const [playBGM, { stop }] = useSound(musicName, {
        interrupt: true,
        loop: true,
        soundEnabled: bgmOn,
    })
    playBGM({ forceSoundEnabled: bgmOn });

    useEffect(() => {
        playBGM();
        return () => {
            stop();
        }
    }, [])

    function setMusic(music: string) {
        console.log("setMusic");
        switch (music) {
            case 'login':
                setMusicName(LoginBGM);
                break;
            case 'home':
                setMusicName(HomeBGM);
                break;
            case 'battle':
                setMusicName(BattleBGM);
        }
    }

    useEffect(() => {
        stop();
    }, [musicName])

    const [cardFlip, cardFlipOpt ] = useSound(CardFlipSound);
    const [buttonClick, buttonClickOpt ] = useSound(ButtonClickSound);
    const [negativeButtonClick, negativeButtonClickOpt ] = useSound(NegativeButtonClickSound);
    const [setDeck, setDeckOpt ] = useSound(SetDeckSound);
    const [login, loginOpt ] = useSound(LoginSound);
    const [logoutBtn, logoutOpt ] = useSound(LogoutSound);

    return (
        <MusicContext.Provider value={{
            setBGMOn,
            playBGM,
            stop,
            setMusic,
            cardFlip, cardFlipOpt,
            buttonClick, buttonClickOpt,
            negativeButtonClick, negativeButtonClickOpt,
            setDeck, setDeckOpt,
            login, loginOpt,
            logoutBtn,logoutOpt,

        }}>
            {children}
            {/* {loginBGM && (
                <audio
                src={LoginBGM}
                autoPlay={true}>
                </audio>
            )} */}
        </MusicContext.Provider>
    )
}

export function Sound() {
    return useContext(MusicContext);
}