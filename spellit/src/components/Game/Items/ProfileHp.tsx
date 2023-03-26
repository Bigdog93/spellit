import profileImg from "../../../assets/InGame/profileImg.png";
import HpBar from "./HpBar";

function ProfileHp() {
    return (
        <div className="profile-hp-box">
            <img src={profileImg} alt="" style={{width: '110px', height: '120px'}} />
            <HpBar></HpBar>
        </div>
    )
}

export default ProfileHp;