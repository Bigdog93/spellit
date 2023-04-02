import { RootState } from "@/store"
import { useSelector } from "react-redux"
import Draw from "./Draw";
import Lose from "./Lose";
import Win from "./Win";
import './Result.css';


const Result = () => {

  const result = useSelector((state: RootState) => (state.game.result));
  const p1Character = useSelector((state: RootState) => state.player.p1!.gameCharacterEntity.englishName);
  const p2Character = useSelector((state: RootState) => state.player.p2!.gameCharacterEntity.englishName);
  const p2Info = useSelector((state: RootState) => state.player.p2);
  
  let imgsrc = '';
  if (result === 'draw') {
    imgsrc = 'default';
  } else {
    imgsrc = result;
  }
  
  return (
    <div className="result-bg">
      {<img style={{width: '300px'}} src={require(`../../../assets/character/${p1Character}_${imgsrc}.png`)} alt="" />}
      <div className="blueframeBox">
        <img src="assets/result/blueframe.png" alt="" />
        <img src={require(`../../../assets/result/${result}Img.png`)} alt="" />
        <img src="assets/result/turnsImg.png" alt="" />
        <div className="p2Box">
          <img src={require(`../../..assets/character/${p2Character}_portrait.png`)} alt="" />
          <h3>{p2Info?.nickname}</h3>
          <img src="assets/result/friendaddBtn.png" alt="" />
          <p>{p2Info?.playCount} 판 {p2Info?.winCount} 승</p>
        </div>
        <img src="assets/result/quickmatchBtn.png" alt="" />
        <img src="assets/result/homeBtn.png" alt="" />
      </div>
    </div>
  )
}
export default Result
