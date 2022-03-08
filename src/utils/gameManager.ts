import {
  Direction,
  ISoundManager,
  IGameManager,
  IPlaneManager,
} from "../types";
import PlaneManager from "./planeManager";

export default class GameManager implements IGameManager {
  private board: HTMLDivElement;
  private planeManager: IPlaneManager;
  private playing: boolean = false;
  private scoreEvent = new Event("score");
  private failEvent = new Event("fail");
  private soundManager: ISoundManager = {};

  constructor(_board: HTMLDivElement, _plane: HTMLImageElement) {
    this.board = _board;
    this.planeManager = new PlaneManager(_board, _plane);
  }

  public startGame() {
    this.board.classList.add("movingBackground");
    this.startTimer();
  }

  public stopGame(isFail: boolean) {
    this.board.classList.remove("movingBackground");
    this.stopTimer();
    this.stopSound(this.soundManager.planeSoundControls);
    this.planeManager.resetPosition();

    if (isFail) {
      this.playSound(this.soundManager.failSoundControls);
    } else {
      this.playSound(this.soundManager.winSoundControls);
    }
  }

  public loadSoundControls(_soundManager: ISoundManager) {
    this.soundManager = _soundManager;
    if (this.playing && this.soundManager.planeSoundControls?.length) {
      const [playPlaneSound] = this.soundManager.planeSoundControls;
      playPlaneSound();
    }
  }

  public increaseLevel(): void {
    this.planeManager.speedUp();
  }

  public handleKeyDown(key: string) {
    if (!this.playing) return;
    if ([Direction.Left, Direction.Right].includes(key as Direction))
      this.planeManager.changeDirection(key);
    else if (key === Direction.Up) this.shoot();
  }

  private checkForScore() {
    document.dispatchEvent(this.scoreEvent);
  }

  private checkForFail() {
    document.dispatchEvent(this.failEvent);
  }

  private timerTick() {
    if (!this.playing) return;
    this.move();
    window.requestAnimationFrame(this.timerTick.bind(this));
  }

  private startTimer() {
    this.playing = true;
    this.timerTick();
  }

  private stopTimer() {
    this.playing = false;
  }

  private move() {
    if (!this.playing) return;
    this.planeManager.move();
  }

  private playSound(soundControls?: Function[]) {
    if (soundControls && soundControls.length) {
      const [play] = soundControls;
      play();
    }
  }

  private stopSound(soundControls?: Function[]) {
    if (soundControls && soundControls.length) {
      const [play, stop] = soundControls;
      stop();
    }
  }

  private shoot() {
    this.planeManager.shoot();
    this.playSound(this.soundManager.scoreSoundControls);
  }
}
