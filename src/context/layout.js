import { layout } from "./types";
import { createContext, useReducer } from "react";
const selectView = (state, action) => {
  console.log(action.type);
  console.log(state);
  switch (action.type) {
    case layout.timer_settings:
      return "-300px";
    case layout.app_settings:
      return "-300px";
    case layout.theme_settings:
      return "-600px";
    case layout.about:
      return "-900px";
    default:
      return 0;
  }
};

export const MenuActualView = createContext(null);

export const MenuViewProvider = ({ children }) => {
  const [myView, dispatch] = useReducer(selectView, "0");
  return (
    <MenuActualView.Provider value={{ myView, dispatch }}>
      {children}
    </MenuActualView.Provider>
  );
};
