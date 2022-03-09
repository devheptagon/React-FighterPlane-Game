import { FC, useRef } from "react";
import { observer } from "mobx-react";
import useAudioControls from "utils/useAudioControls";
import GameManager from "components/game-manager/GameManager";
import FireBalls from "components/fireballs/FireBalls";
import Aliens from "components/aliens/Aliens";
import Plane from "components/plane/Plane";
import store from "mobx/store";
import { GameState } from "types";
import styles from "./Scene.module.scss";

const Scene: FC = observer(() => {
  const boardRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLImageElement>(null);
  useAudioControls();

  return (
    <div id="gameBoard" ref={boardRef} className={styles.gameBoard}>
      <GameManager board={boardRef.current} plane={planeRef.current} />
      <Plane ref={planeRef} />
      <FireBalls />
      <Aliens board={boardRef.current} />

      <br />
      <br />
      <br />
      <br />
      <button onClick={() => store.updateGameState(GameState.Failed)}>
        stop
      </button>
    </div>
  );
});

export default Scene;
