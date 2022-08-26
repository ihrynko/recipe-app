import  { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';

import { recipeItemFetchStart } from './thunks/recipeItem';
import { recipeItemResetData } from './reducers/recipeItem';
import {recipeItemStateSelector} from './selectors/recipeItem';

import { modalStateSelector } from '../../store/modal/selectors/modal';
import { MODAL_NAME } from "../../store/modal/actions/modal";
import { modalOpenToggleAction } from "../../store/modal/reducers/modal"

import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Typography } from  '@mui/material';
import { styled } from '@mui/material/styles';

import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Loader from '../../components/Loader'
import {StyledContainer, StyledBox, StyledItem, StyledButton} from './styled'



interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


 const RecipeItem = () => {
  const { recipeId } = useParams();
 const {
    open, name
 } = useSelector(modalStateSelector);
   
  const {
    loading,
    data: recipeData,
    error,
  } = useSelector(recipeItemStateSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (recipeId) {
      dispatch(recipeItemFetchStart({ id: recipeId }));
    }
    return () => {
      dispatch(recipeItemResetData());
    };
  }, [dispatch, recipeId]);
   
     const handleExpandIngredientsClick = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_INGREDIENTS }));
     }, [dispatch]);
   
       const handleExpandMethodClick = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_METHOD }));
  }, [dispatch]);

     const handleExpandClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_INGREDIENTS || MODAL_NAME.RECIPE_METHOD}));
   }, [dispatch]);

  return (
    <>
      {loading && !error && <Loader />}
      {recipeData && !loading && !error && (
        <StyledContainer maxWidth="lg" >
        <IconButton onClick={() => navigate(-1)}>
            <ReplyOutlinedIcon />
              </IconButton>
      <StyledBox >
    <Card sx={{ maxWidth:700 }} >
      <CardHeader
        title={recipeData.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipeData.imageUrl}
        alt="Recipe image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipeData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <StyledButton
        disabled={open && name === MODAL_NAME.RECIPE_METHOD}
        onClick={handleExpandIngredientsClick}>
          Ingredients
        </StyledButton>
        <StyledButton
        disabled={open && name === MODAL_NAME.RECIPE_INGREDIENTS}
         onClick={handleExpandMethodClick}>
          Method
        </StyledButton>
        <ExpandMore
          expand={open}
          onClick={handleExpandClose}
          aria-expanded={open}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={open && name === MODAL_NAME.RECIPE_INGREDIENTS} timeout="auto" unmountOnExit>
        <CardContent>
          <ul> 
        {recipeData.ingredients.map((ingredient, index) => {
            return (
            <li key={index}>
            <Typography paragraph>{ ingredient.amount} { ingredient.unit} { ingredient.ingredient}</Typography>
            </li>
            );
        })}
       </ul> 
        </CardContent>
        </Collapse>
          <Collapse in={open && name === MODAL_NAME.RECIPE_METHOD} timeout="auto" unmountOnExit>
          <CardContent>
           <ol> 
        {recipeData.instructions.map((ingredient, index) => {
            return (
            <StyledItem key={index}>
            <Typography paragraph>{ ingredient} </Typography>
            </StyledItem>
            );
        })}
       </ol> 
        </CardContent>
      </Collapse>
      </Card>
      </StyledBox>
    </StyledContainer>
      )}
      {error && !loading && <p>{error}</p>}
    </>
  );
};

export default RecipeItem;

