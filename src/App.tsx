import { FC } from "react";
import { Container } from "@mui/material";
import Scene from "components/scene/Scene";

const App: FC = () => {
  return (
    <Container id="gameBoard">
      <Scene />
    </Container>
  );
};

export default App;
