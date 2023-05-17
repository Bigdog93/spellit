import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const quickStart = () => {
    navigate('/match')
  };

  return (
    <div>
      <p>Home index.tsx</p>
      <button onClick={quickStart}>Quick Start</button>
    </div>
  );
};

export default Home;