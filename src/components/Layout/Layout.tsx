import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loader from "../Loader";
import { StyledHeader, StyledLogo } from "./styled";

export default function Layout() {
  return (
    <div>
      <StyledHeader>
        <StyledLogo to="/">Cook Book</StyledLogo>
      </StyledHeader>
      <div>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
