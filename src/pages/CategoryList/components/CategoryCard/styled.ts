import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  color: #e35640;
  &:hover,
  &:focus {
    color: #e35640;
  }
`;

export const StyledCardHeader = styled.h3`
  font-family: "EB Garamond";
`;

export const StyledWrapper = styled.div`
  .error {
    width: 100%;
  }
`;
