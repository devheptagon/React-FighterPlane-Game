import { FC } from "react";
import store from "mobx/store";
import { observer } from "mobx-react";
import styles from "./ScoreBoard.module.scss";

const ScoreBoard: FC = observer(() => {
  return (
    <div className={styles.scoreBoard}>
      <span> {store.score}</span>
    </div>
  );
});

export default ScoreBoard;
