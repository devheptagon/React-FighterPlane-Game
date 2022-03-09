import { forwardRef } from "react";
import planeImage from "assets/plane.png";
import styles from "./Plane.module.scss";

const Plane = forwardRef<HTMLImageElement>((_, ref) => {
  return (
    <img
      id="plane"
      className={styles.plane}
      ref={ref}
      src={planeImage}
      alt="plane"
    />
  );
});

export default Plane;
