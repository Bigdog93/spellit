import { useState } from 'react'
import Ready from './Ready'


const Game = () => {
  const [cost, costHandler] = useState<number>(30);



  return (
  <div>
    <Ready cost={cost} />
  </div>
  )
}
export default Game