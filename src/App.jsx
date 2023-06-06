import { useState } from "react";

import Board from "./components/Board";
import Providers from "./components/Providers";
import Router from "./Router";
import "./App.css";

function App() {
  const style = {
    background:
      "linear-gradient(135deg, rgba(34,253,197,1) 10%, rgba(215,57,71,1) 90%)",
    backgroundColor: "#000",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    width: "100%",
    height: "calc(100vh)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style}>
      <Providers>
        <Router />
      </Providers>
    </div>
  );
}

export default App;
