import { useState } from "react";

function App() {
  const [readypage, setReadyPage] = useState(false);
  
  return (
    <div className="App">
      <p>Here's App.tsx</p>
      <button>ReadyPage</button>

    </div>
  );
}

export default App;
