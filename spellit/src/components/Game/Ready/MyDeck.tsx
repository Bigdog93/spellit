import { useState } from "react"
import Fire1 from '../../../assets/card/front/Fire1.png'
import Light1 from '../../../assets/card/front/Light1.png'
import Ice1 from '../../../assets/card/front/Ice1.png'
import Wind1 from '../../../assets/card/front/Wind1.png'
import Dark1 from '../../../assets/card/front/Dark1.png' 

import './MyDeck.css'

const MyDeck = () => {

  const myDeck = ['Fire1', 'Light1', 'Ice1', 'Wind1', 'Dark1']
  const myCards = myDeck.map((card) => {
    return <img src={card} alt="card" className="card1"></img>
  })
  return <div className="cards">
    <img src={Fire1} alt="card" className="card1 selected"></img>
    <img src={Light1} alt="card" className="card2"></img>
    <img src={Ice1} alt="card" className="card3"></img>
    <img src={Wind1} alt="card" className="card4"></img>
    <img src={Dark1} alt="card" className="card5"></img>
  </div>
}
export default MyDeck