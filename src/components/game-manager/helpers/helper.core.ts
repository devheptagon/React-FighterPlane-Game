import { GameState, ISoundManager } from "types";
import { showAlert, playSound, stopSound } from "utils";

export const handleGameStart = (
  board: HTMLDivElement,
  startTimer: Function,
  soundManager: ISoundManager
): void => {
  //background slides down to achieve perception of movement
  board?.classList.add("movingBackground");
  startTimer();
  playSound(soundManager.planeSoundControls);
};

export const handleGameStop = (
  board: HTMLDivElement,
  gameState: GameState,
  soundManager: ISoundManager
): void => {
  if (!board || !soundManager) return;

  //background slide needs to stop when game stops
  board.classList.remove("movingBackground");

  //play appropriate sound depending on GameState and stop background plane propeller sound
  stopSound(soundManager.planeSoundControls);
  if (gameState === GameState.Failed) {
    playSound(soundManager.failSoundControls);
    showAlert(gameState);
  } else if (gameState === GameState.Won) {
    playSound(soundManager.winSoundControls);
    showAlert(gameState);
  }
};
