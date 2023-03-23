import { createContext, useRef } from 'react';
import { costActions } from "@/store/cost"
import { useDispatch, useSelector } from 'react-redux';

import store from "@/store/";
import { userActions } from "@/store/user"
import { playerActions } from "@/store/player"
import { matchingActions } from "@/store/matching"

const WebSocketContext = createContext<any>(null);
export { WebSocketContext };

  
export const WebSocketProvider =  ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://localhost:8080/api/socket`
  let ws = useRef<WebSocket | null>(null).current;
  let send = ws?.send;
  const dispatch = useDispatch();

  const state = store.getState();

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
        dispatch(costActions.set(info.data));
        
      } else if (type === 'entQueue') {
        console.log('entQueue 입니다.')

      } else if (type === 'connected') {
          console.log('connected 입니다.')
          // 매칭 성공했을 때 player의 p1은 나, p2는 상대방에 넣음
          if (info.playerlist[0].memberId == state.user.memberId ) {
            dispatch(playerActions.setP1(info.playerlist[0]))
            dispatch(playerActions.setP2(info.playerlist[1]))
          } else {
            dispatch(playerActions.setP1(info.playerlist[1]))
            dispatch(playerActions.setP2(info.playerlist[0]))
          }

          state.matching.matched = true;
          


      } else if (type === 'loading') {
        console.log('loading 입니다.')

      } else if (type === 'toReady') {
        console.log('toReady 입니다.')

      } else if (type === 'toAttack') {
        console.log('toAttack 입니다.')

      } else if (type === 'otherSpell') {
        console.log('otherSpell 입니다.')

      } else if (type === 'combo') {
        console.log('combo 입니다.')

      } else if (type === 'toDefense') {
        console.log('toDefense 입니다.')

      } else if (type === 'toSettle') {
        console.log('toSettle 입니다.')

      } else if (type === 'gameOver') {
        console.log('gameOver입니다.')
        
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
}

// export const useConn = () => useContext(Context);