import { Outlet } from "react-router-dom";
import { StyledHeader, StyledLogo } from "./styled";

export default function Header() {
  return (
    <div>
      <StyledHeader>
        <StyledLogo to="/">Cook Book</StyledLogo>
      </StyledHeader>
      <Outlet />
    </div>
  );
}
