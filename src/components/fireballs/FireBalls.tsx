import { observer } from "mobx-react";
import store from "mobx/store";
import { FC } from "react";
import { IFireball } from "types";
import FireBallItem from "./FireBallItem";

const FireBalls: FC = observer(() => {
  return (
    <>
      {store.fireballs.map((el: IFireball) => (
        <FireBallItem key={el.id} {...el} />
      ))}
    </>
  );
});

export default FireBalls;
