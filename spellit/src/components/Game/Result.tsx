import { RootState } from "@/store"
import { useSelector } from "react-redux"


const Result = () => {
  const result = useSelector((state: RootState) => (state.game.result));

  return (
    <div className="result-bg">
    <h1>{result}</h1>
    </div>
  )
}
export default Result
