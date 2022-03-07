import {
  Direction,
  ISoundManager,
  IGameManager,
  IPlaneManager,
} from "../types";
import PlaneManager from "./planeManager";

export default class GameManager implements IGameManager {
  private planeManager: IPlaneManager;
  private playing: boolean = false;
  private scoreEvent = new Event("score");
  private failEvent = new Event("fail");
  private soundManager: ISoundManager = {};
  private keyboardListener: any;

  constructor(board: HTMLDivElement, plane: HTMLImageElement) {
    this.planeManager = new PlaneManager(board, plane);
    this.addKeyboardListener();
  }

  public startGame() {
    this.startTimer();
  }

  public stopGame(isFail: boolean) {
    this.stopTimer();
    this.stopSound(this.soundManager.planeSoundControls);
    this.planeManager.resetPosition();
    this.removeKeyboardListener();

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

  private handleKeyDown(key: string) {
    if (!this.playing) return;
    if ([Direction.Left, Direction.Right].includes(key as Direction))
      this.planeManager.changeDirection(key);
    else if (key === Direction.Up) this.shoot();
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

  private addKeyboardListener() {
    this.keyboardListener = (e: KeyboardEvent) => {
      this.handleKeyDown(e.key);
    };
    document.addEventListener("keydown", this.keyboardListener);
  }

  private removeKeyboardListener() {
    document.removeEventListener("keydown", this.keyboardListener);
  }

  private shoot() {
    this.planeManager.shoot();
    this.playSound(this.soundManager.scoreSoundControls);
  }
}
