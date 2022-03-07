import { FC, useEffect, useRef } from "react";
import { Typography, Button, Stack, AppBar, Container } from "@mui/material";
import planeImage from "./assets/plane.png";
import GameManager from "./utils/gameManager";
import "./index.css";

const App: FC = () => {
  const gameManager = useRef<GameManager>();
  const time = 0;
  const score = 0;

  const start = () => {
    gameManager.current?.startTimer();
  };

  useEffect(() => {
    const body: HTMLElement = document.querySelector("body")!;
    const plane: HTMLImageElement = document.querySelector("#plane")!;
    gameManager.current = new GameManager(body, plane);

    return () => gameManager.current?.deconstructor();
  }, []);

  return (
    <Container>
      <AppBar color="secondary">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h5">90's Plane Game</Typography>
          <Typography variant="subtitle1">Score: {score}</Typography>
          <Typography variant="subtitle1">Time: {time}</Typography>
          <Button variant="contained" color="primary" onClick={start}>
            Start
          </Button>
        </Stack>
      </AppBar>
      <img src={planeImage} alt="plane" id="plane" className="left" />
    </Container>
  );
};

export default App;
