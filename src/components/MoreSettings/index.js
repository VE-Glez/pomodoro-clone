import { AiOutlineClockCircle, AiOutlineMore } from "react-icons/ai";
import { IoMdSettings, IoMdColorPalette } from "react-icons/io";
import styled from "styled-components";
import { useContext } from "react";
import { MenuActualView } from "../../context/layout";
import { layout } from "../../context/types";

const Menu = styled.div`
  display: flex;
  min-width: 300px;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  right: ${({ click }) => (click ? 0 : "300px")};
  background-color: ${({ theme }) => theme.color_background_hidden_menu};

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

const MoreSettings = ({ click, theme }) => {
  const { dispatch } = useContext(MenuActualView);
  return (
    <Menu click={click} theme={theme}>
      <div onClick={() => dispatch({ type: "" })}>
        <AiOutlineClockCircle />
      </div>
      <div onClick={() => dispatch({ type: layout.app_settings })}>
        <IoMdSettings />
      </div>
      <div onClick={() => dispatch({ type: layout.theme_settings })}>
        <IoMdColorPalette />
      </div>
      <div onClick={() => dispatch({ type: layout.about })}>
        <AiOutlineMore />
      </div>
    </Menu>
  );
};

export default MoreSettings;
