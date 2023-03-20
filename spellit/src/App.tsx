import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "@/components/Home"
import Ready from "@/components/Game/Ready"
import Defence from '@/components/Game/Defense/Defense';
import Attack from "@/components/Game/Attack/Attack";

function App() {
  
  return (
    <BrowserRouter>
		<Home/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="ready" element={<Ready />} />
				<Route path="defense" element={<Defence/>}/>
        <Route path="attack" element={<Attack/>}/>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
