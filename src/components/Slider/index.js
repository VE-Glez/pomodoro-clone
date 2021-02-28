// import PropTypes from "prop-types";
import { useState } from "react";
import { InputRange } from "./styles";

const Slider = ({
  //no creo que necesite ID y si lo necesita entonces isRequired
  name,
  onInput,
  min = 0,
  max = 100,
  step = 1,
  initial = max / step,
  color = "purple",
}) => {
  const initialValue = initial;
  const [rangeValue, setRangeValue] = useState(initialValue);
  const minValue = min;
  const maxValue = max;
  const istep = step;
  let percentage =
    ((rangeValue - minValue) * (100 / istep)) / ((maxValue - minValue) / istep);

  const handleChange = (e) => {
    setRangeValue(e.target.value);
  };

  return (
    <InputRange
      percentage={percentage}
      onChange={handleChange}
      onInput={onInput}
      type="range"
      min={minValue}
      max={maxValue}
      step={istep}
      // value={initialValue}
      value={rangeValue}
      color={color}
      name={name}
    />
  );
};

// Slider.propTypes = {
//   id: PropTypes.string.isRequired,
// };

export default Slider;
