import { RootState } from "@/store"
import { useEffect } from "react";
import { useSelector } from "react-redux"


const Result = () => {
  const resultTurn = useSelector((state: RootState) => (state.game.resultTurn));
  const result = useSelector((state: RootState) => (state.game.result));

  useEffect(() => {
    console.log('result 페이지에 들어옴!!')
  }, [resultTurn, result]);

  return (
    <div className="result-bg">
    <h1>{result}</h1>
    </div>
  )
}
export default Result
