import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { Typography } from "@mui/material";
import store from "mobx/store";
import { GameState } from "types";

const Clock: FC = observer(() => {
  const { gameState, elapsedTime, increaseTime } = store;

  useEffect(() => {
    let timer: number = 0;
    if (gameState === GameState.Playing) {
      if (!timer) {
        timer = window.setInterval(() => increaseTime(), 1000);
      }
    } else {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, increaseTime]);

  return (
    <Typography variant="subtitle1">
      Time: <span className="score">{elapsedTime}</span> sec
    </Typography>
  );
});

export default Clock;
