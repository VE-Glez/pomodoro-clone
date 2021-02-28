import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Pomodoro, Slider } from "./components";
import { ThemeProvider } from "./context/themes/themes";
import { MenuViewProvider } from "./context/layout";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <MenuViewProvider>
        <Pomodoro />
      </MenuViewProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
