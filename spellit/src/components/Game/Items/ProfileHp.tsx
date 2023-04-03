import profileImg from "../../../assets/InGame/profileImg.png";
import HpBar from "./HpBar";

function ProfileHp({character}: {character: string}) {
    return (
        <div className="profile-hp-box">
            <img src={require(`../../../assets/character/${character}_portrait.png`)} alt="" style={{width: '120px', height: '120px'}} />
            <HpBar></HpBar>
        </div>
    )
}

export default ProfileHp;