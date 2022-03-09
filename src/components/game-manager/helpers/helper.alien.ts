import debounce from "lodash.debounce";
import { DebouncedFunc } from "lodash";
import { Direction, ISoundManager } from "types";
import { playSound } from "utils";

let debouncedShooting: DebouncedFunc<() => void> | null = null;

export const handleShooting = (
  plane: HTMLImageElement,
  createFireball: Function,
  soundManager: ISoundManager
): void => {
  //prevents continous shooting by debouncing it 100ms
  if (!debouncedShooting) {
    debouncedShooting = debounce(() => {
      const planeCoords = plane?.getBoundingClientRect();
      const left = (planeCoords?.right || 0) - 50;
      const top = (planeCoords?.top || 0) + 20;
      createFireball(left, top);
      playSound(soundManager.scoreSoundControls);
    }, 100);
  }
  debouncedShooting();
};
