import styled from 'styled-components';
import background from '../../assets/background.jpg';


export const StyledSection = styled.section`
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    padding: 200px 0;
    min-height: 700px;
    background-color: #c4c4c4;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  @media screen and (min-width: 1200px) {
    padding: 300px 0;
  }
`
export const StyledTitle = styled.h1`
font-family: 'DynaPuff', cursive;
    /* font-family: 'Raleway', sans-serif; */
    margin-bottom: 40px;
    line-height: 60px;
    font-size: 114px;
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #ffffff;
`
export const StyledButton = styled.button`
    padding: 10px 28px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer;
    border-radius: 5px;
    text-transform: uppercase;
    background-color: #2d2d2d;
    border-color: #2d2d2d;
    color: #fff;
`
