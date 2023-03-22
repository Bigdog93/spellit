import Cards from './Cards'
import style from './index.module.css'

const User = () => {
  return (
    <div className={`${style.bg}`}>
      <div className={`${style.items}`}>
        <Cards />
      </div>
      <div className={`${style.cardselectcontainer}`}>
        <div className={`${style.cardselect}`}>
          e
        </div>
      </div>
    </div>
  )
}

export default User;