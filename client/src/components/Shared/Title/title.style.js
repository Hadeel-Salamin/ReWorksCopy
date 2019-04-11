import styled from 'styled-components';

export const StyledTitle = styled.h1`
  font-size: 34px;
  font-family:'Kaushan Script';
  text-align:center;
  font-weight: normal;

  @media (max-width: 650px) {
    font-size: 30px;
  }
`;

export const LogoutB = styled.h1`
  position:absolute;
  top:30px;
  right:30px;
  font-weight: normal;
  font-size: 12px;

  @media (min-width: 650px) {
    font-size: 16px;
    margin-right: 34%; 

  }
`;
