import { createGlobalStyle } from "styled-components";

export const Globales = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap");

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #115277;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

* {
  box-sizing: border-box;
}

ul, li {
  padding:0;
  margin: 0;
  list-style: none;
  width: 100%;
}

a, a:visited {
  text-decoration: none;
  color: lightblue;
  cursor: pointer;
}

`;
