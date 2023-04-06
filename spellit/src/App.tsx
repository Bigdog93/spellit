import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WebSocketProvider } from "./store/websocket";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { MusicProvider } from "./store/music";

import Home from "./components/Home";
import Game from "./components/Game";
import Matching from "./components/Matching";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Settle from "./components/Game/Settle/Settle";
import Result from "./components/Game/Result/Result";
import Profile from "./components/Profile";
import Deck from './components/User';
// 임시
import Defense from "./components/Game/Defense";
import Skills from "./components/Settle/Skills";
import Test from "./components/Test";
import Particle from "./components/Test";
import OtherSpell from './components/Game/Attack';
// import Combo from "./components/Game/Attack/Combo";
import NotFound404 from "./NotFound404";



function App() {
  const isLogged = useSelector((state: RootState) => (state.auth.isAuthenticated));

  return (
    <WebSocketProvider>
      <MusicProvider>
      <BrowserRouter>
        <Routes>
          {isLogged ? (
            <Route index element={<Home />} />
          ) : (
            <Route index element={<Login />} />
          )}
          <Route path="/home" element={<Home />} />
          <Route path="game/:roomId" element={<Game />} />
          <Route path="matching" element={<Matching />} />
          <Route path="deck/:modeParam" element={<Deck />} />
          {/* <Route path="ready" element={<Ready />} /> */}
          <Route path="defense" element={<Defense />} />
          {/* <Route path="attack" element={<Attack />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="oath" element={<OAuth />} /> */}
          <Route path="profile/:id" element={<Profile />} />
          <Route path="test" element={<Test/>}/>
          <Route path="settle" element={<Settle />} />
          <Route path="result" element={<Result />} />
          {/* <Route path="spell" element={<Spell />} /> */}
          <Route path="skills" element={<Skills />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="particle" element={<Particle />} />
          <Route path="otherspell" element={<OtherSpell />} />
          {/* <Route path="combo" element={<Combo />} /> */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        </BrowserRouter>
      </MusicProvider>
    </WebSocketProvider>
  );
}

export default App;
