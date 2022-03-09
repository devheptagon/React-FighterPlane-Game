import alienImage from "assets/alien.png";
import { FC, useCallback, useEffect, useState } from "react";
import store from "mobx/store";
import { GameState } from "types";

const AlienItem: FC<{
  id: string;
  top: number;
  left: number;
  boardBottomPos: number;
}> = (props) => {
  const { id, left, top, boardBottomPos } = props;
  const [newTop, setNewTop] = useState(top);

  const moveDown = useCallback(
    (currentTop: number) => {
      if (currentTop < boardBottomPos - 30) {
        const nextTop = currentTop + 1;
        setNewTop(nextTop);
        window.requestAnimationFrame(() => moveDown(nextTop));
      } else {
        store.destroyAlien(id);
        //store.updateGameState(GameState.Failed);
      }
    },
    [id, boardBottomPos]
  );

  useEffect(() => {
    moveDown(top);
    return () => store.destroyAlien(id);
  }, [id, top, moveDown]);

  return (
    <img
      className="alien"
      id={id}
      style={{ left, top: newTop }}
      src={alienImage}
      alt="alien"
    />
  );
};

export default AlienItem;
