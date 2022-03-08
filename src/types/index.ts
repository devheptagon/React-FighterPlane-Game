export enum Direction {
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Up = "ArrowUp",
  Down = "ArrowDown",
}

export enum GameState {
  Playing = "Playing",
  NotPlaying = "NotPlaying",
}

export interface ISoundManager {
  planeSoundControls?: Function[];
  scoreSoundControls?: Function[];
  failSoundControls?: Function[];
  winSoundControls?: Function[];
}

export interface IGameManager {
  loadSoundControls(soundManager: ISoundManager): void;
  startGame(): void;
  stopGame(isFail: boolean): void;
  increaseLevel(): void;
  handleKeyDown(key: string): void;
}

export interface IPlaneManager {
  move(): void;
  resetPosition(): void;
  speedUp(): void;
  changeDirection(key: string): void;
  shoot(): void;
}
