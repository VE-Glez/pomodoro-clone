import react, { createContext } from "react";

const AllThemes = createContext();

const temas = {
  dark: {
    color_background: "#743021",
  },
};

const ThemeProvider = ({ childrens }) => {
  return <AllThemes.Provider value={temas}>{childrens}</AllThemes.Provider>;
};
