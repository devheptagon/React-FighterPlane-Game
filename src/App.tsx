import { FC, useEffect, useState, useRef, useCallback } from "react";
import { Typography, Button, Stack, AppBar, Container } from "@mui/material";
import { Direction } from "./types";
import "./index.css";
import plane from "./assets/plane.png";
import GameManager from "./utils/gameManager";

const App: FC = () => {
  const movingDirection = useRef<Direction>();
  const time = 0;
  const score = 0;

  const changeDirection = useCallback((key: string) => {
    if (![Direction.ArrowLeft, Direction.ArrowRight].includes(key as Direction))
      return;
    movingDirection.current = key as Direction;
  }, []);

  const start = () => {
    const tick = () => {
      const plane: HTMLImageElement = document.querySelector("#plane")!;
      const body = document.querySelector("body")!;
      if (
        plane.getBoundingClientRect().left <= 0 ||
        plane.getBoundingClientRect().right >=
          body.getBoundingClientRect().right
      )
        return;

      const incrementer =
        movingDirection.current === Direction.ArrowLeft ? -1 : +1;
      plane.style.left =
        plane.getBoundingClientRect().left + incrementer + "px";

      window.requestAnimationFrame(tick);
    };

    tick();
  };

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      changeDirection(e.key);
    };
    document.addEventListener("keydown", keyListener);
    start();
    return () => document.removeEventListener("keydown", keyListener);
  }, [changeDirection]);

  return (
    <Container>
      <AppBar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h5">90's Plane Game</Typography>
          <Typography variant="subtitle1">Score: {score}</Typography>
          <Typography variant="subtitle1">Time: {time}</Typography>
          <Button variant="contained" color="secondary" onClick={start}>
            Start
          </Button>
        </Stack>
      </AppBar>
      <img src={plane} alt="plane" id="plane" className="left" />
    </Container>
  );
};

export default App;
