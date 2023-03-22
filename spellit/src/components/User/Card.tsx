import front from '../../assets/card/front/fire1.png'
import back from '../../assets/card/back/fire1.png'

import './Card.css'

const Cards = () => {
 
  return (
    <div className="flip-container">
      <div className="flip-inner-container">
        <div className="flip-front">
          <img src={front} alt="f"/>
        </div>
        <div className="flip-back">
          <img src={back} alt="b"/>
        </div>
      </div>
    </div>
  )
} 

export default Cards;