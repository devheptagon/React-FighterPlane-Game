export default class GameManager {
  parent: HTMLElement;
  plane: HTMLImageElement;
  playing: boolean = false;

  constructor(_parent: HTMLElement, _plane: HTMLImageElement) {
    this.parent = _parent;
    this.plane = _plane;
  }

  private timerTick(tickCallback: Function) {
    if (!this.playing) return;
    tickCallback();
    window.requestAnimationFrame(() => this.timerTick(tickCallback));
  }

  startTimer(tickCallback: Function) {
    this.playing = true;
    this.timerTick(tickCallback);
  }

  stopTimer() {
    this.playing = false;
  }
}
