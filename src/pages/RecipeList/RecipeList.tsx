import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';

import { recipeListFetchStart } from './thunks/recipeList';
import { recipeListResetData } from './reducers/recipeList';

import { deleteActions } from "./reducers/recipeListDeleteRecipe";
import { recipeListDeleteRecipe } from './thunks/recipeListDeleteRecipe';

import { modalStateSelector } from '../../store/modal/selectors/modal';
import { MODAL_NAME } from "../../store/modal/actions/modal";
import { modalOpenToggleAction } from "../../store/modal/reducers/modal"
import {DeleteRecipeModal} from './components/DeleteRecipeModal/DeleteRecipeModal'

import { Recipe } from '../../types/pages/index';
import { RecipeCard } from './components/RecipeCard/RecipeCard';
import * as selectors from "./selectors/recipeList";
import Loader from '../../components/Loader';

import {Grid,IconButton, Box} from '@mui/material';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddIcon from '@mui/icons-material/Add';
import { StyledWrapper, StyledContainer, StyledBox, StyledTypography, StyledCard, StyledButton } from './styled';

const RecipeList = () => {
  const { categoryId } = useParams();

  const {
    loading,
    data: recipeList,
    error,
  } = useSelector(selectors.recipeListStateSelector);

 const {
    open, name
  } = useSelector(modalStateSelector);
    
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (categoryId) {
      dispatch(recipeListFetchStart({ categoryId: categoryId }));
    }
    return () => {
      dispatch(recipeListResetData());
    };
  }, [dispatch, categoryId]);

    const handleCreateModalOpenToggle = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_CREATE }));
  }, [dispatch]);

    const handleDeleteModalOpenToggle = useCallback((item: Recipe ) => {
    dispatch(deleteActions.recipeDeleteItemDataSet({ data: item }));
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_DELETE }));
  }, [])

   const handleDeleteModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_DELETE }));
   }, [dispatch]);
  
   const handleDeleteRecipe = useCallback((id: string) => {
    dispatch(recipeListDeleteRecipe({id}));
  }, [dispatch]);

  return (
    <>
      {loading && !error && <Loader />}
      { !loading && !error && (
        <>
          <StyledContainer maxWidth="lg">
          <StyledBox>
          <IconButton onClick={() => navigate(-1)}>
            <ReplyOutlinedIcon />
              </IconButton>
              {!recipeList.length && <StyledTypography variant="h4" >
                Create your first recipe
             </StyledTypography>} 
             {recipeList.length > 0 && <StyledTypography variant="h4" >
               {recipeList[0].category.name}
              </StyledTypography>} 
            </StyledBox>
            <Box  textAlign='center'>
            <StyledButton onClick={handleCreateModalOpenToggle}>
        <AddIcon/> Create Recipe
        </StyledButton>
            </Box>
            <Grid container spacing={3}>
          <StyledWrapper>
          {recipeList.map((recipe) => {
            return (
            <StyledCard key={recipe._id}>
              <RecipeCard
                  recipe={recipe}
                  onDelete={handleDeleteModalOpenToggle}
                  />
            </StyledCard>
            );
          })}
            </StyledWrapper>
            </Grid>
            </StyledContainer>
       <DeleteRecipeModal
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteRecipe}
        open={open && name === MODAL_NAME.RECIPE_DELETE}
              />     
        </>
      )}
      {error && !loading && <p>{error}</p>}
    </>
  );
};

export default RecipeList;