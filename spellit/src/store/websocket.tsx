import { createContext, useRef } from 'react';
import  { costActions } from "@/store/cost"
import { useDispatch, useSelector } from 'react-redux';

// import store from "@/store/";
import { RootState } from '@/store';
import { playerActions } from "@/store/player";
import { matchingActions } from './matching';
import { attackActions } from './attack';
import { roomActions } from "@/store/room";
import { gameActions } from './game';
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
        dispatch(matchingActions.setOtherReady())
        
      }else if (type === 'toReady') {
        console.log('toReady 입니다.')
        dispatch(gameActions.startReady())
        dispatch(costActions.set(info.cost))
        
      } else if (type === 'toAttack') {
        console.log('toAttack 입니다.')
        dispatch(gameActions.endReady())
        dispatch(attackActions.playersDeckList(info.attackCards));
        dispatch(gameActions.startAttack())
        console.log('toAttack에 websocket에서 찍는',info)
        dispatch(gameActions.setAttacks(info.attackCards))
        // dispatch(attackActions.playersDeckList(info.attackCards));

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
        dispatch(gameActions.endAttack());
        dispatch(gameActions.startDefense());


      } else if (type === 'toSettle') {
        console.log('toSettle 입니다.')
        dispatch(gameActions.endDefense());
        dispatch(gameActions.startSettle());


      } else if (type === 'gameOver') {
        console.log('gameOver입니다.')
        dispatch(gameActions.endSettle());
        
      } else {
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