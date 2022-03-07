export enum Direction {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

export interface ISettings {
  ElapsedTime: number;
  CurrentDirection: Direction;
  GameOver: boolean;
}

export const InitialSettings: ISettings = {
  ElapsedTime: 0,
  CurrentDirection: Direction.ArrowRight,
  GameOver: false,
};

export const Messages = {
  GameOverText: "Game Over!",
  WinText: "You won!",
};
