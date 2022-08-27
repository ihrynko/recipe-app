import { createSlice } from "@reduxjs/toolkit";
import { RecipeDeleteState } from "../../../types/pages";

import * as actions from "../actions/recipeListDeleteRecipe";

const initialState: RecipeDeleteState = {
  data: {},
  error: null,
  loading: false,
};

const RECIPE_LIST_DELETE_RECIPE_SLICE = "RECIPE_LIST_DELETE_RECIPE_SLICE";

const recipeListDeleteRecipeSlice = createSlice({
  name: RECIPE_LIST_DELETE_RECIPE_SLICE,
  initialState,
  reducers: {
    recipeDeleteItemDataSet: actions.recipeDeleteItemDataSetAction,
    recipeDeleteInProgress: actions.recipeDeleteInProgressAction,
    recipeDeleteSuccess: actions.recipeDeleteSuccessAction,
    recipeDeleteError: actions.recipeDeleteErrorAction,
    recipeResetDeleteRecipeData: () => initialState,
  },
});

export const deleteActions = recipeListDeleteRecipeSlice.actions;

export const deleteRecipeReducer = recipeListDeleteRecipeSlice.reducer;
