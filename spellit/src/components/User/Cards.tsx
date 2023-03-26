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
interface PropsType {
  cards: Array<CardType>;
  selectCard: (res: CardType) => void;
};

const Cards = ({cards, selectCard}: PropsType) => {
  const onSelectCard = (data:any)=>{
    selectCard(data);
    console.log(data)
  }
 
  return (
    <div className={`${style.items}`}>
      { cards.map((card: CardType, index: number) => (
        <div onClick={(e) => onSelectCard(card)}>
          <Card key={index} card={card.code}/>
        </div>
      ))}
      
    </div>
  )
}

export default Cards;