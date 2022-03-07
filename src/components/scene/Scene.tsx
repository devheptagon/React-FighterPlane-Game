import { FC, useEffect, useState, useRef, useCallback } from "react";
import planeImage from "assets/plane.png";
import GameManager from "utils/gameManager";
import useEventListeners from "utils/useEventListeners";
import { GameState, IGameManager } from "types";
import ScoreBoard from "../ScoreBoard";
import AudioControls from "../AudioControls";
import {
  handleFail,
  handleGameWin,
  handleLevelIncrease,
  handleStart,
} from "./scene.helper";

const Scene: FC = () => {
  const [status, setStatus] = useState<GameState>(GameState.NotPlaying);
  const [score, setScore] = useState<number>(0);
  const gameManagerRef = useRef<IGameManager>();

  const onStart = useCallback(() => {
    setStatus(GameState.Playing);
    handleStart(gameManagerRef.current);
  }, []);

  const onScore = useCallback(() => {
    const newScore = score + 100;
    setScore(newScore);
    if (newScore % 200 === 0) handleLevelIncrease(gameManagerRef.current);
    if (newScore > 1000) handleGameWin(gameManagerRef.current);
  }, [setScore, score]);

  const onFail = useCallback(() => {
    handleFail(gameManagerRef.current);
  }, []);

  useEventListeners(onScore, onFail);

  useEffect(() => {
    const board: HTMLDivElement = document.querySelector("#gameBoard")!;
    const plane: HTMLImageElement = document.querySelector("#plane")!;
    gameManagerRef.current = new GameManager(board, plane);
  }, []);

  return (
    <>
      <ScoreBoard
        score={score}
        onStart={onStart}
        isPlaying={status === GameState.Playing}
      />

      <img id="plane" src={planeImage} alt="plane" />
      <AudioControls gameManager={gameManagerRef.current} />

      {/*       <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={onFail}>stop</button> */}

      {/*       <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={onSCore}>score</button> */}

      <br />
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => handleGameWin(gameManagerRef.current)}>win</button>
    </>
  );
};

export default Scene;
