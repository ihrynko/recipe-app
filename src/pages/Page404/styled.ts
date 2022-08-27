import { Container, styled, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledImage = styled("img")`
  height: 100px;
  margin-bottom: 10px;
`;

export const StyledTypography = styled(Typography)`
  font-weight: 400;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  margin-bottom: 50px;
  border: 1px solid #e35640;
  background-color: #e35640;
  &:hover,
  &:focus {
    border: 1px solid #ffffff;
    background-color: #ffffff;
  }
`;

export const StyledParagraph = styled(Typography)`
  margin-top: 15px;
`;

export const StyledLink = styled(Link)`
  color: #ffffff;
  &:hover,
  &:focus {
    color: #e35640;
  }
`;
