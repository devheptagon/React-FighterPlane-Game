import { FC } from "react";
import { observer } from "mobx-react";
import { Button, Stack, AppBar } from "@mui/material";
import store from "mobx/store";
import { GameState } from "types";
import styles from "./Header.module.scss";

const Header: FC = observer(() => {
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
        <span className={styles.title}>Fighter Plane</span>
        {store.gameState === GameState.Playing ? (
          <Button variant="contained" color="success" disabled>
            Playing...
          </Button>
        ) : (
          <Button variant="contained" color="warning" onClick={onStart}>
            Start
          </Button>
        )}
      </Stack>
    </AppBar>
  );
});

export default Header;
