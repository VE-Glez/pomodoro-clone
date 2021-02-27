import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { InputRange } from "./styles";

const Slider = ({ id, min = 0, max = 100, step = 1, color = "purple" }) => {
  const initialValue = max / 4;
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
      type="range"
      min={minValue}
      max={maxValue}
      step={istep}
      // value={initialValue}
      value={rangeValue}
      name={id}
      id={id}
      color={color}
    />
  );
};

Slider.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Slider;
