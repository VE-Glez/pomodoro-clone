import styled from "styled-components";
const track_height = 10;
const portion = 0.55;

const track = `
-webkit-appearance: none;
  height: ${track_height + track_height * portion}px;
`;

const thumb = `
-webkit-appearance: none;
height: ${track_height + track_height * portion}px;
width: ${track_height + track_height * portion}px;
border-radius: ${track_height / 1.5}px;

`;

export const InputRange = styled.input`
  -webkit-appearance: none;
  outline: none;
  margin: ${track_height * 0.5}px;
  height: ${track_height}px;
  width: 80%;
  background-color: #cdd7ee;
  border-radius: 10px;
  background-image: linear-gradient(
    90deg,
    ${({ color }) => color} ${({ percentage }) => percentage}%,
    rgb(234, 238, 251) ${({ percentage }) => percentage + 1}%
  );

  &::-webkit-slider-container {
    align-items: center;
  }
  &::-webkit-slider-runnable-track {
    ${track}
  }
  &::-moz-range-track {
    ${track}
  }
  &::-ms-track {
    ${track}
  }
  &::-webkit-slider-thumb {
    background: ${({ color }) => color};
    ${thumb}
  }
  &::-moz-range-thumb {
    ${thumb}
  }
  &::-ms-thumb {
    ${thumb}
  }
`;
