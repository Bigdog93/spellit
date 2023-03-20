import { Fragment } from 'react';

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  const [readypage, setReadyPage] = useState(false);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
  // return (
  //   <div className="App">
  //     <p>Here's App.tsx</p>
  //     <button>ReadyPage</button>

  //   </div>
  // );
}

export default App;
