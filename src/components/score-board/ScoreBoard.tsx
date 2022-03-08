import { FC } from "react";
import { Typography, Button, Stack, AppBar } from "@mui/material";
import store from "mobx/store";
import { observer } from "mobx-react";
import { GameState } from "types";
import Clock from "./Clock";

const ScoreBoard: FC = observer(() => {
  const onStart = (): void => {
    store.updateGameState(GameState.Playing);
  };

  return (
    <AppBar color="secondary">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography variant="h5">90's Plane Game</Typography>
        <Typography variant="subtitle1">
          Score: <span className="score">{store.score}</span> pts
        </Typography>
        <Clock />
        {store.gameState === GameState.Playing ? (
          <Button variant="contained" color="primary" disabled>
            Playing...
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={onStart}>
            Start
          </Button>
        )}
      </Stack>
    </AppBar>
  );
});

export default ScoreBoard;
