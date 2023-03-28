import './Card.css'

interface Props {
  card: string
};

const Cards: React.FC<Props> = ({card}) => {

  
  return (
    <div className="flip-container">
      <div className="flip-inner-container">
        <div className="flip-front">
          <img src={require(`../../assets/card/front/${card}.png`)} alt="f"/>
        </div>
        <div className="flip-back">
          <img src={require(`../../assets/card/back/${card}.png`)} alt="b"/>
        </div>
      </div>
    </div>
  )
};

export default Cards;