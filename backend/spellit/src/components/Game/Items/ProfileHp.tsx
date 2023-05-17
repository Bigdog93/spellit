import { RootState } from "@/store";
import { useSelector } from "react-redux";
import profileImg from "../../../assets/InGame/profileImg.png";
import HpBar from "./HpBar";

function ProfileHp({character, level}: {character: string, level: number}) {

    return (
        <div className="profile-hp-box">
            <div className="profileLevelCircle"><p>Lv. {level}</p></div>
            <img src={require(`../../../assets/character/${character}_portrait.png`)} alt="" style={{width: '120px', height: '120px'}} />
            <HpBar></HpBar>
        </div>
    )
}

export default ProfileHp;