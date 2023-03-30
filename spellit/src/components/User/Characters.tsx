import style from './index.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

type GameCharacterType = {
  id : number,
  characterName : string,
  englishName : string,
  stand : string,
  hurt : string,
  attack : string,
  winner : string,
  combo : string,
}
interface PropsType {
  characters: Array<GameCharacterType>;
  selectCharacter: (res: GameCharacterType) => void;
};

const Characters = ({characters, selectCharacter}: PropsType) => {
  const onSelectCharacter = (data:any)=>{
    selectCharacter(data);
    console.log(data)
  }
  const characterId = useSelector((state:RootState) => state.user.gameCharacter?.id)


  return (
    <div className={`${style.characterItems}`}>
      { characters.map((character: GameCharacterType, index: number) => (
        <div className={`${style.characterDiv}`} onClick={(e) => onSelectCharacter(character)}>
          {/* {character.characterName} */}
          <img className={(characterId === index + 1 ? `${style.characterImg} ${style.shadowCharacter}` : `${style.characterImg}`)} src={require(`../../assets/character/${character.englishName}_card.png`)} alt="" />
          {/* <Card key={index} card={card.code}/> */}
        </div>
      ))}
      
    </div>
  )
}

export default Characters;