import styled from 'styled-components';
import { NavLink } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  padding-right: 30px;
  padding-left: 30px;
  border-bottom: 2px solid #2f303a;
`;


export const StyledLogo = styled(NavLink)`
    font-family: 'DynaPuff', cursive;
    line-height: 60px;
    font-size: 70px;
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #2f303a;
`;