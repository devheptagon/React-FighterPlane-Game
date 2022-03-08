import { forwardRef } from "react";
import planeImage from "assets/plane.png";

const Plane = forwardRef<HTMLImageElement>((_, ref) => {
  return <img id="plane" ref={ref} src={planeImage} alt="plane" />;
});

export default Plane;
