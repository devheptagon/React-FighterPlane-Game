import { observer } from "mobx-react";
import { random } from "lodash";
import store from "mobx/store";
import { FC, useCallback, useEffect, useRef } from "react";
import { GameState, IAlien } from "types";
import AlienItem from "./AlienItem";
import {
  ALIEN_START_LEFT_POS_MARGIN,
  ALIEN_START_RIGHT_POS_MARGIN,
  ALIEN_START_TOP_POS,
  ALIEN_CREATE_DELAY_AMOUNTS,
} from "utils/settings";

const Aliens: FC<{ board: HTMLDivElement | null }> = observer((props) => {
  const boardCoords = props.board?.getBoundingClientRect() || {
    left: window.screen.width / 2,
    right: window.screen.width / 2,
    bottom: window.screen.height / 2,
  };
  const { gameState, level, createAlien } = store;
  let timer = useRef(0);

  const createNewAlien = useCallback(() => {
    const alienLeft = random(
      boardCoords.left + ALIEN_START_LEFT_POS_MARGIN,
      boardCoords.right - ALIEN_START_RIGHT_POS_MARGIN,
      false
    );

    createAlien(alienLeft, ALIEN_START_TOP_POS);
    window.clearTimeout(timer.current);
    const [delayMin, delayMax] = ALIEN_CREATE_DELAY_AMOUNTS;
    const start = Math.max(delayMin / (level * 0.75), 500);
    const end = Math.max(delayMax / (level * 0.75), 1000);
    const delay = random(start, end);

    timer.current = window.setTimeout(() => createNewAlien(), delay);
  }, [boardCoords.left, boardCoords.right, level, createAlien, timer]);

  useEffect(() => {
    if (gameState === GameState.Playing) createNewAlien();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [createNewAlien, gameState]);

  if (!props.board || gameState !== GameState.Playing) return null;

  return (
    <>
      {store.aliens.map((el: IAlien) => (
        <AlienItem key={el.id} {...el} boardBottomPos={boardCoords.bottom} />
      ))}
    </>
  );
});

export default Aliens;
