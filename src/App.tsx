import { FC } from "react";
import Scene from "components/scene/Scene";
import ScoreBoard from "components/score-board/ScoreBoard";

const App: FC = () => {
  return (
    <>
      <ScoreBoard />
      <Scene />
    </>
  );
};

export default App;
