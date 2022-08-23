import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Card } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader'
import { useAppDispatch } from '../../store';
import { recipeListFetchStart } from './thunks/recipeList';
import { recipeListResetData } from './reducers/recipeList';
import {RecipeCard} from './components/RecipeCard/RecipeCard'
import { MODAL_NAME } from "../../store/modal/actions/modal";
import { modalOpenToggleAction } from "../../store/modal/reducers/modal";
import { deleteActions } from "./reducers/recipeListDeleteRecipe";
import { recipeListDeleteRecipe } from './thunks/recipeListDeleteRecipe'
import {DeleteRecipeModal} from './components/DeleteRecipeModal/DeleteRecipeModal'
import { Recipe } from '../../types/pages/index'
import { modalStateSelector } from '../../store/modal/selectors/modal';
import * as selectors from "./selectors/recipeList";

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

    const handleDeleteModalOpenToggle = useCallback((item: Recipe ) => {
    dispatch(deleteActions.recipeDeleteItemDataSet({ data: item }));
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_DELETE }));
  }, [])

   const handleDeleteModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_DELETE }));
  }, [dispatch]);

    const handleDeleteRecipe = (id: string) => {
    dispatch(recipeListDeleteRecipe({id}));
  };

  return (
    <>
      {loading && !error && <Loader />}
      {recipeList && !loading && !error && (
        <>
          <Button onClick={() => navigate(-1)}>
            {/* <StyledBackIcon /> */}
            <span>Back</span>
                  </Button>
                  {recipeList.map((recipe) => {
            return (

                <Card key={recipe._id}>
              <RecipeCard
                  recipe={recipe}
                  onDelete={handleDeleteModalOpenToggle}
                  />
               
                 </Card>
            );
          })}
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