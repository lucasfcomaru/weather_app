import { useState } from "react";
import Paths from "./routes/Paths";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Paths />
    </>
  );
}

export default App;
