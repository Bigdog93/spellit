// import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit'
// import useRef from 'react';

// // type sessionType = {
// //   ws: {
// //     new (url: string | URL, protocols?: string | string[] | undefined): WebSocket;
// //     prototype: WebSocket;
// //     readonly CLOSED: number;
// //     readonly CLOSING: number;
// //     readonly CONNECTING: number;
// //     readonly OPEN: number;
// //   }
// // }

// const sessionState = {
//   ws: WebSocket.prototype,
// };

// const sessionSlice = createSlice({
//   name: 'session',
//   initialState: sessionState,
//   reducers: {
//     connect(state) {
//       console.log("connecting");
//       state.ws = new WebSocket(`ws://localhost:8080/api/socket`);
//       state.ws.onopen = () => {
//         state.ws.onmessage = (e :MessageEvent) => {
//           console.log(e);
//           const content = JSON.parse(e.data);
//           console.log(content);
//         }
//       }
//     },
//     send(state, action: PayloadAction<Object>) {
//       console.log("send 호출 됨");
//       console.log(action);
//       state.ws.send(JSON.stringify(action.payload));
//     }
//   },
// });

// export const sessionActions = sessionSlice.actions;

// export default sessionSlice.reducer;

import { createContext, useRef } from 'react';

import { costActions } from "@/store/cost"
import { attackActions } from "@/store/attack"
import { useDispatch } from 'react-redux';

const WebSocketContext = createContext<any>(null);
export { WebSocketContext };

  
// eslint-disable-next-line import/no-anonymous-default-export
export const WebSocketProvider =  ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://localhost:8080/api/socket`
  let ws = useRef<WebSocket | null>(null).current;
  let send = ws?.send;
  const dispatch = useDispatch();

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
      const info = content.info;
      
      dispatch(costActions.set(info.data));
      
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