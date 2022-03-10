import { useEffect } from "react";

const useEventListeners = (onKeyDown: any): void => {
  useEffect(() => {
    const resizeHandler = () => {
      window.location.reload();
    };
    window.addEventListener("resize", resizeHandler);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};

export default useEventListeners;
