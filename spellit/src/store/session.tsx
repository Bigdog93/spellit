import React, { useRef } from 'react';

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://localhost:8080/api/socket`
// REACT_APP_SOCKET=wss://j8d201.p.ssafy.io/api/socket/

  let ws = useRef<WebSocket | null>(null);

  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
    }
    ws.current.onclose = error => {
      console.log("disconnect from " + webSocketUrl);
      console.log(error);
    };
    ws.current.onerror = error => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
    };
    ws.current.onmessage = (event) => {
      console.log("message " + webSocketUrl);
      console.log(event)
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
}
// // import { createSlice } from '@reduxjs/toolkit';

// // const sessionIndexState = {
// //   temp: 0,
// // };

// // const sessionSlice = createSlice({
// //   name: 'session',
// //   initialState: sessionIndexState,
// //   reducers: {
    
// //   },
// // });

// // export const sessionAction = sessionSlice.actions;

// // export default sessionSlice.reducer;

// import { useState, useEffect, useRef } from "react";

// const SocketTest = () => {
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [sendMsg, setSendMsg] = useState(false);
//   const [items, setItems] = useState([]);

//   const webSocketUrl = `ws://websocket.com`;
//   let ws = useRef(null);

//   // 소켓 객체 생성
//   useEffect(() => {
//     if (!ws.current) {
//       ws.current = new WebSocket(webSocketUrl);
//       ws.current.onopen = () => {
//         console.log("connected to " + webSocketUrl);
//         setSocketConnected(true);
//       };
//       ws.current.onclose = (error) => {
//         console.log("disconnect from " + webSocketUrl);
//         console.log(error);
//       };
//       ws.current.onerror = (error) => {
//         console.log("connection error " + webSocketUrl);
//         console.log(error);
//       };
//       ws.current.onmessage = (evt) => {
//         const data = JSON.parse(evt.data);
//         console.log(data);
//         setItems((prevItems) => [...prevItems, data]);
//       };
//     }

//     return () => {
//       console.log("clean up");
//       ws.current.close();
//     };
//   }, []);

//   // 소켓이 연결되었을 시에 send 메소드
//   useEffect(() => {
//     if (socketConnected) {
//       ws.current.send(
//         JSON.stringify({
//           message: sendMessage,
//         })
//       );

//       setSendMsg(true);
//     }
//   }, [socketConnected]);

//   return (
//     <div>
//       <div>socket</div>
//       <div>socket connected : {`${socketConnected}`}</div>
//       <div>res : </div>
//       <div>
//         {items.map((item) => {
//           return <div>{JSON.stringify(item)}</div>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default SocketTest;