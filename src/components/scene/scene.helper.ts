import { IGameManager } from "types";

export const handleLevelIncrease = (gameManager?: IGameManager) => {
  gameManager?.increaseLevel();
};

export const handleGameWin = (gameManager?: IGameManager) => {
  gameManager?.stopGame(false);
  alert("You won!");
  window.location.reload();
};

export const handleFail = (gameManager?: IGameManager) => {
  gameManager?.stopGame(true);
  alert("You Failed");
  window.location.reload();
};

export const handleStart = (gameManager?: IGameManager) => {
  gameManager?.startGame();
};
