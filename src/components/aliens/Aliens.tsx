import { observer } from "mobx-react";
import { random } from "lodash";
import store from "mobx/store";
import { FC, useCallback, useEffect, useRef } from "react";
import { GameState, IAlien } from "types";
import AlienItem from "./AlienItem";

const Aliens: FC<{ board: HTMLDivElement | null }> = observer((props) => {
  const boardCoords = props.board?.getBoundingClientRect() || {
    right: 1000,
    bottom: 2000,
  };

  let timer = useRef(0);

  const createNewAlien = useCallback(() => {
    const alienLeft = random(50, boardCoords.right - 150);
    store.createAlien(alienLeft, 30);
    window.clearTimeout(timer.current);
    const delay = random(3000, 4000);
    timer.current = window.setTimeout(() => createNewAlien(), delay);
  }, [boardCoords.right]);

  useEffect(() => {
    createNewAlien();
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [createNewAlien]);

  if (!props.board || store.gameState !== GameState.Playing) return null;

  return (
    <>
      {store.aliens.map((el: IAlien) => (
        <AlienItem key={el.id} {...el} boardBottomPos={boardCoords.bottom} />
      ))}
    </>
  );
});

export default Aliens;
