import { observer } from "mobx-react";

import { FC, useEffect, useCallback, useRef } from "react";
import store from "mobx/store";
import { GameState, Direction, ISoundManager } from "types";
import useEventListeners from "utils/useEventListeners";
import useAudioControls from "utils/useAudioControls";
import {
  handleGameStart,
  handleGameStop,
  handlePlaneMove,
  handleShooting,
} from "./helpers";
import { handleScore } from "./helpers/helper.core";

const GameManager: FC<{
  board: HTMLDivElement | null;
  plane: HTMLImageElement | null;
}> = observer((props) => {
  const soundManager: ISoundManager = useAudioControls();
  const movingDirection = useRef(Direction.Left);
  const { board, plane } = props;
  const { gameState, increaseScore, destroyAlien } = store;

  const toggleDirection = useCallback(() => {
    movingDirection.current =
      movingDirection.current === Direction.Left
        ? Direction.Right
        : Direction.Left;
  }, [movingDirection]);

  const movePlane = useCallback(() => {
    if (!plane || !board) return;
    if (gameState !== GameState.Playing) return;

    handlePlaneMove(
      plane,
      board,
      movingDirection.current,
      store.level,
      toggleDirection
    );
  }, [gameState, board, plane, toggleDirection]);

  const checkScore = useCallback(() => {
    handleScore(increaseScore, destroyAlien);
  }, [increaseScore, destroyAlien]);

  const timerTick = useCallback(() => {
    if (gameState !== GameState.Playing) return;
    movePlane();
    checkScore();
    window.requestAnimationFrame(timerTick);
  }, [gameState, movePlane, checkScore]);

  const startTimer = useCallback(() => {
    timerTick();
  }, [timerTick]);

  const startGame = useCallback(() => {
    if (!board) return;

    handleGameStart(board, startTimer, soundManager);
  }, [board, startTimer, soundManager]);

  const stopGame = useCallback(() => {
    if (!board) return;

    handleGameStop(board, gameState, soundManager);
  }, [gameState, board, soundManager]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!plane || gameState !== GameState.Playing) return;

      if ([Direction.Left, Direction.Right].includes(e.key as Direction)) {
        movingDirection.current = e.key as Direction;
      } else if (e.key === Direction.Up) {
        handleShooting(plane, store.createFireball, soundManager);
      }
    },
    [plane, soundManager, gameState]
  );

  useEventListeners(handleKeyDown);

  useEffect(() => {
    if (gameState === GameState.Playing) {
      startGame();
    } else {
      stopGame();
    }
  }, [gameState, startGame, stopGame]);

  return null;
});

export default GameManager;
