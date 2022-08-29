import { styled as styles } from "@mui/material/styles";
import { Container, Button, Box, Tab } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styles(Container)`

margin-top:50px
`;
export const StyledBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 15px;
`;

export const StyledList = styled.ul`
  column-count: 2;
  column-gap: 30px;
`;

export const StyledIngredients = styled.li`
  color: rgb(68, 68, 68);
`;

export const StyledItem = styled.li`
  color: rgb(68, 68, 68);
  margin-left: 15px;
`;

export const StyledButton = styles(Button)`
color: #E35640;
&:hover,
&:focus
{
     text-decoration: underline;
  }
`;

export const StyledTabs = styles(Tab)`
&:hover,
&:focus
{
     color: #E35640;
  }
`;

export const StyledTitle = styled.h1`
  font-family: "EB Garamond";
  margin-left: 12px;
`;

export const StyledWrapperContent = styles(Box)`
margin-left: 40px;
`;
export const StyledContent = styled.div`
  display: flex;
`;

export const StyledWrapperTabs = styles(Box)`
margin: 0 auto;

`;
