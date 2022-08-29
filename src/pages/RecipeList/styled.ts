import { styled as styles } from "@mui/material/styles";
import { Container, Card, Typography, Box, Button } from "@mui/material";
import styled from "styled-components";

export const StyledContainer = styles(Container)`
margin-top:50px
`;
export const StyledBox = styles(Box)`
display: flex;
margin-bottom: 30px;
`;

export const StyledBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const StyledTypography = styles(Typography)`
font-family: 'Raleway', italic;
color: #E35640;
text-transform: uppercase;
margin:0 auto;
`;

export const StyledButton = styles(Button)`
margin-bottom: 50px;
color: #ffffff;
border: 1px solid #2f303a;
background-color: #2f303a;
&:hover
{
     color: #2f303a;
     border: 1px solid #2f303a;
  }
`;
