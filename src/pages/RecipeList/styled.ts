import { styled as styles } from '@mui/material/styles';
import { Container, Card, Typography, Box, Button } from '@mui/material';
import styled from 'styled-components'

export const StyledContainer = styles(Container)`
margin-top:50px
`
export const StyledBox = styles(Box)`
display: flex;
margin-bottom: 30px;
`

export const StyledTypography = styles(Typography)`
font-family: 'Raleway', italic;
color: #E35640;
text-transform: uppercase;
margin:0 auto;
`

export const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0;
`;

export const StyledCard = styles(Card)`
margin-right: 20px;
margin-bottom: 20px;

  max-width: 100%;
  @media (min-width: 768px) and (max-width: 1199px) {

    &:nth-of-type(2n) {
      margin-right: 0;
    }
    &:nth-last-of-type(2n) {
      margin-bottom: 0;
    }
  }
  @media (min-width: 1200px) {
    &:nth-of-type(3n + 3) {
      margin-right: 0;
    }
    &:nth-last-of-type(-n + 3) {
      margin-bottom: 0;
    }
  }
`
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
`


