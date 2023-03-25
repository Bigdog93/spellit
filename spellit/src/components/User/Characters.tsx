import style from './index.module.css'
interface CharacterType {
  attack: string,
  characterName: string,
  englishName: string,
  hurt: string,
  id: string,
  stan: string,
  winner: string,
}
interface PropsType {
  characters: Array<CharacterType>;
  selectCharacter: (res: CharacterType) => void;
};
const Characters = ({characters, selectCharacter}: PropsType) => {
  const onSelectCharacter = (data:any)=>{
    // selectCard(data);
    console.log(data)
  }
 
  

  return (
    <div className={`${style.items}`}>
      { characters.map((character: CharacterType, index: number) => (
        <div onClick={(e) => onSelectCharacter(character)}>
          {character.characterName}
          {/* <img src={require(`../../assets/character/${character.englishName}_portrait.png`)} alt="" /> */}
          {/* <Card key={index} card={card.code}/> */}
        </div>
      ))}
      
    </div>
  )
}

export default Characters;