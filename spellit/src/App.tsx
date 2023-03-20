import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  
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
