import React, { useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";

import { recipeListFetchStart } from "./thunks/recipeList";
import { recipeListResetData } from "./reducers/recipeList";

import { deleteActions } from "./reducers/recipeListDeleteRecipe";
import { recipeListDeleteRecipe } from "./thunks/recipeListDeleteRecipe";
import { recipeListCreateRecipe } from "./thunks/recipeListCreateRecipe";

import { modalStateSelector } from "../../store/modal/selectors/modal";
import { MODAL_NAME } from "../../store/modal/actions/modal";
import { modalOpenToggleAction } from "../../store/modal/reducers/modal";
import { DeleteRecipeModal } from "./components/DeleteRecipeModal/DeleteRecipeModal";
import { CreateRecipeModal } from "./components/CreateRecipeModal/CreateRecipeModal";

import { Recipe, RecipeCreate } from "../../types/pages/index";
import { RecipeCard } from "./components/RecipeCard/RecipeCard";
import * as selectors from "./selectors/recipeList";
import Loader from "../../components/Loader";

import { Grid, IconButton, Box, Card } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  StyledContainer,
  StyledBox,
  StyledTypography,
  StyledButton,
} from "./styled";
import { toast } from "react-toastify";

const RecipeList = () => {
  const { categoryId } = useParams();

  const {
    loading,
    data: recipeList,
    error,
    refreshIndex,
  } = useSelector(selectors.recipeListStateSelector);
  const { open, name } = useSelector(modalStateSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId && refreshIndex) {
      dispatch(recipeListFetchStart({ categoryId: categoryId }));
    }
    return () => {
      dispatch(recipeListResetData());
    };
  }, [dispatch, categoryId, refreshIndex]);

  useEffect(() => {
    if (error && !loading) {
      toast.error("Error! Bad request!", {
        autoClose: 3000,
      });
      toast.clearWaitingQueue();
    }
  }, [error, loading]);

  const handleCreateRecipe = useCallback(
    (values: RecipeCreate) => {
      dispatch(recipeListCreateRecipe({ recipeData: values }));
    },
    [dispatch]
  );

  const handleCreateModalOpenToggle = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_CREATE }));
  }, [dispatch]);

  const handleDeleteModalOpenToggle = useCallback((item: Recipe) => {
    dispatch(deleteActions.recipeDeleteItemDataSet({ data: item }));
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_DELETE }));
  }, []);

  const handleDeleteModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_DELETE }));
  }, [dispatch]);

  const handleDeleteRecipe = useCallback(
    (id: string) => {
      dispatch(recipeListDeleteRecipe({ id }));
    },
    [dispatch]
  );

  return (
    <>
      {loading && !recipeList && !error && <Loader />}
      <StyledContainer maxWidth="lg">
        <StyledBox>
          <IconButton onClick={() => navigate(-1)}>
            <ReplyOutlinedIcon />
          </IconButton>
          {recipeList.length > 0 && (
            <StyledTypography variant="h4">
              {recipeList[0].category.name}
            </StyledTypography>
          )}
        </StyledBox>
        <Box textAlign="center">
          <StyledButton onClick={handleCreateModalOpenToggle}>
            <AddIcon /> Create Recipe
          </StyledButton>
        </Box>
        <Grid container item xs={12} spacing={2}>
          {recipeList.map((recipe) => {
            return (
              <Grid
                item
                flexDirection={"column"}
                container
                xs={12}
                md={6}
                lg={4}
                key={recipe._id}
              >
                <Card key={recipe._id}>
                  <RecipeCard
                    recipe={recipe}
                    onDelete={handleDeleteModalOpenToggle}
                  />
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </StyledContainer>
      <CreateRecipeModal
        onClose={handleCreateModalOpenToggle}
        onSave={handleCreateRecipe}
        open={open && name === MODAL_NAME.RECIPE_CREATE}
      />
      <DeleteRecipeModal
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteRecipe}
        open={open && name === MODAL_NAME.RECIPE_DELETE}
      />
    </>
  );
};

export default memo(RecipeList);
