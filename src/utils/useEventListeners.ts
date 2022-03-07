import { useEffect } from "react";

const useEventListeners = (onScore: any, onFail: any) => {
  useEffect(() => {
    const resizeHandler = () => {
      console.log("resized");
      window.location.reload();
    };
    window.addEventListener("resize", resizeHandler);
    document.addEventListener("score", onScore);
    document.addEventListener("fail", onFail);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("score", onScore);
      document.removeEventListener("fail", onFail);
    };
  }, [onScore, onFail]);
};

export default useEventListeners;
