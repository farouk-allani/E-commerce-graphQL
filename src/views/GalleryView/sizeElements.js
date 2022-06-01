import styled from 'styled-components';
 export const Size = styled.button`
 cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 7px 0px 0px;
    background-color: white;
box-sizing: border-box;
width: 63px;
height: 45px;
border: 1px solid #1D1F22;

  
  ${({ activeSize }) =>
    activeSize &&
    `
background: #1D1F22;
border: 1px solid #1D1F22;
color: white;
  `}
`;
export const LinkButton = styled.div`
  display: flex;
`;