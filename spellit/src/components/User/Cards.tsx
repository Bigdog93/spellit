import Card from './Card'
import style from './index.module.css'

const Cards = () => {
  const cards = ['fire1', 'water1', 'wind1', 'wind3', 'light1', 'dark1']

  return (
    <div className={`${style.items}`}>
      { cards.map((card: string, index: number) => (
        <Card key={index} card={card}/>
      ))}
      
    </div>
  )
}

export default Cards;