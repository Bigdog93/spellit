import style from './index.module.css'
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
 
  return (
    <div className={`${style.characterItems}`}>
      { characters.map((character: GameCharacterType, index: number) => (
        <div onClick={(e) => onSelectCharacter(character)}>
          {/* {character.characterName} */}
          <img className={`${style.characterImg}`} src={require(`../../assets/character/${character.englishName}_card.png`)} alt="" />
          {/* <Card key={index} card={card.code}/> */}
        </div>
      ))}
      
    </div>
  )
}

export default Characters;