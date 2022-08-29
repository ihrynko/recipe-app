import { Typography } from "@mui/material";

import page404 from "../../assets/page404.jpeg";
import {
  StyledContainer,
  StyledImage,
  StyledTypography,
  StyledWrapper,
  StyledButton,
  StyledParagraph,
  StyledLink,
} from "./styled";

const Page404 = () => {
  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTypography variant="h1">4</StyledTypography>
        <StyledImage src={page404} alt="not found" />
        <StyledTypography variant="h1">4</StyledTypography>
      </StyledWrapper>
      <Typography variant="h5">Whoops!</Typography>
      <StyledParagraph paragraph>
        It seems like we couldn't find the page you were looking for
      </StyledParagraph>

      <StyledButton variant="contained">
        <StyledLink to="/">Go Back Home</StyledLink>
      </StyledButton>
    </StyledContainer>
  );
};

export default Page404;
