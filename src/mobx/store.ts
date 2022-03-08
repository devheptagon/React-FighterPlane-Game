import { action, makeObservable, observable } from "mobx";
import { random } from "lodash";
import { GameState, IFireball, IStore } from "types";

class Store implements IStore {
  public score: number = 0;
  public elapsedTime: number = 0;
  public speed: number = 2;
  public gameState: GameState = GameState.NotStarted;
  public fireballs: IFireball[] = [];

  constructor() {
    makeObservable(this, {
      score: observable,
      elapsedTime: observable,
      gameState: observable,
      speed: observable,
      fireballs: observable,

      increaseScore: action,
      increaseTime: action,
      updateGameState: action,
      createFireball: action,
      destroyFireball: action,
    });
  }

  public increaseScore = (): void => {
    this.score += 100;
    if (this.score % 200 === 0) this.increaseSpeed();
    if (this.score >= 5000) this.updateGameState(GameState.Won);
  };

  public increaseTime = (): void => {
    this.elapsedTime += 1;
    if (this.elapsedTime >= 600) this.updateGameState(GameState.Failed);
  };

  public increaseSpeed = (): void => {
    this.speed += 1;
  };

  public updateGameState = (newState: GameState): void => {
    this.gameState = newState;
  };

  public createFireball = (left: number, top: number): void => {
    const fireball: IFireball = {
      id: "fireball_" + this.fireballs.length + random(100, 9999),
      left,
      top,
    };
    this.fireballs.push(fireball);
  };

  public destroyFireball = (id: string): void => {
    this.fireballs = this.fireballs.filter((el) => el.id !== id);
  };
}

const store: IStore = new Store();
export default store;
