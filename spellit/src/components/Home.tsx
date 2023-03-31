// import * as THREE from "three";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RootState } from "@/store";
import { Html } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";

import BigMagicCircle from "@/assets/models/BigMagicCircle";
import Undercha from "@/assets/models/Undercha";
import QuickstartButton from "@/assets/models/QuickstartButton";
import DeckButton from "@/assets/models/DeckButton";
import MypageButton from "@/assets/models/MypageButton";
import CharacterButton from "@/assets/models/CharacterButton";
import Ranking from "@/assets/models/Ranking";
// import LogoutButton from "@/components/Game/models/LogoutButton";
// import BackgroundSpell from "@/components/Game/models/BackgroundSpell";
import AKDefault from "@/assets/models/AKDefault";
import CBDefault from "@/assets/models/CB_default";
import LUNADefault from "@/assets/models/LUNA_default";
import styles from "./Home.module.css";
import FriendBtn from "@/assets/models/FriendBtn";

import Friend from "./Friend";

import AddFriendModal from "./Friend/AddFriendModal";
import API from "@/utils/API";
import { UserEntityType } from "@/utils/Types";
import { friendsActions } from "@/store/friends";

const Home = () => {
	
  // 기본 카메라 위치
  // Vector3 {x: 0, y: 3.061616997868383e-16, z: 5}
  const cha_name = useSelector(
    (state: RootState) => state.user.gameCharacter?.englishName
  );
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const [addFriendModalFlag, setAddFriendModalFlag] = useState<boolean>(false);
  const [friendPopupFlag, setFriendPopupFlag] = useState<boolean>(false);

  function openFriendPopup() {
    API.get('member/friend/list', { headers: { Authorization: `Bearer ${token}` }, })
      .then((res) => {
        const friendList = Array<UserEntityType>();
                for (let f of res.data) {
                  const friend: UserEntityType = {
                    deck: [],
                    email: f.email,
                    exp: f.exp,
                    gameCharacterEntity: f.gameCharacterEntity,
                    id: f.id,
                    level: f.level,
                    nickname: f.nickname,
                    playCount: f.playCount,
                    winCount: f.winCount,
                    looseCount: f.looseCount,
                    drawCount: f.drawCount,
                    profileMsg: f.profileMsh,
                    isOnline: f.isOnline,
                    isPlaying: f.isPlaying
                  }
                  friendList.push(friend);
                }
                dispatch(friendsActions.setFriendsList(friendList));
      })
      API.get('member/friend/wait', { headers: { Authorization: `Bearer ${token}` }, })
      .then(({ data }) => {
        console.log("friend wait list : ", data);
        const friendWaitList = Array<UserEntityType>();
        for (let f of data) {
          const friendWait: UserEntityType = {
            deck: [],
            email: f.email,
            exp: f.exp,
            gameCharacterEntity: f.gameCharacterEntity,
            id: f.id,
            level: f.level,
            nickname: f.nickname,
            playCount: f.playCount,
            winCount: f.winCount,
            looseCount: f.looseCount,
            drawCount: f.drawCount,
            profileMsg: f.profileMsh,
            isOnline: f.isOnline,
            isPlaying: f.isPlaying
          }
          friendWaitList.push(friendWait);
        }
        dispatch(friendsActions.setFriendWaitsList(friendWaitList));
    })
    setFriendPopupFlag(true);
  }
  function closeFriendPopup() {
    setFriendPopupFlag(false);
  }
  function openAddFriendModal() {
    setAddFriendModalFlag(true);
    console.log(addFriendModalFlag);
  }
  function closeAddFriendModal() {
    setAddFriendModalFlag(false);
  }

  return (
    <div>
      <Canvas style={styles}>
        <ambientLight intensity={0.8} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        {/* <pointLight position={[-10, -10, -10]} /> */}

        {/* <OrbitControls /> */}
        {cha_name === "AK" && <AKDefault position={[-3, 0.2, 0]} />}
        {cha_name === "CB" && <CBDefault position={[-3, 0.2, 0]} />}
        {cha_name === "LUNA" && <LUNADefault position={[-3, 0.2, 0]} />}

        <Undercha position={[-2.7, -2.5, 0]} />
        <BigMagicCircle
          position={[2.5, 0, 0]}
          rotation={[0, Math.PI / 3, Math.PI / 2]}
        />
        <QuickstartButton
          position={[2.5, 0, 0]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
          // onClick={toQuickStart}
        />
        <DeckButton
          position={[4.2, -1.5, 1.3]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <MypageButton
          position={[0.4, -1.5, -1]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <CharacterButton
          position={[2.3, 2.5, 0.1]}
          rotation={[Math.PI / 2, 0, Math.PI / 6]}
        />
        <Ranking position={[-6.2, 1, 0]} />
        <FriendBtn position={[-6.2, -0.5, 0]} onClick={openFriendPopup}/>

        {/* <BackgroundSpell
          position={[-50, 20, -50]}
          rotation={[0, Math.PI / 2, Math.PI / 2]}
        /> */}
        {/* <LogoutButton
          position={[4.3, -2, 1.8]}
          rotation={[Math.PI / 2, 0,0]}
        /> */}
      </Canvas>
      {friendPopupFlag && <Friend openAddFriendModal={openAddFriendModal} closeFriendPopup={closeFriendPopup} />}
      {addFriendModalFlag && <AddFriendModal closeAddFriendModal={closeAddFriendModal} />}
    </div>
  );
};

export default Home;
