import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./store/websocket";


import Home from "./components/Home";
import Game from "./components/Game";
import Matching from "./components/Matching";
import User from './components/User'
import Ready from "@/components/Game/Ready"
import Defence from '@/components/Game/Defense/Defense';
import Attack from "@/components/Game/Attack/Attack";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import OAuth from "./components/Auth/OAuth";
import Test from "./components/Test";
import Settle from "./components/Settle/Settle";

function App() {

  return (
    <WebSocketProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Login />}/> */}
          <Route path="home" element={<Home />} />
          <Route path="game/:roomId" element={<Game />} />
          <Route path="match" element={<Matching />} />
          <Route path="user" element={<User />} />
          <Route path="ready" element={<Ready />} />
          <Route path="defense" element={<Defence/>}/>
          <Route path="attack" element={<Attack/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="oath" element={<OAuth/>}/>
          <Route path="join" element={<Signup/>}/>
          <Route path="test" element={<Test/>}/>
          <Route path="settle" element={<Settle/>}/>
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
