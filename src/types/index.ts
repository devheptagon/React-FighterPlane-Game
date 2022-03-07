export enum Direction {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
}

export interface ISettings {
  BoxesPerRow: number;
  BoxSize: number;
  ElapsedTime: number;
  Timer: object | null;
  CurrentDirection: Direction;
  SnakeCells: string[];
  EmptyCells: string[];
  AllCells: string[];
  InvalidLefts: string[];
  InvalidRights: string[];
  FruitCell: object | null;
  IsGameOver: boolean;
  EnlargeSnake: boolean;
}

export const InitialSettings: ISettings = {
  BoxesPerRow: 10,
  BoxSize: 30,
  ElapsedTime: 0,
  Timer: null,
  CurrentDirection: Direction.ArrowRight,
  SnakeCells: [],
  EmptyCells: [],
  AllCells: [],
  InvalidLefts: [],
  InvalidRights: [],
  FruitCell: null,
  IsGameOver: false,
  EnlargeSnake: false,
};

export const Messages = {
  InvalidBoxCountWarning: "Please check configuration, box count must >= 8",
  GameOverWarning: "Game Over",
  WinText: "You win!",
};
