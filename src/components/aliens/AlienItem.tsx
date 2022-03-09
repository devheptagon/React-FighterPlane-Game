import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import alienImage from "assets/alien.png";
import store from "mobx/store";
import { ALIEN_MOVE_AMOUNT, ALIEN_END_BOTTOM_POS_MARGIN } from "utils/settings";
import styles from "./Aliens.module.scss";

const AlienItem: FC<{
  id: string;
  top: number;
  left: number;
  boardBottomPos: number;
}> = (props) => {
  const { id, left, top, boardBottomPos } = props;
  const { destroyAlien, decreaseHealth } = store;
  const [newTop, setNewTop] = useState(top);

  let destroyTimer = useRef<number>(0);
  let frameTimer = useRef<number>(0);

  const delayedDestroy = useCallback(
    (id) => {
      if (destroyTimer.current) clearTimeout(destroyTimer.current);
      destroyTimer.current = window.setTimeout(() => {
        destroyAlien(id);
        decreaseHealth();
      }, 250);
    },
    [decreaseHealth, destroyAlien]
  );

  const moveDown = useCallback(
    (currentTop: number) => {
      if (currentTop < boardBottomPos - ALIEN_END_BOTTOM_POS_MARGIN) {
        const nextTop = currentTop + ALIEN_MOVE_AMOUNT;
        setNewTop(nextTop);
        frameTimer.current = window.requestAnimationFrame(() =>
          moveDown(nextTop)
        );
      } else {
        delayedDestroy(id);
      }
    },
    [id, boardBottomPos, delayedDestroy]
  );

  useLayoutEffect(() => {
    moveDown(top);
    return () => {
      if (frameTimer.current) window.cancelAnimationFrame(frameTimer.current);
      if (destroyTimer.current) clearTimeout(destroyTimer.current);
      destroyAlien(id);
    };
  }, [id, top, moveDown, destroyAlien]);

  return (
    <img
      className={styles.alien}
      id={id}
      style={{ left, top: newTop }}
      src={alienImage}
      alt="alien"
    />
  );
};

export default AlienItem;
