import { FC, useEffect } from "react";
import planeSound from "assets/plane.ogg";
import shootingSound from "assets/shoot.ogg";
import failSound from "assets/crash.ogg";
import successSound from "assets/success.ogg";
import { ISoundManager, IGameManager } from "types";
import { useAudio } from "utils/useAudio";

const AudioControls: FC<{ gameManager?: IGameManager }> = (props) => {
  const planeSoundControls = useAudio(planeSound, true);
  const scoreSoundControls = useAudio(shootingSound, false);
  const failSoundControls = useAudio(failSound, false);
  const winSoundControls = useAudio(successSound, false);

  useEffect(() => {
    const soundManager: ISoundManager = {
      planeSoundControls,
      scoreSoundControls,
      failSoundControls,
      winSoundControls,
    };

    props.gameManager?.loadSoundControls(soundManager);
  }, [
    props.gameManager,
    planeSoundControls,
    scoreSoundControls,
    failSoundControls,
    winSoundControls,
  ]);

  return null;
};

export default AudioControls;
