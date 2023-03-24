import Card from './Card'
import style from './index.module.css'

interface CardType {
  attribute: number;
  code: string;
  cost: number;
  damage: number;
  id: number;
  spell: string;
  title: string
}
const Cards = ({cards}: {cards:Array<CardType>}) => {
  const selectCard = () => {
    
  };

  return (
    <div className={`${style.items}`}>
      { cards.map((card: CardType, index: number) => (
        <div onClick={selectCard}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
      
    </div>
  )
}

export default Cards;