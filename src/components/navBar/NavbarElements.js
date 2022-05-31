import styled from "styled-components";
export const Tab = styled.button`
  position: static;
  left: 0%;
  right: 0%;
  top: calc(50% - 20px / 2 - 16px);
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  padding: 15px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;

  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid #5ECE7B;
    color:#5ECE7B;
    opacity: 1;
  `}
`;
export const LinkButton = styled.div`
  display: flex;
`;

export const Size = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 2px 0px 0px;
  background-color: white;
  box-sizing: border-box;

  border: 0.5px solid #1d1f22;

  ${({ activeSize }) =>
    activeSize &&
    `
background: #1D1F22;
border: 0.5px solid #1D1F22;
color: white;
  `}
`;
export const LinkButton2 = styled.div`
  display: flex;
`;
