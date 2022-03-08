import { useEffect } from "react";

const useEventListeners = (onKeyDown: any, onScore: any, onFail: any) => {
  useEffect(() => {
    const resizeHandler = () => {
      console.log("resized");
      window.location.reload();
    };
    window.addEventListener("resize", resizeHandler);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("score", onScore);
    document.addEventListener("fail", onFail);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("score", onScore);
      document.removeEventListener("fail", onFail);
    };
  }, [onKeyDown, onScore, onFail]);
};

export default useEventListeners;
