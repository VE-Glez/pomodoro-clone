import styled from "styled-components";

const color_red = "rgba(254,77,76,1)";
const color_background = "rgb(47,56,80)";
const color_green = "rgba(10,210,130,1)";
const color_icons = "155,164,180";

export const PomodoroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 300px;
  min-height: 250px;
  position: relative;
  overflow: hidden;
  border: 1px solid black;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color_text};
  background-color: ${({ theme }) => theme.color_background};
`;

export const PomodoroHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0 25px;
  width: 100%;
  transition: ease all 1s;
  * {
    margin: 0;
  }
  h2 {
    color: ${({ theme }) => theme.color_title};
    font-size: 1rem;
  }

  svg {
    transition: 0.5s all ease;
    &:hover {
      color: ${({ theme }) => theme.color_title};
    }

    /* &:last-child {
      font-size: 24px;
    } */
  }
`;

export const Menu = styled.div`
  transition: all ease 1s;
  position: relative;
`;

export const HiddenMenu = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color_background_hidden_menu};
  position: absolute;
  top: 60px;
  bottom: 30px;
  left: ${({ clicked }) =>
    clicked ? ({ actualPosition }) => actualPosition : "300px"};
  z-index: 2;

  .settings {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 300px;
    max-height: 400px;
    padding: 0 10px;
    overflow-y: scroll;
  }
`;

export const Clock = styled.div.attrs((props) => ({ avanzado: props.valor }))`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  padding: 10px;
  background-color: ${({ theme }) => theme.color_timer};

  .elements-wrapper {
    width: 100%;
    height: 230px;
    border-radius: 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.color_background};

    * {
      /* border: 1px solid yellow; */
      /* padding: 0; */
      margin: 25px 0 0px;
    }
  }
`;

export const CountDown = styled.p`
  font-size: 3.2rem;
  font-family: "Oxygen Mono", monospace;
`;

//start the start/stop button
export const Control = styled.div`
  cursor: pointer;
  width: 75px;
  height: 75px;
  margin: 15px 0;
  border: 3px solid ${({ theme }) => theme.color_icons};
  border-radius: 45px;
  position: relative;
  transition: all ease 0.5s;

  &:hover {
    background-color: ${({ theme }) => theme.color_button_hover};
    svg {
      color: ${({ theme }) => theme.color_title};
      transition: all ease 0.5s;
    }
  }

  svg {
    position: absolute;
    top: calc(50% - 12px);
    left: calc(50% - 12px);
  }
`;

export const PomodoroFooter = styled.div`
  display: flex;
  justify-self: flex-end;
  justify-content: space-between;
  align-items: flex-end;
  height: auto;
  width: 100%;
  font-size: 1.2rem;

  .lap * {
    margin: 1px 0;
    padding: 0;
  }

  .lap button {
    background-color: transparent;
    border: none;
    transition: 0.5 ease all;
    color: ${({ theme }) => theme.color_text};

    &:hover {
      color: ${({ theme }) => theme.color_short_break};
    }
  }

  .secondaryControls * {
    margin: 0 0 0 10px;

    &:hover {
      color: ${({ theme }) => theme.color_short_break};
    }
  }
`;
