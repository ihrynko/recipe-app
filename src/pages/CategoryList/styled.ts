import { Card, Button, Box, Container } from "@mui/material";
import { styled as styles } from "@mui/material/styles";
import styled from "styled-components";

export const StyledCard = styles(Card)`
max-width: 100%;
margin-top: 20px;
transition: 0.3s;
background-color: #F3EFEB;
`;
export const StyledButton = styles(Button)`
color: #ffffff;
border: 1px solid #2f303a;
background-color: #2f303a;
&:hover
{
     color: #2f303a;
     border: 1px solid #2f303a;
  }
`;

export const StyledBox = styles(Box)`
display: flex;
justify-content: space-between;
`;

export const StyledContainer = styles(Container)`
margin-top:50px;
`;

export const StyledWrapper = styled.section`
  margin: 0 auto;
  max-width: 800px;
`;
export const StyledBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;
