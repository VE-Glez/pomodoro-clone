import { createContext, useReducer } from "react";
import { DARK_THEME, LIGHT_THEME } from "../types";

//creating the context
export const AllThemes = createContext();
//definning all themes
const themes = {
  dark: {
    title: "Dark theme",
    color_text: "rgba(255,255,255,1)",
    color_background: "rgba(47,56,80,1)",
    color_background_hidden_menu: "rgba(60,67,86,1)",
    color_title: "rgba(5,235,139,1)",
    color_short_break: "rgba(5,235,139,1)",
    color_long_break: "rgba(11,188,218,1)",
    color_timer: "rgba(254,77,76,1)",
    color_icons: "rgba(155,164,180,1)",
    color_rounds: "rgba(155,164,180,1)", //para el slider rondas
    color_button_hover: "rgba(155,164,180,0.4)", // para el hover de los settings
  },
  light: {
    title: "Light theme",
    color_background: "rgba(255,255,255,1)",
    color_text: "rgba(47,56,80,1)",
    color_background_hidden_menu: "rgba(240,240,240,1)",
    color_title: "rgba(5,235,139,1)",
    color_short_break: "rgba(5,235,139,1)",
    color_long_break: "rgba(11,188,218,1)",
    color_timer: "rgba(254,77,76,1)",
    color_icons: "rgba(155,164,180,1)",
    color_rounds: "rgba(155,164,180,1)", //para el slider rondas
    color_button_hover: "rgba(155,164,180,0.4)", // para el hover de los settings
  },
};
//creating the reducer to change between themes
const themeReducer = (state, action) => {
  switch (action.type) {
    case DARK_THEME:
      return themes.dark;
    case LIGHT_THEME:
      return themes.light;
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  //create the state that contains the color of actual theme selected
  const [myTheme, dispatch] = useReducer(themeReducer, themes.dark);

  //change the actual theme selected
  const getDark = () => dispatch({ type: DARK_THEME });
  const getLight = () => dispatch({ type: LIGHT_THEME });
  return (
    <AllThemes.Provider value={{ myTheme, getDark, getLight }}>
      {children}
    </AllThemes.Provider>
  );
};
