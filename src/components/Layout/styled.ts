import styled from "styled-components";
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
  font-family: "DynaPuff", cursive;
  font-size: 45px;
  line-height: 1.62;
  @media screen and (min-width: 768px) {
    font-size: 70px;
    line-height: 1.36;
  }

  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #2f303a;
`;
