import { useState } from "react";
import { Option } from "./styles";

const MySwitch = ({ text = "Auto start demo", handleInput }) => {
  const [checked, setChecked] = useState(true);
  return (
    <Option>
      {text}
      <input
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
        type="checkbox"
        onInput={handleInput}
      />
    </Option>
  );
};

export default MySwitch;
