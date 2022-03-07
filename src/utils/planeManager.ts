import { Direction } from "../types";

export default class PlaneManager {
  container: HTMLElement;
  plane: HTMLImageElement;
  movingDirection: Direction = Direction.Right;
  speed: number = 1;

  constructor(_container: HTMLElement, _plane: HTMLImageElement) {
    this.container = _container;
    this.plane = _plane;
  }

  changeDirection(key: string) {
    this.movingDirection = key as Direction;
  }

  move() {
    const planeCoords = this.plane.getBoundingClientRect();
    const containerCoords = this.container.getBoundingClientRect();
    if (
      planeCoords.left <= containerCoords.left ||
      planeCoords.right >= containerCoords.right
    ) {
      this.changeDirection(
        this.movingDirection === Direction.Left
          ? Direction.Right
          : Direction.Left
      );
    }

    const incrementer =
      this.movingDirection === Direction.Left ? -this.speed : +this.speed;
    this.plane.style.left = planeCoords.left + incrementer + "px";
  }

  speedUp() {
    this.speed++;
  }
}
