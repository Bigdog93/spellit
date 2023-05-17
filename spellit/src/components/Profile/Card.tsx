import './Card.css'

interface Props {
  card: string
};

const Card: React.FC<Props> = ({card}) => {
  
  return (
    <div className="flip-container-profile">
      <div className="flip-inner-container-profile">
        <div className="flip-front-profile">
          <img src={require(`../../assets/card/front/${card}.png`)} alt="f"/>
        </div>
        <div className="flip-back-profile">
          <img src={require(`../../assets/card/back/${card}.png`)} alt="b"/>
        </div>
      </div>
    </div>
  )
};

export default Card;