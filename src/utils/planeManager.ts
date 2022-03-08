import { Direction } from "../types";

export default class PlaneManager {
  private board: HTMLElement;
  private plane: HTMLImageElement;
  private movingDirection: Direction = Direction.Right;
  private speed: number = 1;
  private fireballCounter: number = 0;

  constructor(_board: HTMLDivElement, _plane: HTMLImageElement) {
    this.board = _board;
    this.plane = _plane;
  }

  public move() {
    const planeCoords = this.plane.getBoundingClientRect();
    const containerCoords = this.board.getBoundingClientRect();
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

  public resetPosition() {
    const containerCoords = this.board.getBoundingClientRect();
    this.plane.style.left = Math.floor(containerCoords.right / 2) + "px";
  }

  public speedUp() {
    this.speed++;
  }

  public changeDirection(key: string) {
    this.movingDirection = key as Direction;
  }

  public shoot() {
    const planeCoords = this.plane.getBoundingClientRect();
    const el = document.createElement("div");
    el.id = "fireball" + this.fireballCounter++;
    el.classList.add("fire");
    el.style.left = (planeCoords?.right || 0) - 50 + "px";
    el.style.top = (planeCoords?.top || 0) + 10 + "px";
    this.board.appendChild(el);

    const moveUp = () => {
      const top = el.getBoundingClientRect()!.top || 0;
      if (top > 0) {
        el.style.top = top - 20 + "px";
        window.requestAnimationFrame(moveUp);
      } else {
        this.board.removeChild(el);
      }
    };
    moveUp();
  }
}
