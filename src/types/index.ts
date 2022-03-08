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
  increaseScore(): void;
  increaseTime(): void;
  updateGameState(newState: GameState): void;
  createFireball(left: number, top: number): void;
  destroyFireball(id: string): void;
}

export interface IFireball {
  id: string;
  left: number;
  top: number;
}
