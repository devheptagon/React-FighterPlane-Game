import { FC, MouseEventHandler, useEffect, useState } from "react";
import { Typography, Button, Stack, AppBar } from "@mui/material";

interface ScoreBoardProps {
  score: number;
  isPlaying: boolean;
  onStart: MouseEventHandler<HTMLButtonElement>;
}

const ScoreBoard: FC<ScoreBoardProps> = (props) => {
  const { score, isPlaying, onStart } = props;
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer: number = 0;
    if (props.isPlaying) {
      if (!timer) {
        timer = window.setInterval(() => setElapsedTime(elapsedTime + 1), 1000);
      }
    } else {
      clearInterval(timer);
      setElapsedTime(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [elapsedTime, props.isPlaying]);

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
          Score: <span className="score">{score}</span> pts
        </Typography>
        <Typography variant="subtitle1">
          Time: <span className="score">{elapsedTime}</span> sec
        </Typography>
        {isPlaying ? (
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
};

export default ScoreBoard;
