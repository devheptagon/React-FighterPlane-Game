import { Direction } from "../types";
import PlaneManager from "./planeManager";

export default class GameManager {
  planeManager: PlaneManager;
  playing: boolean = false;
  keyboardListener: (this: Document, ev: KeyboardEvent) => any;

  constructor(container: HTMLElement, plane: HTMLImageElement) {
    this.planeManager = new PlaneManager(container, plane);

    this.keyboardListener = (e: KeyboardEvent) => {
      this.handleKeyDown(e.key);
    };
    document.addEventListener("keydown", this.keyboardListener);
  }

  deconstructor() {
    document.removeEventListener("keydown", this.keyboardListener);
  }

  private timerTick() {
    if (!this.playing) return;
    this.move();
    window.requestAnimationFrame(this.timerTick.bind(this));
  }

  startTimer() {
    this.playing = true;
    this.timerTick();
  }

  stopTimer() {
    this.playing = false;
  }

  handleKeyDown(key: string) {
    if (!this.playing) return;
    if ([Direction.Left, Direction.Right].includes(key as Direction))
      this.planeManager.changeDirection(key);
    else if (key === Direction.Up) this.planeManager.speedUp();
  }

  move() {
    if (!this.playing) return;
    this.planeManager.move();
  }
}
