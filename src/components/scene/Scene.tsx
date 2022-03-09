import { FC, useRef } from "react";
import { observer } from "mobx-react";
import useAudioControls from "utils/useAudioControls";
import GameManager from "../game-manager/GameManager";
import FireBalls from "../fireballs/FireBalls";
import Aliens from "../aliens/Aliens";
import Plane from "../plane/Plane";
import store from "mobx/store";
import { GameState } from "types";

const Scene: FC = observer(() => {
  const boardRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLImageElement>(null);
  useAudioControls();

  return (
    <div id="gameBoard" ref={boardRef}>
      <GameManager board={boardRef.current} plane={planeRef.current} />
      <Plane ref={planeRef} />
      <FireBalls />
      <Aliens board={boardRef.current} />

      {/* <br />
      <br />
      <br />
      <br />
      <button onClick={() => store.updateGameState(GameState.Failed)}>
        stop
      </button> */}
    </div>
  );
});

export default Scene;
