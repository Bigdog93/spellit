import Cards from './Cards'
import style from './index.module.css'

const User = () => {
  return (
    <div className={`${style.bg}`}>
      <div className={`${style.items}`}>
        <Cards />
      </div>
    </div>
  )
}

export default User;