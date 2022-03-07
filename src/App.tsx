import { FC, useEffect, useState, useCallback } from "react";
import { Typography, Button, Stack, AppBar, Container } from "@mui/material";
import { Direction, InitialSettings, ISettings } from "./types";
import "./index.css";

const App: FC = () => {
  const [settings, updateSettings] = useState<ISettings>({
    ...InitialSettings,
  });
  const time = 0;
  const score = 0;

  const changeDirection = useCallback(
    (key: string) => {
      if (!(key in Direction)) return;
      updateSettings({ ...settings, CurrentDirection: key as Direction });
    },
    [settings]
  );

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      changeDirection(e.key);
    };
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  }, [changeDirection]);

  const start = () => {};
  console.log(settings.CurrentDirection);
  return (
    <Container>
      <AppBar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h5">90's Snake Game</Typography>
          <Typography variant="subtitle1">Score: {score}</Typography>
          <Typography variant="subtitle1">Time: {time}</Typography>
          <Button variant="contained" color="secondary" onClick={start}>
            Start
          </Button>
        </Stack>
      </AppBar>
      <div id="gameBoard">
        {new Array(100).fill(null).map((el, i) => (
          <div key={i} className="cell"></div>
        ))}
      </div>
    </Container>
  );
};

export default App;
