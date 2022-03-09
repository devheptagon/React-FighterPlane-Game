import { action, makeObservable, observable } from "mobx";
import { random } from "lodash";
import { GameState, IAlien, IFireball, IMovingObject, IStore } from "types";

class Store implements IStore {
  public score: number = 0;
  public elapsedTime: number = 0;
  public speed: number = 2;
  public gameState: GameState = GameState.NotStarted;
  public fireballs: IFireball[] = [];
  public aliens: IAlien[] = [];

  constructor() {
    makeObservable(this, {
      score: observable,
      elapsedTime: observable,
      gameState: observable,
      speed: observable,
      fireballs: observable,
      aliens: observable,

      increaseScore: action,
      increaseTime: action,
      updateGameState: action,
      createFireball: action,
      destroyFireball: action,
      createAlien: action,
      destroyAlien: action,
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
    this.createMovingObject("fireball_", this.fireballs, left, top);
  };

  public destroyFireball = (id: string): void => {
    this.fireballs = this.destroyMovingObject(id, this.fireballs);
  };

  public createAlien = (left: number, top: number): void => {
    this.createMovingObject("alien_", this.aliens, left, top);
  };

  public destroyAlien = (id: string): void => {
    this.aliens = this.destroyMovingObject(id, this.aliens);
  };

  private createMovingObject = (
    prefix: string,
    container: IMovingObject[],
    left: number,
    top: number
  ) => {
    const movingObject: IMovingObject = {
      id: prefix + container.length + random(100, 9999),
      left,
      top,
    };
    container.push(movingObject);
  };

  private destroyMovingObject = (id: string, container: IMovingObject[]) => {
    return container.filter((el) => el.id !== id);
  };
}

const store: IStore = new Store();
export default store;
