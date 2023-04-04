import React from 'react'
import useSound from 'use-sound';
import CardFlip from "@/assets/soundeffect/CardFlip.mp3";


type Props = {}

const SoundTest = () => {
    const [play] = useSound(CardFlip);

    return (
        <>
            <div onClick={() => { play ()}}>soundTest</div>
        </>
  )
}

export default SoundTest