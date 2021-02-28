import { WrapperInput, Label, Time } from "./styles";
import { Slider } from "../index";
import { Children } from "react";

const TimeSettings = ({ children, title = "Title", defaultTime = "00:00" }) => {
  return (
    <WrapperInput>
      <Label>{title}</Label>
      <Time>{defaultTime}</Time>
      {children}
    </WrapperInput>
  );
};

export default TimeSettings;

{
  /* <label htmlFor="short-break">
        <p>Descanso corto</p>
        <p>5:00</p>
        <input type="range" name="short-break" id="short-break" />
      </label>
      <label htmlFor="large-break">
        <p>Descanso largo</p>
        <p>15:00</p>
        <input type="range" name="large-break" id="large-break" />
      </label>
      <label htmlFor="round">
        <p>Rounds</p>
        <p>4</p>
        <input type="range" name="rounds" id="rounds" />
      </label> */
}
