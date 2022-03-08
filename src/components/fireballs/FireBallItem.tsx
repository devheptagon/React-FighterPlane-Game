import { FC, useEffect, useState, useCallback } from "react";
import store from "mobx/store";

const FireBallItem: FC<{ id: string; top: number; left: number }> = (props) => {
  const { id, left, top } = props;
  const [newTop, setNewTop] = useState(top);

  const moveUp = useCallback(
    (currentTop: number) => {
      if (currentTop > 0) {
        const nextTop = currentTop - 20;
        setNewTop(nextTop);
        window.requestAnimationFrame(() => moveUp(nextTop));
      } else {
        store.destroyFireball(id);
      }
    },
    [id]
  );

  useEffect(() => {
    moveUp(top);
    return () => store.destroyFireball(id);
  }, [id, top, moveUp]);

  return <div className="fire" id={id} style={{ left, top: newTop }}></div>;
};

export default FireBallItem;
