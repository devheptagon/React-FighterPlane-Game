export enum Direction {
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Up = "ArrowUp",
  Down = "ArrowDown",
}

export enum GameState {
  NotStarted = "NotStarted",
  Playing = "Playing",
  Failed = "Failed",
  Won = "Won",
}

export interface ISoundManager {
  planeSoundControls?: Function[];
  scoreSoundControls?: Function[];
  failSoundControls?: Function[];
  winSoundControls?: Function[];
}

export interface IStore {
  score: number;
  elapsedTime: number;
  speed: number;
  gameState: GameState;
  fireballs: IFireball[];
  aliens: IAlien[];
  increaseScore(): void;
  increaseTime(): void;
  updateGameState(newState: GameState): void;
  createFireball(left: number, top: number): void;
  destroyFireball(id: string): void;
  createAlien(left: number, top: number): void;
  destroyAlien(id: string): void;
}

export interface IMovingObject {
  id: string;
  left: number;
  top: number;
}

export interface IFireball extends IMovingObject {}

export interface IAlien extends IMovingObject {}
