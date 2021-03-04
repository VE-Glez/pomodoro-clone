import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import { Pomodoro, Slider } from "./components";
import { ThemeProvider } from "./context/themes/themes";
import { MenuViewProvider } from "./context/layout";
import { Globales } from "./globals";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <MenuViewProvider>
        <Globales />
        <Pomodoro />
      </MenuViewProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
