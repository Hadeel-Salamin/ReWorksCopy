import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: space-between;
`;

export const StyledHeader = styled.h1`
  font-size: 20px;
  background-color: #fafafa;
  padding: 22px 0px;
  text-align: left;
  text-indent: 20px;
  @media (max-width: 650px) {
    font-size: 16px;
  }
`;

export const StyledBottom = styled.form`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  color: #1ed390;
  margin-left: 15px;
  text-decoration: none;
`;

<<<<<<< HEAD
export const StyledCSVLink = styled(CSVLink)`
  display:flex;
  justify-content:center;
  background-color:#1ED390;
  padding: 20px 0px;
  width:45%;
  margin-left:28%;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  color: white;
`
=======
export const GButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
>>>>>>> master
