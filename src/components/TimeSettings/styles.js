import styled from "styled-components";

export const WrapperInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

//CHECAR @INCLUDE DE ARRIBA 4
//NECESITO VERIFICAR COMO INTEGRAR MIXINS
//DENTRO DE LOS STYLED COMPONENTS
export const Label = styled.label`
  font-size: 1.2rem;
  color: ${({ color }) => color};
`;

export const Time = styled.samp`
  display: block;
  background-color: #5a5a5a;
  color: #d2d2d2;
  margin: 4px 0;
`;
