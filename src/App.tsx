import { FC } from "react";
import Scene from "components/scene/Scene";
import ScoreBoard from "components/game-info/score-board/ScoreBoard";
import Header from "components/header/Header";
import Clock from "components/game-info/clock/Clock";
import Health from "components/game-info/health/Health";

const App: FC = () => {
  return (
    <>
      <Header />
      <Scene />
      <Health />
      <Clock />
      <ScoreBoard />
    </>
  );
};

export default App;
