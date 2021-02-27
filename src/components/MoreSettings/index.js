import { AiOutlineClockCircle, AiOutlineMore } from "react-icons/ai";
import { IoMdSettings, IoMdColorPalette } from "react-icons/io";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  div {
    width: 25%;
    text-align: center;

    &:hover {
      background: rgba(120, 120, 120, 0.5);
    }

    svg {
      border-bottom: 2px solid rgba(10, 210, 130, 1);
      text-align: center;
    }
  }
`;

const MoreSettings = () => {
  return (
    <Menu>
      <div>
        <AiOutlineClockCircle />
      </div>
      <div>
        <IoMdSettings />
      </div>
      <div>
        <IoMdColorPalette />
      </div>
      <div>
        <AiOutlineMore />
      </div>
    </Menu>
  );
};

export default MoreSettings;
