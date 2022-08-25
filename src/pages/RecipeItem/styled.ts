import { styled as styles } from '@mui/material/styles';
import { Container, Button } from '@mui/material';
import styled from 'styled-components'

export const StyledContainer = styles(Container)`
margin-top:50px
`
export const StyledBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

export const StyledItem = styled.li`
margin-left: 10px;
`

export const StyledButton = styles(Button)`
color: #E35640;
&:hover,
&:focus
{
     text-decoration: underline;
  }
`