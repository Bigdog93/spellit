import React, { createContext, useRef } from 'react';
import  { costActions } from "@/store/cost"
import { useDispatch, useSelector } from 'react-redux';

// import store from "@/store/";
import { RootState } from '@/store';
import { playerActions } from "@/store/player";
import { matchingActions } from './matching';
import { attackActions } from './attack';
import { roomActions } from "@/store/room";
import { friendsActions } from './friends';
import { UserEntityType } from '@/utils/Types';
import game, { gameActions } from './game';
import { settleActions } from './settle';

const WebSocketContext = createContext<any>(null);
export { WebSocketContext };

  
export const WebSocketProvider =  ({ children }: { children: React.ReactNode }) => {
  // const webSocketUrl = `ws://localhost:8080/api/socket`
  const webSocketUrl = `wss://j8d201.p.ssafy.io/api/socket`
  
  let ws = useRef<WebSocket | null>(null).current;
  let send = ws?.send;
  const dispatch = useDispatch();

  // const state = store.getState();
  const state = useSelector((state: RootState) => state);


  if (!ws) {
    ws = new WebSocket(webSocketUrl);

    ws.onopen = () => {
      console.log("connected to " + webSocketUrl);
    }

    ws.onclose = error => {
      console.log("disconnect from " + webSocketUrl);
      console.log(error);
    };

    ws.onerror = error => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
    };

    ws.onmessage = (e) => {
      console.log(e);
      const content = JSON.parse(e.data);
      const type = content.type;
      const info = content.info;
      if (type === 'test') {
        console.log('test입니다.')
        // dispatch(costActions.set(info.data));
        console.log(content);
        
      } else if (type === 'entQueue') {
        console.log('entQueue 입니다.')

      } else if (type === 'connected') {
          console.log('connected 입니다.')
          console.log('roomInfo있나 확인', info.room)
          
          // 매칭 성공했을 때 player의 p1은 나, p2는 상대방에 넣음
          if (info.roomInfo.playerList[0].memberId === state.user.id ) {
            dispatch(playerActions.setP1(info.roomInfo.playerList[0]))
            dispatch(playerActions.setP2(info.roomInfo.playerList[1]))
          } else {
            dispatch(playerActions.setP1(info.roomInfo.playerList[1]))
            dispatch(playerActions.setP2(info.roomInfo.playerList[0]))
          }
          dispatch(matchingActions.connected())
          // room 정보 설정
          dispatch(roomActions.setRoom(info.roomInfo))

      } else if (type === 'loaded') {
        console.log('loaded 입니다.')
        console.log(info);
        dispatch(matchingActions.p2Loading())
        // dispatch(gameActions.endReady())

      } else if (type === 'otherReady'){
        console.log('otherReady 입니다.') 
        dispatch(matchingActions.setOtherReady(true))
        dispatch(gameActions.endSettle)
        
      }else if (type === 'toReady') {
        console.log('toReady 입니다.')
        dispatch(gameActions.endSettle())
        dispatch(gameActions.startReady())
        dispatch(matchingActions.setOtherReady(false))

        dispatch(costActions.set(info.cost))
        console.log('toReady에서 info.cost로 받은 cost', info.cost)
        
      } else if (type === 'toAttack') {
        console.log('toAttack 입니다.')
        
        // 이번 턴에 진행될 공격들 셋팅
        // dispatch(attackActions.playersDeckList(info.attackCards));
        dispatch(gameActions.setAttacks(info.attackCards))
        
        // readyTurn 끝냄
        dispatch(gameActions.endReady())

        // attackTurn 시작
        dispatch(gameActions.startAttack())
        // setTimeout(() => {
        // }, 1000);

        // console.log('toAttack에 websocket에서 찍는',info)
        // setTimeout(() => {
        // }, 1000);

      } else if (type === 'otherSpell') {
        console.log('otherSpell 입니다.')
        console.log('=====================================')
        console.log(info)
        console.log(info.damage)
        dispatch(settleActions.percentList(info.damage));
        // dispatch(attackActions.attackInfo(info.spell));
        
      } else if (type === 'combo') {
        console.log('combo 입니다.')

      } else if (type === 'toDefense') {
        console.log('toDefense 입니다.')
        dispatch(gameActions.endAttack())
        dispatch(gameActions.startDefense())
        // 애매하지만 이쯤에서 setAttackCheck 리셋
        dispatch(gameActions.setAttackCheck())
      
      } else if (type === 'toSettle') {
      // } else if (type === 'settle') {
        console.log('toSettle 입니다.')
        dispatch(gameActions.setOtherDefense(info.defense))
        dispatch(gameActions.endDefense())
        dispatch(gameActions.startSettle())
        
      } else if (type === 'gameOver') {
        console.log('gameOver입니다.')
        dispatch(gameActions.endSettle())
        // dispatch(gameActions.endGame())
        dispatch(gameActions.startResult())
        console.log('gameOver에서 찍는', info.result)
        dispatch(gameActions.setResult(info.result))

      } else if (type === 'friendLogin') {
        const friendId = info.friendId;
        const friendNickname = info.friendNickname;
        console.log(friendNickname + '님이 접속하였습니다.');
        dispatch(friendsActions.loginFriend(friendId));

      } else if (type === 'friendLogout') {
        const friendId = info.friendId;
        const friendNickname = info.friendNickname;
        console.log(friendNickname + '님이 로그아웃 하였습니다.');
        dispatch(friendsActions.logoutFriend(friendId));

      } else if (type === 'friendRequest') {
        const f = info.friend;
        const friend: UserEntityType = {
          deck: [],
          email: f.email,
          exp: f.exp,
          gameCharacterEntity: f.gameCharacter,
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
        dispatch(friendsActions.fillFriendWaitsList(friend));

      } else if (type === 'friendResponse') {
        const f = info.friend;
        const friend: UserEntityType = {
          deck: [],
          email: f.email,
          exp: f.exp,
          gameCharacterEntity: f.gameCharacter,
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
        dispatch(friendsActions.fillFriendsList(friend))
      } else if (type === 'playStart') {
        const friendId = info.friendId;
        const friendNickname = info.friendNickname;
        console.log(friendNickname + '님이 게임을 시작하였습니다.');
        dispatch(friendsActions.playStartFriend(friendId));
      } else if (type === 'playEnd') {
        const friendId = info.friendId;
        const friendNickname = info.friendNickname;
        console.log(friendNickname + '님이 게임을 시작하였습니다.');
        dispatch(friendsActions.playEndFriend(friendId));
      } else if (type === 'matchRequest') {
        const roomId = info.roomId;
        const f = info.friend;
        const friend: UserEntityType = {
          deck: [],
          email: f.email,
          exp: f.exp,
          gameCharacterEntity: f.gameCharacter,
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
        dispatch(friendsActions.setMatchRequestPlayer(friend));
        dispatch(friendsActions.setMatchRequestRoomId(roomId));
        dispatch(friendsActions.setMatchRequestModalFlag(true));
      } else if (type === 'matchRefuse') {
        console.log('상대방이 도전을 거부하였습니다.');
      }
      else {
        console.log('그런 이벤트는 없습니다.')
      }
    }

    send = (data: any) => {
      if(ws) ws.send(JSON.stringify(data));
    }
  }

  return (
    <WebSocketContext.Provider value={{ ws, send }}>
      {children}
    </WebSocketContext.Provider>
  );
};