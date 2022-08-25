import { Card, Button, Container } from '@mui/material';
import { styled as styles } from '@mui/material/styles';


export const StyledCard = styles(Card)`
max-width: 100%;
margin-top: 20px;
transition: 0.3s;
background-color: #F3EFEB;
`
export const StyledButton = styles(Button)`
margin-left: auto;
color: #ffffff;
border: 1px solid #2f303a;
background-color: #2f303a;
&:hover
{
     color: #2f303a;
     border: 1px solid #2f303a;
  }
`

export const StyledContainer = styles(Container)`
margin-top:50px;
`